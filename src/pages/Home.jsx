import React, { useState, useEffect } from 'react';
import { Container, Carousel } from 'react-bootstrap';
import '../assets/Home.css';
import Axios from 'axios';
import { API_URL } from '../constants/API';

const Home = () => {
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
    <div className="sliderLanding">
      <Container className="text-center">
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
              />
              <Carousel.Caption className="carousel-caption">
                <h3>{product.productName}</h3>
                <p>{product.description}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
        <div className="mt-5 text-center">
          <h1>Interested?</h1>
          <p>Explore more by logging in</p>
        </div>
      </Container>
    </div>
  );
};

export default Home;
