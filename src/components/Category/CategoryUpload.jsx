import React, { useContext, useEffect, useState } from "react";
import Breadcrumb from "../component.common/BreadCrumb";
import HomeIcon from "@mui/icons-material/Home";
import { Button, CircularProgress } from "@mui/material";
import { FaCloudUploadAlt, FaRegImages } from "react-icons/fa";
import { deletedata, fetchDataFormApi, postdata } from "../../utility/Api";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contextApi/UserAuthContext";

export default function CategoryUpload() {
  const { setAlertBox } = useContext(UserContext);
  const [previous, setPrevious] = useState([]);
  const [imgFiles, setImgFiles] = useState()
  const formdata = new FormData();
  const [isloading, setIsLoading] = useState(false);
  const history = useNavigate();
  const [formField, setFormField] = useState({
    name: "",
    images: [],
  });

  useEffect(()=>{
    if(!imgFiles) return;

    let tmp = [];
    for(let i=0; i<imgFiles.length; i++){
      tmp.push(URL.createObjectURL(imgFiles[i]))
    };

    const objectURL = tmp;
    setPrevious((prev) => [...prev , ...objectURL]);

    for(let i=0; i<objectURL.length; i++){
      return()=>{
        URL.revokeObjectURL(objectURL[i])
      }
    }
  },[imgFiles])


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

  const changeInput = (e) => {
    setFormField({
      ...formField,
      [e.target.name]: e.target.value
    });
  };

  const addCategory = async (e) => {
    e.preventDefault();
    const appendedArray = [...previous, ...uniqueArray];
    formdata.append('name', formField.name);
    formField.images = appendedArray;
    formdata.append('images', appendedArray);
    console.log(appendedArray,"img")
   
    if (formField.name !== ""  && previous.length !== 0) {
      setIsLoading(true);
      await postdata('/api/categorys/create', formField);
      setIsLoading(false);
      history('/Category-list');
    } else {
      setAlertBox({
        open: true,
        error: true,
        msg: "Please Fill all the Fields"
      });
    }
  };

  return (
    <div className="pb-5 right-content">
      <div className="breadcrumbs p-3">
        <h5 className="lh-0">Add Category</h5>
        <div className="d-flex ">
          <Breadcrumb label="DashBoard" icon={<HomeIcon fontSize="small" />} />
          <span>/</span>
          <Breadcrumb label="Category" />
          <span>/</span>
          <Breadcrumb label="Add Category" />
        </div>
      </div>

      <form className="form" onSubmit={addCategory}>
        <div className="row">
          <div className="col-sm-9">
            <div className="card p-4">
              <div className="form-group ">
                <h6>Category Name</h6>
                <input type="text" name="name" onChange={changeInput} />
              </div>
              {/* <div className="form-group">
                <h6>subCat</h6>
                <input type="text" name="subCat" onChange={changeInput} />
              </div> */}
              <br />
              <div className="imgUploadSection">
                <h4>Media and Published</h4>
                <div className="uploadImgBox d-flex align-items-center">
                  {previous?.length !== 0 && previous?.map((img, index) =>{
                    return(
                      <div className="uploadBox" key={index}>
                       <img src={img} className="w-100" alt="uploaded" />
                    </div>
                    )
                  })}
                  <div className="uploadBox">
                    <input type="file" name="images" multiple onChange={(e) => onChangeFile(e, `/api/categorys/upload`)}       />
                    <div className="info">
                      <FaRegImages />
                      <h6>Image Upload</h6>
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <Button type="submit" variant="contained" color="warning" className="w-100">
                <FaCloudUploadAlt className="mx-1 h4 mb-0" /> {isloading ? <CircularProgress color="inherit" className="loader mx-3" /> : 'Publish and View'}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

