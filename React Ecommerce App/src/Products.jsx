import React, { useState, useEffect } from 'react';
import { Box, Grid, Input, Checkbox, CheckboxGroup, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Text, Button } from '@chakra-ui/react';
import ProductCard from './ProductCard';
import {Modal,ModalOverlay,ModalContent,ModalHeader,ModalBody,ModalCloseButton,} from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'

const companies = ["AMZ", "FLP", "SNP", "MYN", "AZO"];
const categories = ["Phone", "Computer", "TV", "Earphone", "Tablet", "Charger", "Mouse", "Keypad", "Bluetooth", "Pendrive", "Remote", "Speaker", "Headset", "Laptop", "PC"];

function Products() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    company: [],
    category: [],
    minPrice: 0,
    maxPrice: 100000,
  });
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {

    showmodals(9000);
    fetch();
  }, []);


  const showmodals = (milliseconds) => {
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
    }, milliseconds);
  };
  
  const fetch = async () => {
    try {
      const response = await fetch(getUrl(), {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzEyMTU0NzcwLCJpYXQiOjE3MTIxNTQ0NzAsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjljNDE5Nzc1LTlmNjctNGFiYy1hYzU5LTEyYzYxNGQyODYzOCIsInN1YiI6InBzNzM1NUBzcm1pc3QuZWR1LmluIn0sImNvbXBhbnlOYW1lIjoiU1JNIElOU1RJVFVURSBPRiBTQ0lFTkNFIEFORCBURUNITk9MT0dZIiwiY2xpZW50SUQiOiI5YzQxOTc3NS05ZjY3LTRhYmMtYWM1OS0xMmM2MTRkMjg2MzgiLCJjbGllbnRTZWNyZXQiOiJJakZJTWpCdmdubG9nZkhhIiwib3duZXJOYW1lIjoiUCBHIFNJVkFSQU5KQU4iLCJvd25lckVtYWlsIjoicHM3MzU1QHNybWlzdC5lZHUuaW4iLCJyb2xsTm8iOiJSQTIxMTEwMDMwMTEzMjgifQ.-bhqQijhnRLQg_7e2t5ST3bYSMcDFzP17vt0t6uXoDw`,
        },
      });
      const data = await response.json();
      console.log(data);
      setProducts(data);
    } catch (error) {
      console.error('error:', error);
    }
  };

  const getUrl = () => {
    const { company, category, minPrice, maxPrice } = filters;
    return `http://20.244.56.144/test/companies/${company.join(',')}/categories/${category.join(',')}/products?top=10&minPrice=${minPrice}&maxPrice=${maxPrice}`;
  };

  const checkbox = (name, values) => {
    setFilters({ ...filters, [name]: values });
  };

  const slider = (name, value) => {
    setFilters({ ...filters, [name]: value });
  };

  return (
    <Box p={4}>
      <Grid templateColumns="repeat(3, 1fr)" gap={4}>
        <Box>
          <Text mb={2}>Company</Text>
          <CheckboxGroup colorScheme="teal" value={filters.company} onChange={(values) => checkbox('company', values)}>
            {companies.map(company => (
              <Checkbox key={company} value={company}>{company}</Checkbox>
            ))}
          </CheckboxGroup>
          <Text mt={4} mb={2}>Category</Text>
          <CheckboxGroup colorScheme="teal" value={filters.category} onChange={(values) => checkbox('category', values)}>
            {categories.map(category => (
              <Checkbox key={category} value={category}>{category}</Checkbox>
            ))}
          </CheckboxGroup>
          <Text mt={4} mb={2}>Min Price</Text>
          <Slider defaultValue={filters.minPrice} min={0} max={1000} step={1} onChange={(value) => slider('minPrice', value)}>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
          <Text fontSize="sm" textAlign="center">{filters.minPrice}</Text>
          <Text mt={4} mb={2}>Max Price</Text>
          <Slider defaultValue={filters.maxPrice} min={0} max={1000} step={1} onChange={(value) => slider('maxPrice', value)}>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
          <Text fontSize="sm" textAlign="center">{filters.maxPrice}</Text>
          <Button mt={4} colorScheme="teal" onClick={fetch}>Filter</Button>
        </Box>
        <Box>
          {products && products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Box>
      </Grid>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Notification</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Since the bearer authorization token changes frequently, so i am unable to access the data from test server api and display the products 
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default Products;
