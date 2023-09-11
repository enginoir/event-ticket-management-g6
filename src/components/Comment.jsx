import React from "react";
import "../assets/styles/ProductCard.css";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import Axios from "axios"
import { API_URL } from "../constants/API";
import { getCartData } from '../redux/actions/cart'

function ProductCard(props) {
    
    const addToCartHandler = () => {
        // Check apakah user sudah memiliki barang tsb di cart
        Axios.get(`${API_URL}/carts`, {
            params: {
                userId: props.userGlobal.id,
                productId: props.productData.id,
            }
        })
        .then((result) => {
            if (result.data.length) {
                Axios.patch(`${API_URL}/carts/${result.data[0].id}`, {
                    quantity: result.data[0].quantity + 1
                })
                .then(() => {
                    alert("Berhasil menambahkan barang");
                    props.getCartData(props.userGlobal.id)
                })
                .catch(() => {
                    alert("Terjadi kesalahan di server");
                })
            } else {
                Axios.post(`${API_URL}/carts`, {
                    userId: props.userGlobal.id,
                    productId: props.productData.id,
                    price: props.productData.price,
                    productName: props.productData.productName,
                    productImage: props.productData.productImage,
                    quantity: 1,
                })
                .then(() => {
                    alert("Berhasil menambahkan barang");
                    props.getCartData(props.userGlobal.id)
                })
                .catch(() => {
                    alert("Terjadi kesalahan di server");
                });
            };
        })
    }

    return (
        <div className="card product-card">
            <img src={props.productData.productImage} alt="" />
            <div className="mt-1">
                <div>
                    <Link to={`/product-detail/${props.productData.id}`}>
                        <h4>{props.productData.productName}</h4>
                    </Link>
                    <span className="text-muted">Rp. {props.productData.price}</span>
                </div>
                <div className="d-flex flex-row justify-content-end">
                    <button onClick={addToCartHandler} className="btn btn-primary mt-2">Add to Cart</button>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        userGlobal: state.user,
    }
}

const mapDispatchToProps = {
    getCartData,
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard)