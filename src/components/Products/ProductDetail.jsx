import React, { useContext, useEffect, useRef, useState } from "react";
import Breadcrumb from "../component.common/BreadCrumb";
import HomeIcon from "@mui/icons-material/Home";
import Slider from "react-slick";
import { fetchDataFormApi, } from "../../utility/Api";
import { useParams } from "react-router-dom";


export default function ProductDetail() {
  const [products, setProduct] = useState({
    images: [],
    productSize: [],
    productRAMS: [],
  });
  const [category, setCategory] = useState([]);
  const [reviewData, setReviewData] = useState([]);
  const { id } = useParams();
  const ProductSliderBig = useRef();
  const ProductSliderSml = useRef();

  var ProductSlider = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  var ProductsmlSlider = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchDataFormApi(`/api/products/${id}`).then((res) => {
      setProduct(res);
      fetchDataFormApi(`/api/categorys/${res.catID}`).then((categoryRes) => {
        setCategory(categoryRes);
      });
    });
  }, [id]);

  useEffect(() => {
    fetchDataFormApi(`/api/productReview?productId=${id}`).then((res) => {
      setReviewData(res);
    });
  }, [id]);

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date)) throw new Error("Invalid Date");
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Intl.DateTimeFormat("en-US", options).format(date);
    } catch (error) {
      console.error("Invalid date format:", dateString);
      return "Invalid date";
    }
  };

  const GoToSlider = (index)=>{
    ProductSliderBig.current.slickGoTo(index);
    ProductSliderSml.current.slickGoTo(index);
  };

  const reviewCount = reviewData.length;

  return (
    <div className="pb-5 right-content">
      <div className="breadcrumbs p-3">
        <h5 className="lh-0">Product View</h5>
        <div className="d-flex ">
          <Breadcrumb label="DashBoard" icon={<HomeIcon fontSize="small" />} />
          <span>/</span>
          <Breadcrumb label="Product" />
          <span>/</span>
          <Breadcrumb label="Product-View" />
        </div>
      </div>

      <div className="card">
        <div className="row productDetail">
          <div className="col-md-5">
            <div className="sliderWrapper p-4">
            {products.images && products.images.length > 0 && (
                  <Slider
                    {...ProductSlider}
                    ref={ProductSliderBig}
                    className="sliderBig mb-2"
                  >
                    {products.images.map((item, index) => (
                      <div className="item" key={index}>
                        <img className="w-100" src={item} alt={""} />
                      </div>
                    ))}
                  </Slider>
                )}
                {products.images && products.images.length > 0 && (
                  <Slider
                    {...ProductsmlSlider}
                    ref={ProductSliderSml}
                    className="sliderSml"
                  >
                    {products.images.map((item, index) => (
                      <div
                        className="item"
                        key={index}
                        onClick={() => GoToSlider(index)}
                      >
                        <img className="w-100" src={item} alt={""} />
                      </div>
                    ))}
                  </Slider>
                )}
            </div>
          </div>
          <div className="col-md-7">
            <div className="p-4">
              <h5>{products.name}</h5>
              <div className="productInfo mt-4">
                <div className="row ">
                  <div className="col-sm-2 d-flex align-items-center">
                    <span className="name">Brand</span>
                  </div>
                  <div className="col-sm-10">
                    : <span>{products.brand}</span>
                  </div>
                </div>
                <div className="row ">
                  <div className="col-sm-2 d-flex align-items-center">
                    <span className="name">Category</span>
                  </div>
                  <div className="col-sm-10">
                    : <span> {category.name} </span>
                  </div>
                </div>
              
                {products.productSize && products.productSize.length > 0 && (
                  <div className="row">
                     <div className="col-sm-2 ">
                    <span className="name">Size </span>
                  </div>
                  <div className="col-sm-10 productView">
                  
                    <ul style={{display:"flex",gap:"10px" ,transform:'none'}}>
                    :
                    {products.productSize.map((item, index) => (
                      <li className="ml-2" style={{display:"flex" ,transform:'none'}}>{item}</li>
                    ))}
                    </ul>
                  </div>
                  </div>
                  )}
                  {products.productRAMS && products.productRAMS.length > 0 && (
                  <div className="row">
                     <div className="col-sm-2 ">
                    <span className="name">Ram </span>
                  </div>
                  <div className="col-sm-10 productView">
                  
                    <ul style={{display:"flex",gap:"10px" ,transform:'none'}}>
                    :
                    {products.productRAMS.map((item, index) => (
                      <li className="ml-2" style={{display:"flex" ,transform:'none'}}>{item}</li>
                    ))}
                    </ul>
                  </div>
                  </div>
                  )}
                <div className="row ">
                  <div className="col-sm-2 d-flex align-items-center">
                    <span className="name">Price</span>
                  </div>
                  <div className="col-sm-10">
                    : <span> {products.price} </span>
                  </div>
                </div>
                <div className="row ">
                  <div className="col-sm-2 d-flex align-items-center">
                    <span className="name">Review</span>
                  </div>
                  <div className="col-sm-10">
                  : <span>(0{reviewCount}) Review</span>
                  </div>
                </div>
                <div className="row ">
                  <div className="col-sm-2 d-flex align-items-center">
                    <span className="name">Publish</span>
                  </div>
                  <div className="col-sm-10">
                  : <i className="ml-3">{formatDate(products.dateCreated)}</i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="productDescription p-4">
          <h4 className="mb-3 mt-2"> Product Description </h4>
          <p>
            {products.description}
          </p>
       </div>
           
      </div>
    </div>
  );
}
