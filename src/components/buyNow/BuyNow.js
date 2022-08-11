import React, { useState, useEffect } from 'react';
import "./BuyNow.css"
import { Divider } from '@mui/material';
import Option from './Option';
import Subtotal from "./Subtotal"
import Right from "./Right"

const BuyNow = () => {

    const [cartdata, setCartdata] = useState("");
    console.log("cartdata::", cartdata)

    const getdatabuy = async () => {
        const res = await fetch("/cartdetails", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        });

        const data = await res.json();

        if (res.status !== 201) {
            console.log("error");
        } else {
            setCartdata(data.carts);
        }
    };

    useEffect(() => {
        getdatabuy();
    }, [])


    return (
        <>
            {
                cartdata.length ?
                    <div className='buynow_section'>
                        <div className="buynow_container">
                            <div className="left_buy">
                                <h1>Shopping Cart</h1>
                                <p>Select all items</p>
                                <span className='leftbuyprice'>Price</span>
                                <Divider />

                                {
                                    cartdata.map((e, key) => {
                                        return (
                                            <>
                                                <div className="item_container">
                                                    <img src={e.detailUrl} alt="smartwatch" />

                                                    <div className="item_details">
                                                        <h3>{e.title.longTitle}</h3>
                                                        <h3>{e.title.shortTitle}</h3>
                                                        <h3 className='diffrentprice'>Rs/- 4049.00</h3>
                                                        <p className='unusuall'>Usually dispatched in 8 days</p>
                                                        <p>Eligible for free shipping</p>
                                                        <img src="https://m.media-amazon.com/images/G/31/marketing/fba/fba-badge_18px-2x._CB485942108_.png" alt="" />
                                                        <Option deletedata={e.id} get={getdatabuy} />
                                                    </div>
                                                    <h3 className='item_price'>Rs/- {e.price.cost}</h3>
                                                </div>
                                                <Divider />
                                            </>
                                        )
                                    })
                                }

                                <Subtotal item={cartdata} />
                            </div>
                            <Right item={cartdata} />
                        </div>
                    </div> : ""
            }
        </>
    )
}

export default BuyNow