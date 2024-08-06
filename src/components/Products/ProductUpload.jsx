import React, { useContext, useEffect, useState } from "react";
import Breadcrumb from "../component.common/BreadCrumb";
import HomeIcon from "@mui/icons-material/Home";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Button, CircularProgress, Rating } from "@mui/material";
import { FaCloudUploadAlt,  FaRegImages } from "react-icons/fa";
import {  fetchDataFormApi, postdata } from "../../utility/Api";
import { UserContext } from "../contextApi/UserAuthContext";
import { useNavigate } from "react-router-dom";

export default function ProductUpload() {
  const { setisHeaderSidebar,setAlertBox, setProgress } = useContext(UserContext);
  const [categoryVal, setcategoryVal] = useState("");
  const [subcategoryVal, setSubcategoryVal] = useState("");
  // const [productRAMS,setproductRAMS] = useState('');
  // const [productSize,setproductSize] = useState('');
  const [ratingVal, setratingVal] = useState("");
  const [isFeatured, setisFeatured]= useState('');
  const formdata = new FormData();
  const [categoryData, setcategoryData] = useState([]);
  const [isloading, setisLoading] = useState(false);
  const [imgFiles,setImgFiles] = useState();
  const [previous,setPrevious] = useState([]);
  const [formFields, setformFields] = useState({
    name: "",
    description: "",
    images:[],
    brand:'',
    price:null,
    oldPrice:null,
    category:'',
    countInStock:null,
    rating:null,
    isFeatured:null,
    discount:null,
    productRAMS:[],
    productSize:[], 
    catID:''
  });
  const history = useNavigate();

  useEffect(() => {
    setisHeaderSidebar(false);
    setProgress(20)
    fetchDataFormApi("/api/categorys").then((res) => {
      setcategoryData(res);
      setProgress(100)
    });
  }, []);

  useEffect(()=>{
    if(!imgFiles) return;

    let tmp = [];
    for(let i=0; i<imgFiles.length; i++){
      tmp.push(URL.createObjectURL(imgFiles[i]))
    };

    const objectURL = tmp;
    setPrevious(objectURL);

    for(let i=0; i<objectURL.length; i++){
      return()=>{
        URL.revokeObjectURL(objectURL[i])
      }
    }
  },[imgFiles])

  const categoryChange =(e) =>{
    setcategoryVal(e.target.value);
    setformFields(()=>({
      ...formFields,
       "category" : e.target.value
    }))
    formFields.catID = e.target.value
  };

  
  // const productRAMSChange =(e) =>{
  //   setproductRAMS(e.target.value);
  //   setformFields(()=>({
  //     ...formFields,
  //      "productRAMS" : e.target.value
  //   }))
  // };

  // const productSizeChange =(e) =>{
  //   setproductSize(e.target.value);
  //   setformFields(()=>({
  //     ...formFields,
  //      "productSize" : e.target.value
  //   }))
  // };

  const isFeaturedChange = (e) =>{
    setisFeatured(e.target.value);
    setformFields(()=>({
      ...formFields,
       "isFeatured" : e.target.value
    }))
  };

  const inputChange = (e)=>{
    setformFields(()=>({
      ...formFields,
      [e.target.name]: e.target.value
    }))
  };
  
  const arrayInputChange = (e) => {
    const { name, value } = e.target;
    setformFields((prevFields) => ({
      ...prevFields,
      [name]: value.split(",").map(item => item.trim()),
    }));
  };

  let img_Arr = [];
  let uniqueArray = [];

  const onChangeFile = async (e, apiEndPoint) => {
    try {
      const files = e.target.files;
      for (let i = 0; i < files.length; i++) {
        if (files[i] && (files[i].type === 'image/jpeg' || files[i].type === 'image/jpg' || files[i].type === 'image/png' || files[i].type === 'image/webp')) {
          const file = files[i]
          formdata.append('images', file);
          img_Arr.push(file)
         
        } else {
          setAlertBox({
            open: true,
            error: true,
            msg: "Please select the valid JPG or PNG image files."
          });
          return;
        }
      }
      setImgFiles(img_Arr)
    } catch (error) {
      console.log(error);
    }
      postdata(apiEndPoint, formdata).then((res) =>{
        fetchDataFormApi('/api/imageuploads').then((response)=>{
          if (Array.isArray(response) && response.length !== 0) {
            response.map(item => {
              if (Array.isArray(item?.images) && item?.images.length !== 0) {
                item.images.map(img => {
                  img_Arr.push(img);
                  console.log(img); // Log the image URL
                });
              }
            });
            uniqueArray = img_Arr.filter((item, index) => img_Arr.indexOf(item) === index);
            // const appenedArrray = [...previous, ...uniqueArray]
            setPrevious(prev => [...prev, ...uniqueArray]);
           
          }
        })  
      })
      setAlertBox({
        open: true,
        error: false,
        msg: "Image Uploaded!"
      });
  };
  const addProduct = (e) =>{
    console.log("productSize", formFields.productSize);
    console.log("productRAMS", formFields.productRAMS)
    e.preventDefault()
    const appenededArray = [...previous,...uniqueArray]
    formdata.append('name',formFields.name);
    formdata.append('description',formFields.description);
    formFields.images = appenededArray
    formdata.append('images ', appenededArray);
    formdata.append('brand',formFields.brand);
    formdata.append('category',formFields.category);
    formdata.append('catID',formFields.catID);
    formdata.append('price',formFields.price);
    formdata.append('oldPrice',formFields.oldPrice);
    formdata.append('countInStock',formFields.countInStock);
    formdata.append('rating',formFields.rating);
    formdata.append('isFeatured',formFields.isFeatured);
    formdata.append('discount',formFields.discount);
    formdata.append('productRAMS', JSON.stringify(formFields.productRAMS));
    formdata.append('productSize', JSON.stringify(formFields.productSize));

    if(formFields.name === ''){
      setAlertBox({
        open:true,
        msg:"Add the Product  Name !",
        error:true
      })
      return false
    }
    if(formFields.description === ''){
      setAlertBox({
        open:true,
        msg:"Add the Product Description !",
        error:true
      })
      return false
    }
    if(formFields.category === ''){
      setAlertBox({
        open:true,
        msg:"Select the Category !",
        error:true
      })
      return false
    }
    if(formFields.brand === ''){
      setAlertBox({
        open:true,
        msg:"Add the Product Brand Name !",
        error:true
      })
      return false
    }
    if(formFields.isFeatured === null){
      setAlertBox({
        open:true,
        msg:"Select the Product is a Featured or Not !",
        error:true
      })
      return false
    }
    if(formFields.price === null){
      setAlertBox({
        open:true,
        msg:"Add the Product Price !",
        error:true
      })
      return false
    }
    if(formFields.oldPrice === null){
      setAlertBox({
        open:true,
        msg:"Add the Product OldPrice !",
        error:true
      })
      return false
    }
    if(formFields.rating === null){
      setAlertBox({
        open:true,
        msg:"Add the Product Rating !",
        error:true
      })
      return false
    }
    if(formFields.countInStock === null){
      setAlertBox({
        open:true,
        msg:"Add the Product  CountIn Stock !",
        error:true
      })
      return false
    }
    setisLoading(true)
    postdata('/api/products/create', formFields).then((res)=>{
          setAlertBox({
            open:true,
            msg:"The Product is Created!",
            error:false
          })
       setisLoading(false)
      setformFields({
        name: "",
        description: "",
        images:[],
        brand:'',
        price:0,
        oldPrice:0,
        category:'',
        // subCat:'',
        countInStock:0,
        rating:0,
        isFeatured:false,
        discount:0,
        productRAMS:[],
        productSize:[],
        catID:''
      });
      history(`/Product-list`)
    })
  };

  return (
    <div className="pb-5 right-content">
      <div className="breadcrumbs p-3">
        <h5 className="lh-0">Product Upload</h5>
        <div className="d-flex ">
          <Breadcrumb label="DashBoard" icon={<HomeIcon fontSize="small" />} />
          <span>/</span>
          <Breadcrumb label="Product" />
          <span>/</span>
          <Breadcrumb label="Product Upload" />
        </div>
      </div>

      <form className="form productForm">
        <div className="row">
          <div className="col-sm-12">
            <div className="card p-4">
              <h5>Basic Information</h5>
              <div className="form-group ">
                <h6>Product Name</h6>
                <input type="text" name="name" value={formFields.name} onChange={inputChange} />
              </div>
              <div className="form-group">
                <h6>Description</h6>
                <textarea rows={6} type="text" name="description" value={formFields.description} onChange={inputChange} />
              </div>
              <div className="row">
                <div className="col">
                  <FormControl className="w-100 form-group">
                    <h6>Category</h6>
                    <Select
                      value={categoryVal}
                      onChange={categoryChange}
                      displayEmpty
                      className="w-100"
                    >
                      <MenuItem value="">
                        <em value={null}> None</em>
                      </MenuItem>
                     {
                        categoryData?.categoryList?.length !== 0 &&
                        categoryData?.categoryList?.map((item, index) => {
                             return (
                              <MenuItem key={index} value={item._id}  >{item.name}</MenuItem>
                             )
                        })
                     }
                    </Select>
                  </FormControl>
                </div>
               
                <div className="col">
                <div className="form-group">
                    <h6>Brand</h6>
                    <input type="text" name="brand" value={formFields.brand} onChange={inputChange} />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <h6>Price</h6>
                    <input type="text" name="price" value={formFields.price} onChange={inputChange} />
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <h6>Old Price</h6>
                    <input type="text" name="oldPrice" value={formFields.oldPrice} onChange={inputChange} />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                <FormControl className="w-100 form-group">
                    <h6>is Featured</h6>
                    <Select
                      value={isFeatured}
                      onChange={isFeaturedChange}
                      displayEmpty
                      className="w-100"
                    >
                      <MenuItem value="">
                        <em value={null}>None</em>
                      </MenuItem>=
                      <MenuItem value={true}>True</MenuItem>
                      <MenuItem value={false}>False</MenuItem>
                    </Select>
                  </FormControl> 
                </div>
                <div className="col">
                  <div className="form-group">
                    <h6>CountInStock</h6>
                    <input type="text" name="countInStock" value={formFields.countInStock} onChange={inputChange} />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <h6>Discount</h6>
                    <input type="text" name="discount" value={formFields.discount} onChange={inputChange} />
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <h6>Product Size</h6>
                    <input type="text" name="productSize" value={formFields.productSize.join(',')} onChange={arrayInputChange} />
                    {/* <Select
                      value={productSize}
                      onChange={productSizeChange}
                      displayEmpty
                      className="w-100"
                    >
                      <MenuItem value="">
                        <em value={null}>None</em>
                      </MenuItem>
                      <MenuItem value={"S"}>S</MenuItem>
                      <MenuItem value={"M"}>M</MenuItem>
                      <MenuItem value={"L"}>L</MenuItem>
                      <MenuItem value={"XL"}>XL</MenuItem>
                      <MenuItem value={"XXL"}>XXL</MenuItem>
                    </Select> */}
                  </div>
                </div>
              </div>
              <div className="row">
              <div className="col">
                  <div className="form-group">
                    <h6>Product RAMS</h6>
                    <input type="text" name="productRAMS" value={formFields.productRAMS.join(',')} onChange={arrayInputChange} />
                    {/* <Select
                      value={productRAMS}
                      onChange={productRAMSChange}
                      displayEmpty
                      className="w-100"
                    >
                      <MenuItem value="">
                        <em value={null}>None</em>
                      </MenuItem>
                      <MenuItem value={"16GB"}>16GB</MenuItem>
                      <MenuItem value={"8GB"}>8GB</MenuItem>
                      <MenuItem value={"6GB"}>6GB</MenuItem>
                      <MenuItem value={"4GB"}>4GB</MenuItem>
                    </Select> */}
                  </div>
                </div>
                <div className="col">
                <div className="form-group">
                    <h6>Ratings</h6>
                    <Rating
                      name="simple-controlled"
                      value={ratingVal}
                      onChange={(event, newValue) => {
                        setratingVal(newValue);
                        setformFields(()=>({
                          ...formFields,
                           "rating" :newValue
                        }))
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div> 
        </div>
        <div className="row">
             <div className="col-sm-12">
              <div className="card p-4 ">
                 <div className="imgUploadSection">
                 <h4>Media and Published</h4>
                  <div className="uploadImgBox d-flex align-items-center">
                     {previous?.length !== 0 && previous?.map((img,index)=>{
                       return(
                        <div className="uploadBox" key={index}>
                           <img src={img} alt="" className="w-100"/>
                        </div>
                       )
                     })}
                      <div className="uploadBox">
                        <input type="file" multiple onChange={(e) => onChangeFile(e,`/api/products/upload`)} name="images" />
                        <div className="info">
                          <FaRegImages/>
                          <h6>Image Upload</h6>
                        </div>
                      </div>
                  </div>
                 <br/>
                  <Button variant="contained" color="warning" className="w-100" onClick={addProduct} > <FaCloudUploadAlt className="mx-1 h4 mb-0"/>  {isloading === true ? <CircularProgress color="inherit" className="loader mx-3" />: 'Publish and View'}  </Button>
                 </div>
              </div>
             </div>
          </div>
      </form>
    </div>
  );
}
