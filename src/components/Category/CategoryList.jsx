import React, { useContext, useEffect, useState } from "react";
import {  FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Button } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { UserContext } from "../contextApi/UserAuthContext";
import Breadcrumb from "../component.common/BreadCrumb";
import HomeIcon from "@mui/icons-material/Home";
import { deletedata, editdata, fetchDataFormApi } from "../../utility/Api";
import { Link } from "react-router-dom";

export default function CategoryList() {
  const { setisHeaderSidebar, setProgress, setAlertBox, BaseURl } = useContext(UserContext);
  const [categoryData, setcategoryData] = useState([]);

  useEffect(() => {
    setisHeaderSidebar(false);
    setProgress(20)
    fetchDataFormApi("/api/categorys").then((res) => {
      setcategoryData(res);
      setProgress(100)
      console.log(res);
    });
  }, []);

  // const editCategory = (id) => {
  //   setFormField({
  //       name:'',
  //       images:'',
  //       color:''
  //   });
  //     setOpen(true);
  //     seteditId(id);
  //     fetchDataFormApi(`/api/categorys/${id}`).then((res) => {
  //       setFormField({
  //           name:res.name,
  //           images:res.images,
  //           color:res.color
  //       });
  //       console.log(res);
  //     });
  // };

  const deleteCategory = (id) =>{
     deletedata(`/api/categorys/${id}`).then( res =>{
        fetchDataFormApi("/api/categorys").then((res) => {
            setcategoryData(res);
          });
     })
  };

  // const submiteditedCategory = (e)=>{
  //   e.preventDefault()
  //   setisLoading(true)
  //   setProgress(40)
  //   editdata(`/api/categorys/${editId}`,formField).then((res)=>{
  //       fetchDataFormApi("/api/categorys").then((res) => {
  //           setcategoryData(res);
  //           setOpen(false)
  //           setisLoading(false)
  //         });
  //         setAlertBox({
  //           open:true,
  //           msg:'Category Updated Successfully !',
  //           error:false
  //         });
  //         setProgress(100)
  //   })
  // };

  const changePagintionData = (event,value) =>{
    setProgress(40)
    fetchDataFormApi(`/api/categorys?page=${value}`).then((res) => {
        setcategoryData(res);
        setProgress(100)
      });
  };
  
  return (
    <>
      <div className="right-content">
        <div className="breadcrumbs p-3">
          <h5 className="lh-0">Category List</h5>
          <div className="d-flex ">
            <Breadcrumb
              label="DashBoard"
              icon={<HomeIcon fontSize="small" />}
            />
            <span>/</span>
            <Breadcrumb label="Category" />
            <span>/</span>
            <Breadcrumb label="Category List" />
          </div>
        </div>
        <div className="card shadow border-0 p-3 mt-4">
          <h3 className="hd">Category List</h3>

          <div className="table-responsive mt-3 ">
            <table className="table table-bordered  v-align">
              <thead className="thead-dark">
                <tr>
                  <th>ID</th>
                  <th>Image</th>
                  <th>Category</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {categoryData?.categoryList?.length !== 0 &&
                  categoryData?.categoryList?.map((item, index) => {
                    return (
                      <tr>
                        <td>#{index + 1}</td>
                        <td style={{ width: "100px" }}>
                          <div className="d-flex justify-content-center  align-items-center productBox">
                            <div className="imgWrapper mx-2">
                              <div className="img ">
                                <img
                                  src={item?.images}
                                  alt=""
                                  className="w-100"
                                />
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>{item.name}</td>
                        <td>
                          <div className="d-flex justify-content-center align-items-center actions">
                           <Link to={`/Edited-Category/${item.id}`}>
                           <Button
                              className="success"
                              color="success"
                            >
                              <FaPencilAlt />
                            </Button>
                           </Link>
                            <Button className="error" color="error" onClick={()=> deleteCategory(item.id)}>
                              <MdDelete />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>

            {categoryData?.totalPage > 1 &&
              <div className="d-flex justify-content-between align-items-center tableFooter">
              <p>
                Showing <b>{categoryData?.page}</b> of <b>{categoryData?.totalPosts}</b> results{" "}
              </p>
              <Pagination count={categoryData?.totalPage} color="primary" showFirstButton showLastButton onChange={changePagintionData} />
            </div>
            }
          </div>
        </div>
      </div>
    </>
  );
}
