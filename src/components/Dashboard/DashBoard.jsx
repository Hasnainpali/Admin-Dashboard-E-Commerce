import React, { useContext, useEffect, useState } from "react";
import DashboardBox from "../component.common/DashboardBox";
import { FaEye, FaPencilAlt, FaUserCircle } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import { MdDelete, MdShoppingBag } from "react-icons/md";
import { GiStarsStack } from "react-icons/gi";
import { TrendingDown, TrendingUp } from "@mui/icons-material";
import { HiDotsVertical } from "react-icons/hi";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { options } from "../../utility/utility";
import { IoIosTimer } from "react-icons/io";
import { Button, Rating } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Pagination from '@mui/material/Pagination';
import { UserContext } from "../contextApi/UserAuthContext";
import Breadcrumb from "../component.common/BreadCrumb";
import HomeIcon from '@mui/icons-material/Home';
import { Link } from "react-router-dom";
import { deletedata, fetchDataFormApi } from "../../utility/Api";

export default function DashBoard() {
  const { setisHeaderSidebar, BaseURl, setProgress, setAlertBox } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [showBy, setShowBy] = useState("");
  const [categoryBy, setcategoryBy] = useState("");
  const [brandBy, setbrandBy] = useState("");
  const [priceBy, setpriceBy] = useState("");
  const [productList, setProductList] = useState([])

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const ITEM_HEIGHT = 48;

  useEffect(() => {
    setisHeaderSidebar(false);
    setProgress(40)
    fetchDataFormApi(`/api/products`).then((res)=>{
      setProductList(res)
      setProgress(100)
    })
  },[]);

const deleteProduct = (id)=>{
setProgress(40)
deletedata(`/api/products/${id}`).then((res) =>{
  setProgress(100)
  setAlertBox({
    open:true,
    error:true,
    msg:"Product Deleted!"
  })
  fetchDataFormApi(`/api/products`).then((res)=>{
    setProductList(res)
  })
})
};

const changePagintionData = (event,value) =>{
setProgress(40)
fetchDataFormApi(`/api/products?page=${value}`).then((res) => {
    setProductList(res);
    setProgress(100)
  });
};
  return (
    <>
      <div className="right-content">
        <div className="breadcrumbs my-2">
           <h5 className="lh-0">
            E-commerce 
           </h5>
           <Breadcrumb label="DashBoard" icon={<HomeIcon fontSize="small" />} />
        </div>
        <div className="row dashboardWrapperBox">
          <div className="col-md-8">
            <div className="dashboardWrapper  d-flex flex-wrap">
              <DashboardBox
                title="Total Users"
                color={["#1da256", "#48d483"]}
                icon={<FaUserCircle />}
                grow={<TrendingUp />}
              />
              <DashboardBox
                title="Total Orders"
                color={["#c012e2", "#eb64fe"]}
                icon={<IoMdCart />}
                grow={<TrendingDown />}
              />
              <DashboardBox
                title="Total Products"
                color={["#2c78e5", "#60aff5"]}
                icon={<MdShoppingBag />}
                grow={<TrendingUp />}
              />
              <DashboardBox
                title="Total Reviews"
                color={["#e1950e", "#f3cd29"]}
                icon={<GiStarsStack />}
                grow={<TrendingUp />}
              />
            </div>
          </div>
          <div className="col-md-4 pl-0">
            <div className="box graphBox">
              <div className="d-flex align-items-center bottom-ele">
                <h4 className="text-white mb-0 mt-0">Last month</h4>
                <div className="ml-auto">
                  <Button className="ml-auto togglrIcon" onClick={handleClick}>
                    <HiDotsVertical />
                  </Button>
                  <Menu
                    id="long-menu"
                    MenuListProps={{
                      "aria-labelledby": "long-button",
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                      style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: "14ch",
                      },
                    }}
                  >
                    {options.map((option) => (
                      <MenuItem
                        key={option}
                        selected={option === "Pyxis"}
                        onClick={handleClose}
                      >
                        <span className="timerIcon">
                          <IoIosTimer />
                        </span>
                        {option}
                      </MenuItem>
                    ))}
                  </Menu>
                </div>
              </div>
              <h3 className="text-white font-weight-bold mt-3">
                $3,787,681.00
              </h3>
              <p> $3,787,681.00 in last month</p>
            </div>
          </div>
        </div>

        <div className="card shadow border-0 p-3 mt-4">
          <h3 className="hd"> Best Selling Products</h3>

          {/* <div className="row cardFilter mt-3">
            <div className="col-md-3 ">
            <FormControl className="w-100">
              <h4>Show By</h4>
                <Select
                  value={showBy}
                  onChange={(e) => setShowBy(e.target.value)}
                  className="w-100"
                >
                  <MenuItem value="None">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
                </FormControl>
            </div>
            <div className="col-md-3 ">
            <FormControl className="w-100">
              <h4>Category By</h4>
                <Select
                  value={categoryBy}
                  onChange={(e) => setcategoryBy(e.target.value)}
                  className="w-100"
                >
                  <MenuItem value="None">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
                </FormControl>
            </div>
            <div className="col-md-3 ">
            <FormControl className="w-100">
              <h4>Brand By</h4>
                <Select
                  value={brandBy}
                  onChange={(e) => setbrandBy(e.target.value)}
                  className="w-100"
                >
                  <MenuItem value="None">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
                </FormControl>               
            </div>
            <div className="col-md-3 ">
            <FormControl className="w-100">
              <h4>Price By</h4>
                <Select
                  value={priceBy}
                  onChange={(e) => setpriceBy(e.target.value)}
                  className="w-100"
                >
                  <MenuItem value="None">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
                </FormControl>
            </div>
          </div> */}

          <div className="table-responsive mt-3 ">
             <table className="table table-bordered  v-align">
             <thead className="thead-dark">
             <tr>
                  <th>ID</th>
                  <th style={{ width:'200px'}} >Product</th>
                  <th>Category</th>
                  <th>Brand</th>
                  <th>Price</th>
                  <th>Rating</th>
                  <th>Discount</th>
                  <th>Product Size</th>
                  <th>Product RAM</th>
                  <th>Stock</th>
                  <th>Order</th>
                  <th>Action</th>
                </tr>
             </thead>
              <tbody>
                {productList?.productList?.length !== 0 && productList?.productList?.map((item,index)=>{
                  return(
                    <tr key={index}>
                    <td>#{index + 1}</td>
                    <td>
                       <div className="d-flex align-items-center productBox">
                          <div className="imgWrapper mx-1">
                             <div className="img ">
                             <img
                                src={item.images[0]}
                                alt={''}
                                className="w-100"
                             />
                             </div>
                          </div>
                          <div className="info pl-0">
                             <h6>{item.name.substring(0,10)}</h6>
                             <p>{item.description.substring(0,15)}</p>
                          </div>
                       </div>
                    </td>
                    <td>{item.category?.name}</td>
                    <td>{item.brand}</td>
                    <td>
                       <div style={{ width:'60px'}}>
                          <del className="old">${item.oldPrice}</del>
                          <span className="new text-danger">${item.price}</span>
                       </div>
                    </td>
                    <td><Rating name="read-only" defaultValue={item.rating} precision={0.5} readOnly /></td>
                    <td>{item.discount}</td>
                    <td> {item?.productSize.map((size)=>{
                      return(
                        <span className="bage">
                          {size}
                        </span>
                      )
                      })}
                    </td>
                    <td> {item?.productRAMS.map((Rams)=>{
                      return(
                        <span className="bage">
                          {Rams}
                        </span>
                      )
                      })}
                    </td>
                    <td>{item.countInStock}</td>
                    <td> 30 </td>
                    <td>
                       <div className="d-flex justify-content-center align-items-center actions">
                           <Link to='/Product-view'>
                            <Button className="secondary" color='secondary'> <FaEye/> </Button>
                           </Link>
                           <Link to={`/Product-Edit/${item.id}`}>
                           <Button className="success" color='success'> <FaPencilAlt/> </Button>
                           </Link>
                            <Button className="error" color='error'onClick={()=>deleteProduct(item.id)}> <MdDelete/> </Button>
                       </div>
                    </td>
                  </tr>
                   )
                })}
                
              </tbody>
             </table>

             {productList?.totalPage > 1 && 
               <div className="d-flex justify-content-between align-items-center tableFooter">
               <p>
                 Showing <b>{productList?.page}</b> of <b>{productList?.totalPosts}</b> results{" "}
               </p>
               <Pagination count={productList?.totalPage} color="primary" showFirstButton showLastButton onChange={changePagintionData} />
              </div>
             }
        </div>
        </div>

      
      </div>
    </>
  );
}
