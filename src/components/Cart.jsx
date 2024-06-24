import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const { cart, decreaseQty, addToCart, removeFromCart, clearCart } =
  useContext(AppContext);
const [qty, setQty] = useState(0);
const [price, setPrice] = useState(0);

const navigate = useNavigate();

useEffect(() => {
  let qty = 0;
  let price = 0;
  if (cart?.items) {
    for (let i = 0; i < cart.items?.length; i++) {
      qty += cart.items[i].qty;
      price += cart.items[i].price;
    }
  }
  setPrice(price);
  setQty(qty);
}, [cart]);

// console.log("my cart", cart);
  return (
    <>
{cart?.items?.length == 0 ? (
<>
<div className="text-center my-5">
  <button
    className="bg-yellow-500 text-white font-bold mx-3 px-4 py-2 rounded-lg text-lg hover:bg-yellow-600"
    onClick={() => navigate('/')}
  >
    Continue Shopping...
  </button>
</div>

</>
) : (
    <>
    <div className="my-5 text-center">
  <button className="bg-blue-500 text-white font-bold mx-3 px-4 py-2 rounded-lg hover:bg-blue-600">
    Total Qty: {qty}
  </button>
  <button className="bg-yellow-500 text-white font-bold mx-3 px-4 py-2 rounded-lg hover:bg-yellow-600">
    Total Price: {price}
  </button>
</div>
</>
 )}
{cart?.items?.map((product) => (
  <div
    key={product._id}
    className="container my-2 p-3 border-2 border-gray-300  text-center text-white mx-auto max-w-screen-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
  >
    <div className="flex flex-col md:flex-row justify-around items-center">
      <div className="cart_img mb-4 md:mb-0">
        <img
          src={product.imgSrc}
          alt=""
          className=" object-contain w-32 h-32 rounded-t-lg  rounded-lg"
        />
      </div>
      <div className="cart_des text-gray-900 text-center md:text-left mb-4 md:mb-0">
        <h2 className="text-xl font-semibold">{product.title}</h2>
        <h4 className="text-lg font-medium">${product.price}</h4>
        <h4 className="text-lg">Qty: {product.qty}</h4>
      </div>
      <div className="cart_action flex flex-row items-center">
        <button
          className="btn mb-2 md:mb-0 mx-1 px-3 py-2 bg-yellow-500 text-black font-bold rounded-md hover:bg-yellow-600"
          onClick={() => decreaseQty(product?.productId, 1)}
        >
          Qty--
        </button>
        <button
          className="btn mb-2 md:mb-0 mx-1 px-3 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600"
          onClick={() =>
            addToCart(
              product?.productId,
              product.title,
              product.price / product.qty,
              1,
              product.imgSrc
            )
          }
        >
          Qty++
        </button>
        <button
          className="btn mx-1 px-3 py-2 bg-red-500 text-white font-bold rounded-md hover:bg-red-600"
          onClick={() => {
            if (confirm("Are you sure, want remove from cart")) {
              removeFromCart(product?.productId);
            }
          }}
       >
          Remove
        </button>
      </div>
    </div>
  </div>
))}
   {cart?.items?.length > 0 && (
<div className="container text-center my-3">
  <button
    className="bg-yellow-500 text-white font-bold mx-3 px-4 py-2 rounded-lg hover:bg-yellow-600"
    onClick={() => navigate("/shipping")}
  
  >
    Checkout
  </button>
  <button
    className="bg-red-500 text-white font-bold mx-3 px-4 py-2 rounded-lg hover:bg-red-600"
    onClick={() => {
      if (confirm("Are you sure, want clear cart ...?")) {
        clearCart();
      }
    }}
  >
    Clear Cart
  </button>
</div>
   )}
    </>
  )
}

export default Cart