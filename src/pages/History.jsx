import Axios from "axios";
import React, { useState, useEffect } from "react";
import { API_URL } from "../constants/API";
import { connect } from "react-redux";

function History(props) {
    const [transactionList, setTransactionList] = useState([]);
    const [transactionDetails, setTransactionDetails] = useState([]);

    const fetchTransactions = () => {
        Axios.get(`${API_URL}/transactions`, {
            params: {
                userId: props.userGlobal.id,
            },
        })
            .then((result) => {
                setTransactionList(result.data);
            })
            .catch(() => {
                alert("Terjadi kesalahan di server");
            });
    };

    const seeDetailsBtnHandler = (transactionItems) => {
        setTransactionDetails(transactionItems);
    };

    useEffect(() => {
        fetchTransactions();
    }, [props.userGlobal.id]); // Dependency array to run the effect whenever userGlobal.id changes

    const renderTransactions = () => {
        return transactionList.map((val, index) => {
            return (
                <tr key={index}>
                    <td>{val.transactionDate}</td>
                    <td>{val.transactionItems.length} Chosen Event(s)</td>
                    <td>Rp {val.totalPrice}</td>
                    <td>
                        <button onClick={() => seeDetailsBtnHandler(val.transactionItems)} className="btn btn-info">
                            See details
                        </button>
                    </td>
                </tr>
            );
        });
    };

    const renderTransactionDetailsItems = () => {
        return transactionDetails.map((val, index) => {
            return (
                <div key={index} className="d-flex my-2 flex-row justify-content-between align-items-center">
                    <span className="font-weight-bold">
                        {val.productName} ({val.quantity})
                    </span>
                    <span>Rp {val.price * val.quantity}</span>
                </div>
            );
        });
    };

    return (
        <div className="p-5">
            <h1>Transaction History</h1>
            <div className="row mt-5">
                <div className="col-8">
                    <table className="table">
                        <thead className="thead-light">
                            <tr>
                                <th>Transaction Date</th>
                                <th>Total Chosen Events</th>
                                <th>Total Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>{renderTransactions()}</tbody>
                    </table>
                </div>
                <div className="col-4">
                    {transactionDetails.length ? (
                        <div className="card">
                            <div className="card-header">
                                <strong>Transaction Details</strong>
                            </div>
                            <div className="card-body">{renderTransactionDetailsItems()}</div>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        userGlobal: state.user,
    };
};

export default connect(mapStateToProps)(History);
