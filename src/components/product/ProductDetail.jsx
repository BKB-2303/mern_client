import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import RelatedProduct from "./RelatedProduct";
const ProductDetail = () => {
  const [product, setProduct] = useState();
  const { id } = useParams();
  const url = "http://localhost:1000/api";

  useEffect(() => {
    const fetchProduct = async () => {
      const api = await axios.get(`${url}/product/${id}`, {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      });
      // console.log(api.data.product);
    setProduct(api.data.product)
      //   setProducts(api.data.products);
    };
    fetchProduct();
  }, [id]);
  return (
    <>
    
    <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-md md:flex-row md:max-w-3xl lg:max-w-4xl hover:bg-gray-100 transition duration-300 ease-in-out mx-auto">
  <img
    className="object-cover w-full rounded-t-lg h-auto sm:h-64 md:h-auto md:w-64 lg:w-80 md:rounded-none md:rounded-l-lg"
    src={product?.imgSrc}
    alt="Product"
  />
  <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-10 leading-normal w-full md:w-auto">
    <h5 className="mb-4 text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-gray-900">
      {product?.title}
    </h5>
    <p className="mb-6 text-sm sm:text-base lg:text-lg font-normal text-gray-700">
      {product?.description}
    </p>
    <h6 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
      ${product?.price}
    </h6>
         
    <div className="flex mt-6 space-x-4">
      <button className="px-6 py-3 text-sm sm:text-base lg:text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition duration-300 ease-in-out">
        Buy Now
      </button>
      <button className="px-6 py-3 text-sm sm:text-base lg:text-lg font-medium text-white bg-green-500 rounded-lg hover:bg-green-600 focus:ring-4 focus:ring-green-300 transition duration-300 ease-in-out">
        Add to Cart
      </button>
    </div>
  </div>
</div>
<RelatedProduct category={product?.category} />
    </>
  )
}

export default ProductDetail