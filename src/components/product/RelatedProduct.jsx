import React, { useContext, useState } from "react";
import { useEffect } from "react";
import AppContext from "../../context/AppContext";
import { Link } from "react-router-dom";

const RelatedProduct = ({ category }) => {
  const { products } = useContext(AppContext);
  const [realtedProduct, setRealtedProduct] = useState([]);
  useEffect(() => {
    setRealtedProduct(
      products.filter(
        (data) => data?.category?.toLowerCase() == category?.toLowerCase()
      )
    );
  }, [category, products]);
  return (
   <>
   <div>
    <h1 className="text-center">Related Product</h1>
    <div className="flex justify-center"> 
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {realtedProduct?.map((product) => (
          <div key={product._id} className="bg-white border border-gray-300 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
            <Link  to={`/product/${product._id}`}>
              <img className="p-4 rounded-t-lg h-52 w-full object-contain" src={product.imgSrc} alt="product image" />
              </Link>
            <div className="px-5 pb-5">
              <a href="#">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900">{product.title}</h5>
              </a>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-gray-900">${product.price}</span>
                <a
                  href="#"
                  className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-4 transition duration-300 ease-in-out"
                >
                  Add to cart
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
   </div>
   </>
  )
}

export default RelatedProduct