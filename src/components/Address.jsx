import React, { useContext } from "react";
import { useState } from "react";
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Address = () => {
  const { shippingAddress, userAddress } = useContext(AppContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    country: "",
     pincode: "",
    phoneNumber: "",
  });
  const onChangerHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const { fullName, address, city, state, country, pincode, phoneNumber } =
    formData;
  const submitHandler = async (e) => {
    e.preventDefault();
    // alert("Your form has been submited")

    const result = await shippingAddress(
      fullName,
      address,
      city,
      state,
      country,
      pincode,
      phoneNumber
    );

    console.log("address adedd ",result)

    if (result.success) {
      navigate("/checkout");
    }

    setFormData({
      fullName: "",
      address: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      phoneNumber: "",
    });

    // console.log(formData);
  };
  return (
    <>
<div className="container my-8 p-6 max-w-4xl mx-auto border-2 border-yellow-500 rounded-lg bg-gray-800">
  <h1 className="text-center text-3xl font-bold text-white mb-6">Shipping Address</h1>
  <form onSubmit={submitHandler} className="space-y-6">
    <div className="flex flex-wrap -mx-3">
      <div className="mb-6 px-3 w-full md:w-1/3">
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-200">Full Name</label>
        <input
          name="fullName"
          value={formData.fullName}
          onChange={onChangerHandler}
          type="text"
          className="block w-full mt-1 rounded-md bg-gray-700 text-white border-gray-600 focus:border-indigo-500 focus:ring-indigo-500"
          id="fullName"
        />
      </div>
      <div className="mb-6 px-3 w-full md:w-1/3">
        <label htmlFor="country" className="block text-sm font-medium text-gray-200">Country</label>
        <input
          name="country"
          value={formData.country}
          onChange={onChangerHandler}
          type="text"
          className="block w-full mt-1 rounded-md bg-gray-700 text-white border-gray-600 focus:border-indigo-500 focus:ring-indigo-500"
          id="country"
        />
      </div>
      <div className="mb-6 px-3 w-full md:w-1/3">
        <label htmlFor="state" className="block text-sm font-medium text-gray-200">State</label>
        <input
          name="state"
          value={formData.state}
          onChange={onChangerHandler}
          type="text"
          className="block w-full mt-1 rounded-md bg-gray-700 text-white border-gray-600 focus:border-indigo-500 focus:ring-indigo-500"
          id="state"
        />
      </div>
    </div>

    <div className="flex flex-wrap -mx-3">
      <div className="mb-6 px-3 w-full md:w-1/3">
        <label htmlFor="city" className="block text-sm font-medium text-gray-200">City</label>
        <input
          name="city"
          value={formData.city}
          onChange={onChangerHandler}
          type="text"
          className="block w-full mt-1 rounded-md bg-gray-700 text-white border-gray-600 focus:border-indigo-500 focus:ring-indigo-500"
          id="city"
        />
      </div>
      <div className="mb-6 px-3 w-full md:w-1/3">
        <label htmlFor="pincode" className="block text-sm font-medium text-gray-200">Pincode</label>
        <input
          name="pincode"
          value={formData.pincode}
          onChange={onChangerHandler}
          type="number"
          className="block w-full mt-1 rounded-md bg-gray-700 text-white border-gray-600 focus:border-indigo-500 focus:ring-indigo-500"
          id="pincode"
        />
      </div>
      <div className="mb-6 px-3 w-full md:w-1/3">
        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-200">Phone Number</label>
        <input
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={onChangerHandler}
          type="number"
          className="block w-full mt-1 rounded-md bg-gray-700 text-white border-gray-600 focus:border-indigo-500 focus:ring-indigo-500"
          id="phoneNumber"
        />
      </div>
    </div>

    <div className="mb-6">
      <label htmlFor="address" className="block text-sm font-medium text-gray-200">Address/Nearby</label>
      <textarea
        name="address"
        value={formData.address}
        onChange={onChangerHandler}
        className="block w-full mt-1 rounded-md bg-gray-700 text-white border-gray-600 focus:border-indigo-500 focus:ring-indigo-500"
        id="address"
        rows="4"
      />
    </div>

    <div className="flex justify-center my-3">
      <button
        type="submit"
        className="bg-blue-500 text-white font-bold px-6 py-3 rounded-lg hover:bg-blue-600 transition"
      >
        Submit
      </button>
    </div>
  </form>

  {userAddress && (
    <div className="flex justify-center my-3">
      <button
        className="bg-yellow-500 text-white font-bold px-6 py-3 rounded-lg hover:bg-yellow-600 transition"
        onClick={() => navigate('/checkout')}
      >
        Use Old Address
      </button>
    </div>
  )}
</div>


    </>
  )
}

export default Address