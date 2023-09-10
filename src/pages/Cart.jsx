import React, { useState } from "react";
import { connect } from "react-redux";
import Axios from "axios";
import { API_URL } from "../constants/API";
import { getCartData } from "../redux/actions/cart"; 

function Cart(props) {
    const [state, setState] = useState({
        isCheckoutMode:false,
        recipientName: "",
        address: "",
        payment: 0,
    });

    const deleteCartHandler = (cartId) => {
        Axios.delete(`${API_URL}/carts/${cartId}`)
            .then(() => {
                props.getCartData(props.userGlobal.id)
            })
            .catch(() => {
                alert("Terjadi kesalahan di server");
            })
    }

    const renderCart = () => {
        return props.cartGlobal.cartList.map((val) => {
            return (
                <tr key={val.id}>
                    <td className="align-middle">{val.productName}</td>
                    <td className="align-middle">{val.price}</td>
                    <td className="align-middle">
                        <img src={val.productImage} 
                        alt="" style={{ height: "125px"}} />
                    </td>
                    <td className="align-middle">{val.quantity}</td>
                    <td className="align-middle">
                        {val.quantity * val.price}
                    </td>
                    <td className="align-middle">
                        <button onClick={() => deleteCartHandler(val.id)} className="btn btn-danger">
                            Delete
                        </button>
                    </td>
                </tr>
            )
        })
    }

    const renderSubtotalPrice = () => {
        let subtotal = 0;
        for(let i = 0; i <props.cartGlobal.cartList.length; i++) {
            subtotal += props.cartGlobal.cartList[i].price * props.cartGlobal.cartList[i].quantity
        }
        return subtotal;
    }

    const renderTaxFee = () => {
        return renderSubtotalPrice() * 0.05;
    }

    const renderTotalPrice = () => {
        // return renderSubtotalPrice() + renderTaxFee;
        const subtotal = renderSubtotalPrice();
        const taxfee = renderTaxFee();
        const total = subtotal + taxfee;
        return total
    }

    const checkoutModeToggle = () => {
        setState({ isCheckoutMode: !state.isCheckoutMode })
    }

    const inputHandler = (event) => {
        const { name, value } = event.target

        setState ({ ...state, [name]: value });
    }

    const payBtnHandler = () => {

        if (state.payment < renderTotalPrice()) {
            alert(`Saldo Anda kurang ${renderTotalPrice() - state.payment}`)
            return;
        }

        if (state.payment > renderTotalPrice()) {
            alert(`Sukses, Anda mendapatkan kembalian ${ state.payment- renderTotalPrice()}`)
        } else if (state.payment === renderTotalPrice()) {
            alert ("Terima kasih, pembayaran dilakukan dengan saldo pas")
        }

        const d = new Date();
        Axios.post(`${API_URL}/transactions`, {
            userId: props.userGlobal.id,
            address: state.address,
            recipientName: state.recipientName,
            totalPrice: parseInt(renderTotalPrice()),
            totalPayment: parseInt(state.payment),
            transactionDate: `${d.getDate()}-${d.getMonth() + 1 }-${d.getFullYear()}`,
            transactionItems: props.cartGlobal.cartList,
        })
        .then((result) => {
            alert("Berhasil melakukan pembayaran")
            result.data.transactionItems.forEach((val) => {
                deleteCartHandler(val.id)
            })
        })
        .catch(() => {
            alert("Terjadi kesalahan di server");
        })
    }

    return (
        <div className="p-5 text-center">
            <h1>Cart</h1>
            <div className="row mt-5">
                <div className="col-9 text-center">
                    <table className="table">
                        <thead className="thead-light">
                            <tr>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Image</th>
                                <th>Quantity</th>
                                <th>Total Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderCart()}
                        </tbody>
                        <tfoot className="bg-light">
                            <tr>
                                <td colSpan="6">
                                    <button onClick={checkoutModeToggle} className="btn btn-success">
                                        Checkout
                                    </button>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                {
                    state.isCheckoutMode ?
                    <div className="col-3">
                        {/* //form Checkout */}
                        <div className="card">
                            <div className="card-header text-center">
                                <strong>Event(s) Order Summary</strong>
                            </div>
                            <div className="card-body">
                                <div className="d-flex my-2 flex-row justify-content-between align-items-center">
                                    <span className="font-weight-bold">Subtotal Price</span>
                                    <span>Rp {renderSubtotalPrice()}</span>
                                </div>  
                                <div className="d-flex my-2 flex-row justify-content-between align-items-center">
                                    <span className="font-weight-bold">Tax Fee (5%)</span>
                                    <span>Rp {renderTaxFee()}</span>
                                </div>
                                <div className="d-flex my-2 flex-row justify-content-between align-items-center">
                                    <span className="font-weight-bold">Total Price</span>
                                    <span>Rp {renderTotalPrice()}</span>
                                </div>
                            </div>
                            <div className="card-body border-top">
                                <label htmlFor="recipientName">Nama Penerima</label>
                                <input onChange={inputHandler} type="text" className="form-control mb-3" name="recipientName"></input>
                                <label htmlFor="address">Alamat</label>
                                <input onChange={inputHandler} type="text" className="form-control" name="address"></input>
                            </div>
                            <div className="card-footer">
                                <div className="d-flex flex-row justify-content-between align-items-center">
                                <input onChange={inputHandler} name="payment" className="form-control mx-1" type="number"/>
                                <button onClick={payBtnHandler} className="btn btn-success mx-1">Pay</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    : null
                }
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        cartGlobal: state.cart,
        userGlobal: state.user,
    }
}

const mapDispatchToProps = {
    getCartData
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
