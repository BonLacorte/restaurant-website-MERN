import React from 'react'
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const navigate = useNavigate()
    const onCheckoutClicked = () => navigate(`/cart/payment`)

    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}>
            <button
                style={{
                    border: "none",
                    width: 120,
                    borderRadius: 5,
                    padding: "20px",
                    backgroundColor: "red",
                    color: "white",
                    fontWeight: "bold",
                    cursor: "pointer"
                }} onClick={onCheckoutClicked}>Checkout
            </button>
        </div>
    )
}

export default Cart