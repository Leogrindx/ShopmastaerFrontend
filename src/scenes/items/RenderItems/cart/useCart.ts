import { useState, useContext, useCallback } from "react";
import { Context } from "../../../../index";
import {
  showMiniCart,
  hideMiniCart,
} from "../../../../components/header/cart/LogicCart";
import { useResponsive } from "../../../../Hooks/useResponsive";
export const useCart = ({
  sizes,
  keyx,
  itemID,
}: {
  sizes: string[];
  keyx: number;
  itemID: number;
}) => {
  const { cart, auth } = useContext(Context);
  const [state, setState] = useState(false);
  const { respon } = useResponsive();
  const toggle = (size?: string) => {
    const doc = document.getElementById(
      `showHideCartOfItems_${keyx}`
    ) as HTMLInputElement;
    state
      ? (doc.style.height = "40px")
      : (doc.style.height = `${sizes.length * 40 + 40}px`);
    if (size) {
      cart.add(auth.user.id, itemID, size);
      if (!respon) {
        showMiniCart();
        hideMiniCart(true);
      }
    }
    setState(!state);
  };
  return { state, toggle };
};
