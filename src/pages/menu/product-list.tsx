import React, { useEffect, useState } from "react";
import CustomTable from "../../components/global/CustomTable";
import { Box } from "@mui/material";
import { getAllProduct } from "../../api/endpoint";
import SuspenseLoader from "../../components/router/SuspenseLoader";
import { productTableHeader } from "../../utils/constants/constants";

const ProductList = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const response = await getAllProduct();
        let products: any[] = [];
        response.data.products.map((item: any) => {
          products.push({
            prodId: item._id,
            prodName: item.prodName,
            quantity: item.quantity,
            status: item.status ? "available" : "unavailable",
            price: item.price,
          });
          return item;
        });
        setProducts(products);
        console.log("prosucst", response);
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  return (
    <Box pt={2}>
      {loading ? (
        <SuspenseLoader />
      ) : (
        <CustomTable
          columnData={productTableHeader}
          rows={products}
          type="product"
        />
      )}
    </Box>
  );
};

export default ProductList;
