import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "./cart.css";
import { Divider } from '@mui/material';
import {LoginContext} from "../context/ContextProvider";
import CircularProgress from '@mui/material/CircularProgress';


const Cart = () => {

    const { id } = useParams("")
    // console.log(id);

    const history = useNavigate("");

    const {account,setAccount} = useContext(LoginContext)
    console.log("account::" + account)

    const [indData, setIndData] = useState("");

    // console.log(indData);



    const getinddata = async () => {
        const res = await fetch(`/getproductsone/${id}`, {
            method: "GET",
            headers: {

                "Content-Type": "application/json"
            },
        });


        const data = await res.json();
        console.log('data::', data);

        if (res.status !== 201) {
            alert("no data available")
        } else {
            console.log("get data");
            setIndData(data);
        }
    };

    useEffect(() => {
        setTimeout(getinddata,1000)      
    }, [id]);

    //add to cart function
    const addtocart = async(id) => {
        console.log(id);
        const checkres = await fetch(`/addcart/${id}`,{
            method:"POST",
            headers: {
                Accept:"application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                indData
            }),
            credentials:"include"
        });
        console.log("checkres" + checkres);
        
        const data1 = await checkres.json();
        console.log(data1);

        if(checkres.status === 401 || !data1){
            console.log("user invalid")
            alert("user invalid")

        }else{
            // alert("data added in your cart");
            history("/buynow")
            setAccount(data1)
        }
    }


    return (
        <div className='cart_section'>
             {indData && Object.keys(indData).length &&
            
            <div className="cart_container">

                <div className="left_cart">

                    <img src={indData.detailUrl} alt="cart-img" />

                    <div className="cart_btn">
                        <button className='cart_btn1' onClick={() => addtocart(indData.id)}>Add to Cart</button>
                        <button className='cart_btn2'>Buy Now</button>
                    </div>

                </div>

                <div className="right_cart">
                    <h3>{indData.title.shortTitle}</h3>
                    <h4>{indData.title.longTitle}</h4>
                    <Divider />
                    <p className="mrp">M.R.P. : Rs {indData.price.mrp} </p>
                    <p>Deal of the Day : <span style={{ color: '#B12704' }}>Rs {indData.price.cost}.00</span> </p>
                    <p>You save : <span style={{ color: '#B12704' }}>Rs {indData.price.mrp - indData.price.cost} ({indData.price.discount})</span> </p>
                    
                    <div className="discount_box">
                        <h5>Discount : <span style={{ color: "#111" }}>{indData.discount}</span></h5>
                        <h4>Free Delivery : <span style={{ color: "#111", fontWeight: 600 }}>Oct 8 - 21</span> Details</h4>
                        <p>Fastest delivery: <span style={{ color: "#111", fontWeight: "600" }}> Tomorrow 11AM</span></p>
                    </div>
                    <p className='description'>About this page : <span style={{ color: "#565959", fontSize: "14px", fontWeight: 500, letterSpacing: "0.4px" }}>{indData.description}</span></p>
                </div>
            </div>
    }

    {!indData ? <div className="circle">
            <CircularProgress />
            <h2>Loading...</h2>
          </div>:""}
        </div> 
        )  
        
}

export default Cart