import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import axios from "axios";
import ShowOrderProduct from "./ShowOrderProduct";
import { useNavigate } from "react-router-dom";

const OrderConfirmation = () => {
  const { cart, userAddress, url, user, clearCart } = useContext(AppContext);
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


  return (
    <>
      <div className="container my-4 p-2 max-w-4xl mx-auto border rounded-lg bg-gray-800">
      <h1 className="text-center text-3xl font-bold text-white mb-6">
        Your order has been confirmed,
      </h1>
      <h3 className="text-center text-xl font-semibold text-white">
        It will be delivered soon
      </h3>
    </div>

    <div className="container my-8 p-6 max-w-4xl mx-auto border rounded-lg bg-gray-800">
      <table className="min-w-full border border-primary bg-gray-900">
        <thead className="bg-gray-900">
          <tr>
            <th className="bg-gray-900 text-white text-center py-2">OrderItems</th>
            <th className="bg-gray-900 text-white text-center py-2">OrderDetails & ShippingAddress</th>
          </tr>
        </thead>
        <tbody className="bg-gray-900">
          <tr>
            <td className="bg-gray-900 text-white p-4">
            <ShowOrderProduct cart={cart} />
            </td>
            <td className="bg-gray-900 text-white p-4">
              <ul className="font-bold space-y-1">
                {/* <li>OrderId:</li> */}
                <li>PaymentStatus: COD</li>
                <li>Name: {userAddress?.fullName}</li>
              <li>Phone: {userAddress?.phoneNumber}</li>
              <li>Country: {userAddress?.country}</li>
              <li>State: {userAddress?.state}</li>
              <li>PinCode: {userAddress?.pincode}</li>
              <li>Near By: {userAddress?.address}</li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>


   
    </>
  )
}

export default OrderConfirmation