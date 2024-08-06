import React, { useEffect, useState } from 'react'
import { editdata, fetchDataFormApi } from '../../utility/Api';
import Dialog from "@mui/material/Dialog";
import { Button } from "@mui/material";
import { MdClose } from "react-icons/md";

export default function OrderList() {
    const [order, setOrder] = useState([]);
    const [orderProduct, setOrderProduct] = useState([]);
    const [isModelopen, setisModelOpen] = useState(false);
    
    const handleClose = () => {
      setisModelOpen(false);
    };
  
    useEffect(() => {
      window.scrollTo(0,0)
      fetchDataFormApi(`/api/order`).then((res) => {
        setOrder(res);
      });
    }, []);
  
    const showProducts = (id) =>{
       fetchDataFormApi(`/api/order/${id}`).then((res)=>{
        setisModelOpen(true)
          setOrderProduct(res.productDetail)
  
       })
    };
    
    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Intl.DateTimeFormat("en-US", options).format(new Date(dateString));
      };
  
    const handlechange = (e, value) => {
      fetchDataFormApi(`/api/order?page=${value}$perpage=8`).then((res) => {
        setOrder(res);
      });
    };
    
    
    const orderStatus = (status, id)=>{
        fetchDataFormApi(`/api/order?${id}`).then((res)=>{
            const order ={
                status:status
            }
            editdata(`/api/order/${id}`, order).then((res)=>{
                fetchDataFormApi(`/api/order`).then((res) => {
                    setOrder(res);
                  });
            })
        })
    }
  return (
    <div>
          <div className="right-content">
        <div className="breadcrumbs p-3">
          <h5 className="lh-0">Order List</h5>
          {/* <div className="d-flex ">
            <Breadcrumb
              label="DashBoard"
              icon={<HomeIcon fontSize="small" />}
            />
            <span>/</span>
            <Breadcrumb label="Order List" />
          </div> */}
        </div>
        <div className="card shadow border-0 p-3 mt-4">
          <h3 className="hd">Order List</h3>

          <div className="table-responsive mt-3 tableOrder">
            <table className="table table-bordered  v-align">
            <thead className="thead-dark">
                <tr className="font-weight-bolder" style={{ color: "#000000" }}>
                  <th>Date</th>
                  <th>Payment ID</th>
                  <th>Customer Name</th>
                  <th>Products</th>
                  <th>Order Status</th>
                  <th> Total Amount</th>
                  <th>Address</th>
                  <th>Email</th>
                  <th>User ID</th>
                  <th>Payment Status</th>
                  <th>Payment Type</th>
                  <th>Country</th>
                  <th>City</th>
                </tr>
              </thead>
              <tbody>
                {order?.orderList?.length !== 0 &&
                  order?.orderList?.map((item, index) => {
                    return (
                      <React.Fragment>
                        <tr
                          className=""
                          key={index}
                          style={{ color: "#000000" }}
                        >
                           <td> {formatDate(item.createdAt)} </td>
                          <td> {item.paymentDetails.paymentId} </td>
                          <td className="text-capitalize">
                            {" "}
                            {item.shippingAddress.fullName}{" "}
                          </td>
                          <td>
                            {" "}
                            <span
                              className="font-weight-bold cursor"
                              onClick={()=> showProducts(item._id)}
                            >
                              {" "}
                              Click here and Show Products{" "}
                            </span>
                          </td>
                          <td className="text-capitalize">
                            {" "}
                            {item.status === "Pending" ? (
                              <span className="badge badge-danger p-2 " onClick={()=>orderStatus("Confim", item._id)}>
                                {item.status}
                              </span>
                            ) : (
                              <span className="badge badge-success p-2" onClick={()=>orderStatus("Pending", item._id)}>
                                {item.status}
                              </span>
                            )}{" "}
                          </td>
                          <td> {item.totalAmount} </td>
                          <td>
                            {item.shippingAddress.addressLine1}
                            {/* <td> {item.shippingAddress.addressLine2}</td> */}
                          </td>
                          <td> {item.email}</td>
                          <td> {item.userId}</td>
                          <td className="text-capitalize">
                            {" "}
                            {item.paymentDetails.paymentStatus}
                          </td>
                          <td className="text-capitalize">
                            {" "}
                            {item.paymentDetails.payment_method_type}
                          </td>
                          <td> {item.shippingAddress.country}</td>
                          <td> {item.shippingAddress.city}</td>
                        </tr>
                      </React.Fragment>
                    );
                  })}
              </tbody>
            </table>

            <Dialog
        open={isModelopen}
        onClose={handleClose}
        className="tableOrder"
      >
        <Button className="close" onClick={handleClose}>
          <MdClose />
        </Button>
        <h4 className="ml-3">OrderList Products</h4>

        <div className="table-responsive tableOrder p-3 ">
          <table className="table table-striped table-bordered tableOrder">
            <thead className="thead-dark">
              <tr>
                <th> ID</th>
                <th> Name</th>
                <th> Image</th>
                <th> Price</th>
                <th> Quantity</th>
                <th> SubTotal</th>
              </tr>
            </thead>
            <tbody>
                {orderProduct?.Length !==0 && orderProduct?.map((item,index)=>{
                  return(
                      <tr>
                         <td> {item.productId} </td>
                         <td> {item.name.substring(0,20)} </td>
                         <td >
                          <div className="img"> <img src={item.image} alt="" />  </div>
                         </td>
                         <td> {item.price} </td>
                         <td> {item.quantity} </td>
                         <td> {item.subTotal} </td>
                         
                      </tr>
                  )
                })}
            </tbody>
          </table>
        </div>
      </Dialog>

            {order?.totalPage > 1 &&
              <div className="d-flex justify-content-between align-items-center tableFooter">
              <p>
                Showing <b>{order?.page}</b> of <b>{order?.totalPosts}</b> results{" "}
              </p>
              {/* <Pagination count={order?.totalPage} color="primary" showFirstButton showLastButton  /> */}
            </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}
