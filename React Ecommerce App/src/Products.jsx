
import React, { useState, useEffect } from 'react';
import { Box, Grid, Input, Select, Button, Checkbox, CheckboxGroup, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Text } from '@chakra-ui/react';
import ProductCard from './ProductCard';

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

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(buildApiUrl(), {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzEyMTU1NjM5LCJpYXQiOjE3MTIxNTUzMzksImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjljNDE5Nzc1LTlmNjctNGFiYy1hYzU5LTEyYzYxNGQyODYzOCIsInN1YiI6InBzNzM1NUBzcm1pc3QuZWR1LmluIn0sImNvbXBhbnlOYW1lIjoiU1JNIElOU1RJVFVURSBPRiBTQ0lFTkNFIEFORCBURUNITk9MT0dZIiwiY2xpZW50SUQiOiI5YzQxOTc3NS05ZjY3LTRhYmMtYWM1OS0xMmM2MTRkMjg2MzgiLCJjbGllbnRTZWNyZXQiOiJJakZJTWpCdmdubG9nZkhhIiwib3duZXJOYW1lIjoiUCBHIFNJVkFSQU5KQU4iLCJvd25lckVtYWlsIjoicHM3MzU1QHNybWlzdC5lZHUuaW4iLCJyb2xsTm8iOiJSQTIxMTEwMDMwMTEzMjgifQ.qkvVPHlx05uRbecry3lASIsgEmcjcbwh-aa1okIvedc`,
        },
      });
      const data = await response.json();
      console.log(data);
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const buildApiUrl = () => {
    const { company, category, minPrice, maxPrice } = filters;
    return `http://20.244.56.144/test/companies/${company.join(',')}/categories/${category.join(',')}/products?top=10&minPrice=${minPrice}&maxPrice=${maxPrice}`;
  };

  const handleCheckboxChange = (name, values) => {
    setFilters({ ...filters, [name]: values });
  };

  const handleSliderChange = (name, value) => {
    setFilters({ ...filters, [name]: value });
  };

  return (
    <Box p={4}>
      <Grid templateColumns="repeat(3, 1fr)" gap={4}>
        <Box>
          <Text mb={2}>Company</Text>
          <CheckboxGroup colorScheme="teal" value={filters.company} onChange={(values) => handleCheckboxChange('company', values)}>
            {companies.map(company => (
              <Checkbox key={company} value={company}>{company}</Checkbox>
            ))}
          </CheckboxGroup>
          <Text mt={4} mb={2}>Category</Text>
          <CheckboxGroup colorScheme="teal" value={filters.category} onChange={(values) => handleCheckboxChange('category', values)}>
            {categories.map(category => (
              <Checkbox key={category} value={category}>{category}</Checkbox>
            ))}
          </CheckboxGroup>
          <Text mt={4} mb={2}>Min Price</Text>
          <Slider defaultValue={filters.minPrice} min={0} max={1000} step={1} onChange={(value) => handleSliderChange('minPrice', value)}>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
          <Text fontSize="sm" textAlign="center">{filters.minPrice}</Text>
          <Text mt={4} mb={2}>Max Price</Text>
          <Slider defaultValue={filters.maxPrice} min={0} max={1000} step={1} onChange={(value) => handleSliderChange('maxPrice', value)}>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
          <Text fontSize="sm" textAlign="center">{filters.maxPrice}</Text>
          <Button mt={4} colorScheme="teal" onClick={fetchProducts}>Filter</Button>
        </Box>
        <Box>
          {products && products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Box>
      </Grid>
    </Box>
  );
}

export default Products;
