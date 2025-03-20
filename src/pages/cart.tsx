 import { useCart } from '../context/cartcontext';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const handleRemove = (id: number) => {
    removeFromCart(id);
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    updateQuantity(id, quantity);
  };

  return (
    <div className="py-8 px-4">
      <h1 className="text-4xl font-bold text-center mb-8">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between mb-4 p-4 border-b">
              <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover" />
              <div className="flex-grow ml-4">
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <p className="text-lg">{item.price}</p>
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                  className="mt-2 p-2 border border-gray-300 rounded"
                />
              </div>
              <button
                onClick={() => handleRemove(item.id)}
                className="text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;