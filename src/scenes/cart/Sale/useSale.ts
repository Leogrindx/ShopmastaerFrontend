import { useState, useContext } from "react";
import { Context } from "../../../index";

export const useSale = () => {
  const [content, setContent] = useState(false);
  const [arrow, setArrow] = useState(false);
  const toggle = () => {
    setContent(!content);
    setArrow(!arrow);
  };
  const { cart } = useContext(Context);
  let acum = 0;
  cart.cartItems.forEach((e) => (acum = e.cart.number * e.item.price + acum));
  return { content, arrow, cart, acum, toggle };
};
