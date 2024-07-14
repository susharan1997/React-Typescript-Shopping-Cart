//default dependencies
import { useState } from "react";
import { useQuery } from "react-query";
import Drawer from "@mui/material/Drawer";
import Grid from "@mui/material/Grid";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Badge from "@mui/material/Badge";
import LinearProgress from "@mui/material/LinearProgress";

//components
import Cart from "./Components/Cart/Cart";
import Item from "./Components/Item/Item";

//styles
import "./styles.css";
import { Wrapper, StyledButton } from "./App.styles";

export type cartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

const getProducts = async (): Promise<cartItemType[]> =>
  await (await fetch("https://fakestoreapi.com/products")).json();

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as cartItemType[]);
  const { data, isLoading, error } = useQuery<cartItemType[]>(
    "products",
    getProducts
  );

  const handleAddToCart = (clickedItem: cartItemType) => {
    setCartItems((prev) => {
      const isItemInCart = prev.find((item) => item.id === clickedItem.id);

      if (isItemInCart) {
        return prev.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      // First time the item is added
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems((prev) =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as cartItemType[])
    );
  };

  const getTotalItems = (items: cartItemType[]) =>
    items.reduce((acc: number, item) => acc + item.amount, 0);

  if (isLoading) return <LinearProgress />;
  if (error) return <div>Something went wrong!</div>;

  return (
    <Wrapper className="App">
      <Drawer open={cartOpen} onClose={() => setCartOpen(false)} anchor="right">
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
        />
      </Drawer>
      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color="error">
          <AddShoppingCartIcon />
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>
        {data?.map((item) => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
}
