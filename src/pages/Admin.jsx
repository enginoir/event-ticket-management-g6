import React, { Component } from "react";
import Axios from "axios";
import { API_URL } from "../constants/API";
import "../assets/styles/admin.css"
import {connect} from "react-redux"
import { Link } from "react-router-dom";

class Admin extends Component {
    state = {
        productList: [],
        addProductName: "",
        addPrice: 0,
        addProductImage: "",
        addDescription: "",
        addCategory: "",

        editId:0,

        editProductName: "",
        editPrice: 0,
        editProductImage: "",
        editDescription: "",
        editCategory: "",
  }

  fetchProducts = () => {
    Axios.get(`${API_URL}/products`)
      .then((result) => {
        this.setState({ productList: result.data });
      })
      .catch(() => {
        alert("Terjadi kesalahan di server");
      });
  };


  editToggle = (editData) => {
    this.setState({
        editId: editData.id, 
        editProductName: editData.productName,
        editPrice: editData.price,
        editProductImage: editData.productImage,
        editDescription: editData.description,
        editCategory: editData.category,
    })
  }

  cancelEdit = () => {
    this.setState({ editId: 0})
  }

  saveBtnHandler = () => {
    Axios.patch(`${API_URL}/products/${this.state.editId}`, {
        productName: this.state.editProductName,
        price: parseInt(this.state.editPrice),
        productImage: this.state.editProductImage,
        description: this.state.editDescription,
        category: this.state.editCategory,
    })
    .then(() => {
        this.fetchProducts()
        this.cancelEdit();
    })
    .catch(() => {
        alert("Terjadi kesalahan")
    })
  }

  deleteBtnHandler = (deleteId) => {
    const confirmDelete = window.confirm("Are you sure you want delete this event?");
    if (confirmDelete) {
        Axios.delete(`${API_URL}/products/${deleteId}`)
        .then(() => {
            this.fetchProducts();
        })
        .catch(() => {
            alert("Terjadi kesalahan di server!")
        })
    } else {
        alert("Cancel delete barang");
    }
    }

  renderProducts = () => {
    return this.state.productList.map((val) => {
    if (val.id === this.state.editId) {
        return (
            <tr>
                <td>{val.id}</td>
                <td> <input value={this.state.editProductName} onChange={this.inputHandler} type="text" className="form-control" name="editProductName"/> </td>
                <td> <input value={this.state.editPrice} onChange={this.inputHandler} type="number" className="form-control" name="editPrice"/> </td>
                <td> <input value={this.state.editProductImage} onChange={this.inputHandler} type="text" className="form-control" name="editProductImage"/> </td>
                <td> <input value={this.state.editDescription} onChange={this.inputHandler} type="text" className="form-control" name="editDescription"/> </td>
                <td>
                    <select value={this.state.editCategory} onChange={this.inputHandler} name="EditCategory" className="form-control">
                      <option value="">All Events</option>
                      <option value="sport">Sport</option>
                      <option value="food">Food</option>
                      <option value="festival">Festival</option>
                      <option value="education">Education</option>
                      <option value="game">Game</option>
                    </select>
                </td>
                <td>
                    <button onClick={this.saveBtnHandler} className="btn btn-success">Save</button>
                </td>
                <td>
                    <button onClick={this.cancelEdit} className="btn btn-danger">Cancel</button>
                </td>
            </tr>
        )
    }
    return (
        <tr>
          <td>{val.id}</td>
          <td>{val.productName}</td>
          <td>{val.price}</td>
          <td>
            <img className="admin-product-image" src={val.productImage} alt="" />
          </td>
          <td>{val.description}</td>
          <td>{val.category}</td>
          <td>
            <button onClick={() => this.editToggle(val)} className="btn btn-secondary">Edit</button>
          </td>
          <td>
            <button onClick={() => this.deleteBtnHandler(val.id)} className="btn btn-danger">Delete</button>
          </td>
        </tr>
      );
    });
  };

  addNewProduct = () => {
    Axios.post(`${API_URL}/products`, {
        productName: this.state.addProductName,
        price: parseInt(this.state.addPrice),
        productImage: this.state.addProductImage,
        description: this.state.addDescription,
        category: this.state.addCategory,
    })
    .then(() => {
        this.fetchProducts()
        this.setState({
            addProductName: "",
            addPrice: 0,
            addProductImage: "",
            addDescription: "",
            addCategory: "",
        })
    })
    .catch(() => {
        alert("Terjadi Kesalahan di Server")
    })
  }

  inputHandler = (event) => {
    const {name, value} = event.target

    this.setState({ [name]: value });
  }

  componentDidMount() {
    this.fetchProducts();
  }

  render() {
    if (this.props.userGlobal.role !== "admin") {
        return (
            <div style={{ textAlign: "center" }}>
                <p>You are not authorized.</p>
                <Link to="/">
                    <button className="btn btn-danger">Go Back to Home</button>
                </Link>
            </div>

        );
    }

    return (
      <div className="p-5">
        <div className="row">
          <div className="col-12 text-center">
            <h1>Manage Events</h1>
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
              <tbody>{this.renderProducts()}</tbody>
              <tfoot className="bg-light">
                <tr>
                  <td></td>
                  <td>
                    <input value={this.state.addProductName} onChange={this.inputHandler} name="addProductName" type="text" className="form-control" />
                  </td>
                  <td>
                    <input value={this.state.addPrice} onChange={this.inputHandler} name="addPrice" type="number" className="form-control" />
                  </td>
                  <td>
                    <input value={this.state.addProductImage} onChange={this.inputHandler} name="addProductImage" type="text" className="form-control" />
                  </td>
                  <td>
                    <input value={this.state.addDescription} onChange={this.inputHandler} name="addDescription" type="text" className="form-control" />
                  </td>
                  <td>
                    <select value={this.state.addCategory} onChange={this.inputHandler} name="addCategory" className="form-control">
                      <option value="">All Events</option>
                      <option value="sport">Sport</option>
                      <option value="food">Food</option>
                      <option value="festival">Festival</option>
                      <option value="education">Education</option>
                      <option value="game">Game</option>
                    </select>
                  </td>
                  <td colSpan="2">
                    <button onClick={this.addNewProduct} className="btn btn-info">Add Event</button>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        userGlobal: state.user,
    };
};

export default connect(mapStateToProps)(Admin);