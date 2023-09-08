import React, { useState, useEffect } from 'react';
import { Container, Carousel } from 'react-bootstrap';
import '../assets/Home.css';
import Axios from 'axios';
import { connect } from "react-redux";
import { API_URL } from '../constants/API';
import Search from '../pages/Search';

const Home = (props) => {
  const [products, setProducts] = useState([]);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);

  const fetchProducts = async () => {
    try {
      const response = await Axios.get(`${API_URL}/products`);
      if (response.status === 200) {
        setProducts(response.data.slice(0, 5)); // Limit to 5 products
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchProducts();

    const interval = setInterval(() => {
      setCurrentProductIndex((prevIndex) =>
        prevIndex === products.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [products]);

  const handleSelect = (selectedIndex) => {
    setCurrentProductIndex(selectedIndex);
  };

  return (
    <div className='homeContainer'>
      <div className="sliderLanding" id='grad' >
        <Container className="text-center" >
          <Carousel
            activeIndex={currentProductIndex}
            onSelect={handleSelect}
            interval={3000}
          >
            {products.map((product, index) => (
              <Carousel.Item key={product.id}>
              <img
                src={product.productImage}
                alt={product.productName}
                className="img-carousel"
                style={{
                  display: 'block',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  height: '300px',
                  width: '500px',
                  objectFit: 'cover'
                }}
              />
              <Carousel.Caption className="carousel-caption">
                <h3>{product.productName}</h3>
                <p>{product.description}</p>
              </Carousel.Caption>
            </Carousel.Item>
            
            ))}
          </Carousel>
        </Container>
      </div>
      {
        props.userGlobal.username ?
          <Search />
          : <div className="mt-5 text-center">
            <h1>Interested?</h1>
            <p>Explore more by logging in</p>
          </div>
      }
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userGlobal: state.user
  }
}

export default connect(mapStateToProps)(Home);
