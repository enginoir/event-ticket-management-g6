import React from "react";
import "../assets/styles/ProductCard.css"

export default function ProductCard(props){
    return (
        <div className="card product-card">
            <img src={props.productData.productImage} alt=""/>

            <div className="mt-1">
                <div>
                    <h4>{props.productData.productName}</h4>
                    <span className="text-muted">Rp. {props.productData.price}</span>
                </div>

                <div className="d-flex flex-row justify-content-end">
                    <button className="btn btn-primary mt-2">Add to Cart</button>
                </div>

            </div>

        </div>  
    )
}