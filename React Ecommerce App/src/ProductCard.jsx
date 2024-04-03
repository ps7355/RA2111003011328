
import React from 'react';
import { Box, Image, Text } from '@chakra-ui/react';

function ProductCard({ product }) {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Image src={product.image} alt={product.name} />
      <Box p="6">
        <Text fontWeight="semibold">{product.name}</Text>
        <Text>{product.category}</Text>
        <Text>${product.price}</Text>
        <Text>{product.rating} ⭐</Text>
        <Text>{product.discount}% off</Text>
      </Box>
    </Box>
  );
}

export default ProductCard;
