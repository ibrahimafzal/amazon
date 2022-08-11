import React,{useState,useEffect} from 'react'


const Right = ({item}) => {

    const [price, setPrice] = useState(0);

    useEffect(() => {
        totalAmount();
    }, [item])

    const totalAmount = () => {
        let price = 0;
        item.map((iteam) => {
            price += iteam.price.cost
        });
        setPrice(price)
    }

    return (
        <div className='right_buy'>
            <img src="https://images-eu.ssl-images-amazon.com/images/G/31/checkout/assets/TM_desktop._CB443006202_.png" alt="" />
            <div className="cost_right">
                <p>Your order is eligible for free delivery</p>
                <span style={{ color: "#565959" }}>Select this option at checkout. Details</span>
                <h3>Subtotal ({item.length} item): <span style={{ fontWeight: 700 }}>Rs/- {price}.00</span></h3>
                <button className='rightbuy_btn'>Process to Buy</button>
                <div className="emi">
                    Emi available
                </div>
            </div>
        </div>
    )
}

export default Right;