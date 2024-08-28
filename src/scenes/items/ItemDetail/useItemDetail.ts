import { useState, useEffect, useContext, createContext } from "react";
import { useParams } from "react-router-dom";
import { ItemResponse } from "../../../models/ItemResponse";
import axios from "axios";
import { API_URL } from "../../../http/Htttp";
import { Context } from "../../../index";
import { useResponsive } from "../../../Hooks/useResponsive";
import {
  showMiniCart,
  hideMiniCart,
} from "../../../components/header/cart/LogicCart";
import { useSwiper } from "swiper/react";

export const useItemDetail = () => {
  const { cart, auth } = useContext(Context);
  const { ean } = useParams();
  const [item, setItem] = useState<ItemResponse[]>([]);
  const [sliderState, setSliderState] = useState(1);
  const [zoomState, setZoomState] = useState(false);
  const { respon } = useResponsive();
  const swiper = useSwiper();

  useEffect(() => {
    result();
  }, [ean]);

  const addCart = (itemid: number) => {
    const select = document.getElementById("size_select") as HTMLSelectElement;
    cart.add(auth.user.id, itemid, select.value);
    if (!respon) {
      showMiniCart();
      hideMiniCart(true);
    }
  };

  const result = async () => {
    const res = await axios.get(`${API_URL}/item/${ean}`);
    setItem(res.data);
  };

  const zoomSliderRight = (length: number) => {
    setSliderState(sliderState === length - 1 ? 0 : sliderState + 1);
  };

  const zoomSliderLeft = (length: number) => {
    setSliderState(sliderState === 0 ? length - 1 : sliderState - 1);
  };

  const increase = (e: any) => {
    const image: any = document.getElementById("image");
    const imageCon: any = document.getElementById("imageCon");
    let ofsLeft = imageCon.offsetLeft;
    let ofsTop = imageCon.offsetTop;
    let x = viceVersa((e.pageX - ofsLeft - 250) / 1.5);
    let y = viceVersa((e.pageY - ofsTop - 350) / 1.5);
    if (typeof x !== "undefined" && typeof y !== "undefined") {
      image.setAttribute(
        "style",
        `transform: scale(3, 3) translate(${x}px, ${y}px);`
      );
    }
  };

  const reduction = () => {
    const image: any = document.getElementById("image");
    image.setAttribute("style", `transform: scale(1, 1) translate(0px, 0%);`);
  };

  const viceVersa = (num: number) => {
    if (num > 0) return -num;
    if (num < 0) return Math.abs(num);
  };

  const CloseContext = createContext({
    sliderState,
    setSliderState,
    setZoomState,
  });

  return {
    item,
    sliderState,
    setSliderState,
    increase,
    reduction,
    addCart,
    zoomState,
    setZoomState,
    zoomSliderRight,
    zoomSliderLeft,
    respon,
    CloseContext,
  };
};
