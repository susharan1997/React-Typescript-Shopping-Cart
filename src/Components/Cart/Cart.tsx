import { Wrapper } from "./Cart.styles";
import { cartItemType } from "../../App";
import CartItem from "../CartItem/cartItem";

type Props = {
  cartItems: cartItemType[];
  addToCart: (clickedItem: cartItemType) => void;
  removeFromCart: (id: number) => void;
};

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart }) => {
  const calTotal = (items: cartItemType[]) =>
    items.reduce((acc: number, item) => acc + item.amount * item.price, 0);

  return (
    <Wrapper>
      <h2> Shopping Cart </h2>
      {cartItems.length === 0 ? <p> No Items in Cart </p> : null}
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}
      <h2>Total: ${calTotal(cartItems).toFixed(2)}</h2>
    </Wrapper>
  );
};

export default Cart;
