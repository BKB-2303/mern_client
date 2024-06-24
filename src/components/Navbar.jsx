import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AppContext from "../context/AppContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(" ");
  const navigate = useNavigate();
  const location = useLocation();

  const { setFilteredData, products, logout, isAuthenticated, cart } =
    useContext(AppContext);
  const [selectedRange, setSelectedRange] = useState("");

  const priceRanges = [
    { label: "All Prices", value: "" },
    { label: "₹0 - ₹2000", value: "0-2000" },
    { label: "₹2000 - ₹10000", value: "2000-10000" },
    { label: "₹10000 - ₹40000", value: "10000-40000" },
    { label: "₹40000 - 1lakh", value: "40000-100000" },
    { label: "₹1lakh+", value: "100000-1200000" },
  ];

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  const filterbyCategory = (cat) => {
    setFilteredData(
      products.filter(
        (data) => data.category.toLowerCase() == cat.toLowerCase()
      )
    );
  };
  const filterByPrice = (price) => {
    if (price === "") {
      setFilteredData(products);
    } else {
      const [min, max] = price.split("-").map(Number);
      setFilteredData(
        products.filter((product) =>
          max
            ? product.price >= min && product.price <= max
            : product.price >= min
        )
      );
    }
  };

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedRange(selectedValue);
    filterByPrice(selectedValue);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/product/search/₹{searchTerm}`);
    setSearchTerm(" ");
  };
  return (
    <>
      <nav className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 xl:px-8">
          <div className="flex justify-between py-6 items-center">
            <div className="flex items-center space-x-4">
              <Link to={"/"} className="text-3xl font-bold font-heading">
                Logo Here
              </Link>

              {/* Another icon */}
              {/* <a href="#" className="flex items-center hover:text-gray-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="flex absolute -mt-5 ml-4">
                  <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
                </span>
              </a> */}
              {isAuthenticated && (
                 <Link
                 to={"/cart"}
      type="button"
      className="relative inline-flex items-center p-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
      <span className="sr-only">Cart</span>
      {cart?.items?.length > 0 && (
      <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900"> {cart?.items?.length}</div>
    )}
      </Link>
              )}
            </div>
            {/* Mobile menu button */}
            <div className="xl:hidden">
              <button
                onClick={toggleNavbar}
                className="text-white focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>

            {/* Desktop menu items */}
            <div className="hidden xl:flex xl:space-x-6">
              <a href="#" className="hover:text-gray-200">
                Home
              </a>
              
              {!isAuthenticated && (
                <>
              <Link to={"/login"} className="hover:text-gray-200">
                login
              </Link>
              <Link to={"/register"} className="hover:text-gray-200">
                Register
              </Link>
             
              </>
               )}
               {isAuthenticated && (
                <>
              <button
                className="hover:text-gray-200"
                onClick={() => {
                  logout();
                  navigate("/");
                }}
              >
                logOut
              </button>
               <Link to={"/profile"} className="hover:text-gray-200">
               Profile
             </Link>
             </>
 )}
             
            </div>
          </div>

          {/* Responsive menu */}
          {isOpen && (
            <div className="xl:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-900">
                <a
                  href="#"
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-gray-200"
                >
                  Home
                </a>
                
                {isAuthenticated && (
                  <>
                <button
                  
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-gray-200"
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                >
                  logOut
                </button>
                <Link
                to={"/profile"}
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-gray-200"
              >
                Profile
              </Link>
              </>
                )}
                 {!isAuthenticated && (
                <>
                <Link
                  to={"/login"}
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-gray-200"
                >
                  login
                </Link>
                <Link
                  to={"/register"}
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-gray-200"
                >
                  Register
                </Link>
                </>
                 )}
              </div>
            </div>
          )}
        </div>

        <div></div>
      </nav>

      <form
        className="flex justify-center items-center h-16 bg-gray-100"
        onSubmit={submitHandler}
      >
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
            className="px-4 py-2 w-64 sm:w-96 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 px-4 text-gray-600"
          >
            {/* <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg> */}
          </button>
        </div>
      </form>
      {location.pathname == "/" && (
        <div>
          <div className="mx-auto text-center max-w-screen-lg grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
            <button
              className="bg-blue-500 text-white text-sm py-2 px-4 rounded"
              onClick={() => setFilteredData(products)}
            >
              No Filter
            </button>
            <button
              className="bg-green-500 text-white text-sm py-2 px-4 rounded"
              onClick={() => filterbyCategory("mobiles")}
            >
              Mobiles
            </button>
            <button
              className="bg-red-500 text-white text-sm py-2 px-4 rounded"
              onClick={() => filterbyCategory("laptops")}
            >
              Laptops
            </button>
            <button
              className="bg-yellow-500 text-white text-sm py-2 px-4 rounded"
              onClick={() => filterbyCategory("cameras")}
            >
              Camera
            </button>
            <button
              className="bg-purple-500 text-white text-sm py-2 px-4 rounded"
              onClick={() => filterbyCategory("headphones")}
            >
              Headphones
            </button>
          </div>
          <div className="relative inline-block text-left ml-12">
            <div className="flex justify-center mb-2">
              <span className="text-base font-medium">Filter</span>
            </div>
            <select
              className="block w-full pl-3 pr-10 py-2 text-base leading-6 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm sm:leading-5 transition duration-150 ease-in-out"
              value={selectedRange}
              onChange={handleChange}
            >
              {priceRanges.map((range) => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
