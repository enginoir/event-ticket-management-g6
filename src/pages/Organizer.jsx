import React, { useState, useEffect } from "react";
import Axios from "axios";
import { API_URL } from "../constants/API";
import { connect } from "react-redux";

function Organizer(props) {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
        productName: "",
        price: 0,
        productImage: "",
        description: "",
        addCategory: "",
    });

    const fetchOrganizerProducts = () => {
        Axios.get(`${API_URL}/products`, {
        params: {
            organizerId: props.userGlobal.id, // Fetch only products by the organizer
        },
        })
        .then((result) => {
            setProducts(result.data);
        })
        .catch((error) => {
            console.error("Error fetching products:", error);
            alert("Error fetching products.");
        });
    };

    const inputHandler = (event) => {
        const { name, value } = event.target;
        setNewProduct({
        ...newProduct,
        [name]: value,
        });
    };

    const addNewProduct = () => {
        // Add validation logic here if needed

        Axios.post(`${API_URL}/products`, {
        ...newProduct,
        organizerId: props.userGlobal.id,
        })
        .then(() => {
            alert("Product added successfully.");
            fetchOrganizerProducts();
            setNewProduct({
            productName: "",
            price: 0,
            productImage: "",
            description: "",
            addCategory: "",
            });
        })
        .catch(() => {
            alert("Error adding product.");
        });
    };

    const deleteProduct = (productId) => {
        Axios.delete(`${API_URL}/products/${productId}`)
        .then(() => {
            alert("Product deleted successfully.");
            fetchOrganizerProducts();
        })
        .catch(() => {
            alert("Error deleting product.");
        });
    };

    useEffect(() => {
        if (props.userGlobal.role === "organizer") {
        fetchOrganizerProducts();
        }
    }, [props.userGlobal.id, props.userGlobal.role]);

    const renderProducts = () => {
        return products.map((product) => (
        <tr key={product.id}>
            <td>{product.id}</td>
            <td>{product.productName}</td>
            <td>{product.price}</td>
            <td>
            {product.productImage && (
                <img
                src={product.productImage}
                alt="Product"
                width="200"
                height="200"
                />
            )}
            </td>
            <td>{product.description}</td>
            <td>{product.category}</td>
            <td>
            <button onClick={() => deleteProduct(product.id)} className="btn btn-danger">Delete</button>
            </td>
        </tr>
        ));
    };

    return (
        <div className="p-5">
            <div className="row">
                <div className="col-12 text-center">
                <h1>Manage Your Events</h1>
                <table className="table mt-4">
                    <thead className="thead-light">
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Image</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th colSpan="2">Action</th>
                    </tr>
                    </thead>
                    <tbody>{renderProducts()}</tbody>
                    <tfoot className="bg-light">
                    <tr>
                        <td></td>
                        <td>
                        <input
                            value={newProduct.productName}
                            onChange={inputHandler}
                            name="productName"
                            type="text"
                            className="form-control"
                        />
                        </td>
                        <td>
                        <input
                            value={newProduct.price}
                            onChange={inputHandler}
                            name="price"
                            type="number"
                            className="form-control"
                        />
                        </td>
                        <td>
                        <input
                            value={newProduct.productImage}
                            onChange={inputHandler}
                            name="productImage"
                            type="text"
                            className="form-control"
                        />
                        </td>
                        <td>
                        <input
                            value={newProduct.description}
                            onChange={inputHandler}
                            name="description"
                            type="text"
                            className="form-control"
                        />
                        </td>
                        <td>
                        <select
                            value={newProduct.addCategory}
                            onChange={inputHandler}
                            name="addCategory"
                            className="form-control"
                        >
                            <option value="">All Events</option>
                            <option value="sport">Sport</option>
                            <option value="food">Food</option>
                            <option value="festival">Festival</option>
                            <option value="education">Education</option>
                            <option value="game">Game</option>
                        </select>
                        </td>
                        <td colSpan="2">
                        <button onClick={addNewProduct} className="btn btn-info">
                            Add Event
                        </button>
                        </td>
                    </tr>
                    </tfoot>
                </table>
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

export default connect(mapStateToProps)(Organizer);
