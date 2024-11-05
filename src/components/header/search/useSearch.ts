import { useEffect, useState } from "react";
import axios from "axios";
import { ItemResponse } from "../../../models/ItemResponse";
import { API_URL } from "../../../http/Htttp";

export const useLogicSearch = () => {
  const [items, setItems] = useState<ItemResponse[]>([]);
  const [value, setValue] = useState<string>("");
  const [load, setLoad] = useState<boolean>(false);
  const [input, setInput] = useState(false);
  useEffect(() => {
    document.body.style.overflow = input ? "hidden" : "auto";
  }, [input]);
  const open = (e: any, className: string, responsive: boolean) => {
    if (responsive) {
      setInput(true);
    } else {
      e.target.classList.add(className);
      document
        .getElementById("close")
        ?.setAttribute(
          "style",
          "visibility: visible; transform: rotate(-90deg); "
        );
      document.getElementById("logo")?.setAttribute("style", "z-index: 0");
    }
  };

  const close = (e: any, className: string, responsive: boolean) => {
    if (responsive) {
      setInput(false);
    } else {
      e.target.setAttribute("style", "visibility: hidden");
      document.getElementById("logo")?.setAttribute("style", "z-index: 1");
      document
        .getElementById("item_search")
        ?.setAttribute("style", "display: none");
      const tag = document.getElementById("search");
      setValue("");
      tag?.classList.remove(className);
    }
  };

  const change = async (e: any) => {
    setValue(e.target.value.toLowerCase());
    if (e.target.value === 0) {
      document
        .getElementById("item_search")
        ?.setAttribute("style", "display: none");
    } else {
      document
        .getElementById("item_search")
        ?.setAttribute("style", "display: flex");
    }
    setLoad(true);
    try {
      if (e.target.value) {
        const res = await axios.get(
          `${API_URL}/search_items/${e.target.value}`
        );
        setItems(res.data);
      } else {
        setItems([]);
      }
    } catch (e) {
      setLoad(false);
    }
    setLoad(false);
  };
  return { items, value, load, input, change, close, open, setInput };
};
