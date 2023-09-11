import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from 'axios';
import { API_URL } from "../constants/API";
import { connect } from "react-redux";
import "../assets/styles/ProductDetail.css";
import { getCartData } from '../redux/actions/cart'

import ReactStars from "react-rating-stars-component";
import { Input } from "reactstrap";
import CommentSection from "../components/Comment";

function ProductDetail(props) {
    const { productId } = useParams();
    const [productData, setProductData] = useState({});
    const [productNotFound, setProductNotFound] = useState(false);
    const [quantity, setQuantity] = useState(1);

    const fetchProductData = () => {
        Axios.get(`${API_URL}/products/${productId}`)
            .then((result) => {
                if (result.data) {
                    setProductData(result.data);
                } else {
                    setProductNotFound(true);
                }
            })
            .catch(() => {
                alert("Error fetching product data");
            });
    };

    const qtyBtnHandler = (action) => {
        if (action === "increment") {
            setQuantity(quantity + 1);
        } else if (action === "decrement" && quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const addToCartHandler = () => {
        // Check apakah user sudah memiliki barang tsb di cart
        Axios.get(`${API_URL}/carts`, {
            params: {
                userId: props.userGlobal.id,
                productId: productData.id,
            }
        })
            .then((result) => {
                if (result.data.length) {
                    Axios.patch(`${API_URL}/carts/${result.data[0].id}`, {
                        quantity: result.data[0].quantity + quantity
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
                        productId: productData.id,
                        price: productData.price,
                        productName: productData.productName,
                        productImage: productData.productImage,
                        quantity: quantity,
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

    useEffect(() => {
        fetchProductData();
    }, [productId]);

    const ratingChanged = (newRating) => {
        console.log(newRating);
    };

    return (
        <div className="container">
            {productNotFound ? (
                <div className="alert alert-warning mt-3"> Product with ID {productId} has not been found </div>
            ) : (
                <div className="row mt-3">
                    <div className="col-6">
                        <img
                            style={{ width: "100%" }}
                            src={productData.productImage}
                            alt=""
                        />
                    </div>
                    <div className="col-6 d-flex flex-column justify-content-center">
                        
                        <h4>{productData.productName}</h4>
                        <h5>Rp {productData.price}</h5>
                        <p>{productData.description}</p>
                        <div className="d-flex flex-row align-items-center justify-content-center">
                            <button onClick={() => qtyBtnHandler("decrement")} className="btn btn-primary mr-4" style={{ marginLeft: 20 }}>
                                -
                            </button>
                            <div style={{ marginLeft: 20 }}>
                                {quantity}
                            </div>
                            <button onClick={() => qtyBtnHandler("increment")} className="btn btn-primary mx-4">
                                +
                            </button>
                        </div>
                        <button onClick={addToCartHandler} className="btn btn-success mt-3">
                            Add to cart
                        </button>
                       
                        <CommentSection/>
                    </div>

                </div>
            )}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        userGlobal: state.user,
    };
};

const mapDispatchToProps = {
    getCartData,
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);