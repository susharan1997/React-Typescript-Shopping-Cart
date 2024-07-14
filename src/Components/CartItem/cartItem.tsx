import Button from "@mui/material/Button";
import React from "react";

import { cartItemType } from "../../App";

import { Wrapper } from "./cartItem.styles";

type Props = {
  item: cartItemType;
  addToCart: (clickedItem: cartItemType) => void;
  removeFromCart: (id: number) => void;
};

const cartItem: React.FC<Props> = ({ item, addToCart, removeFromCart }) => (
  <Wrapper>
    <div>
      <h3>{item.title}</h3>
      <div>
        <h3>Price: ${item.price}</h3>
        <h3>Total: ${(item.amount * item.price).toFixed(2)}</h3>
      </div>
      <div>
        <Button
          size="small"
          disableElevation
          variant="contained"
          onClick={() => removeFromCart(item.id)}
        >
          -
        </Button>
        <Button
          size="small"
          disableElevation
          variant="contained"
          onClick={() => addToCart(item)}
        >
          +
        </Button>
      </div>
    </div>
    <img src={item.image} alt={item.title} />
  </Wrapper>
);

export default cartItem;
