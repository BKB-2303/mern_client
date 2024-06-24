import React,{useContext,useEffect,useState} from 'react'
import AppContext from '../context/AppContext';

const TableProduct = ({ cart }) => {
    const {decreaseQty, addToCart, removeFromCart, clearCart } =
      useContext(AppContext);
    const [qty, setQty] = useState(0);
    const [price, setPrice] = useState(0);
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
<table className="min-w-full border bg-gray-800 text-center">
  <thead>
    <tr>
      <th className="bg-gray-800 text-white py-2">Product Img</th>
      <th className="bg-gray-800 text-white py-2">Title</th>
      <th className="bg-gray-800 text-white py-2">Price</th>
      <th className="bg-gray-800 text-white py-2">Qty</th>
      <th className="bg-gray-800 text-white py-2">Qty++</th>
      <th className="bg-gray-800 text-white py-2">Qty--</th>
      <th className="bg-gray-800 text-white py-2">Remove</th>
    </tr>
  </thead>
  <tbody>
    {cart?.items?.map((product) => (
      <tr key={product._id}>
        <td className="bg-gray-800 text-white py-2">
          <img src={product.imgSrc} alt={product.title} className="w-12 h-12" />
        </td>
        <td className="bg-gray-800 text-white py-2">{product.title}</td>
        <td className="bg-gray-800 text-white py-2">{product.price}</td>
        <td className="bg-gray-800 text-white py-2">{product.qty}</td>
        <td className="bg-gray-800 text-white py-2">
          <span
            className="bg-green-400 rounded-3xl p-2 cursor-pointer"
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
            +
          </span>
        </td>
        <td className="bg-gray-800 text-white py-2">
          <span
            className="bg-orange-400 rounded-3xl p-2 cursor-pointer"
            onClick={() => decreaseQty(product?.productId, 1)}
          >
            -
          </span>
        </td>
        <td className="bg-gray-800 text-white py-2">
          <span
            className="bg-red-500 px-4 py-1 rounded-lg cursor-pointer"
            onClick={() => {
              if (confirm("Are you sure, want to remove from cart")) {
                removeFromCart(product?.productId);
              }
            }}
          >
            Delete
          </span>
        </td>
      </tr>
    ))}

    <tr>
      <td className="bg-gray-800 text-white py-2"></td>
      <td className="bg-gray-800 text-white py-2">
        <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
          Total
        </button>
      </td>
      <td className="bg-gray-800 text-white py-2">
        <button className="bg-yellow-500 text-black font-bold py-2 px-4 rounded">
          {price}
        </button>
      </td>
      <td className="bg-gray-800 text-white py-2">
        <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
          {qty}
        </button>
      </td>
      <td className="bg-gray-800 text-white py-2"></td>
      <td className="bg-gray-800 text-white py-2"></td>
      <td className="bg-gray-800 text-white py-2"></td>
    </tr>
  </tbody>
</table>


    </>
  );
};

export default TableProduct