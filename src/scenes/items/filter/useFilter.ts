import { useEffect, useState } from "react";
import {
  useParams,
  useNavigate,
  useSearchParams,
  useLocation,
} from "react-router-dom";
export interface FiltersDate {
  title: string;
  value: string[];
  searchWindow?: boolean;
  tougle: string;
  setTougle: (tougle: string) => void;
  state: string[];
  setState: (state: string[]) => void;
}

export const useFilter = () => {
  // Filter type [{color: ["red"]}]
  const { gender, type, undertype } = useParams();
  const navigate = useNavigate();
  const [search, setSearch] = useSearchParams();
  const [min, setMin] = useState(
    search.getAll("price").length > 0 ? search.getAll("price")[0] : 0
  );
  const [max, setMax] = useState(
    search.getAll("price").length > 0 ? search.getAll("price")[1] : 10000
  );
  const [price, setPrice] = useState(search.getAll("price"));
  const [color, setColor] = useState(search.getAll("color"));
  const [brand, setBrand] = useState(search.getAll("brand"));
  const [material, setMaterial] = useState(search.getAll("material"));
  const [fashion, setFashion] = useState(search.getAll("fashion"));
  const [cutting, setCutting] = useState(search.getAll("cutting"));
  const location = useLocation();

  useEffect(() => {
    console.log("Price Work");
    setPrice(search.getAll("price"));
    setMin(search.getAll("price")[0]);
    setMax(search.getAll("price")[1]);
    setColor(search.getAll("color"));
    setBrand(search.getAll("brand"));
    setMaterial(search.getAll("material"));
    setFashion(search.getAll("fashion"));
    setCutting(search.getAll("cutting"));
  }, [location.search]);

  const addDeleteValue = (
    e: React.ChangeEvent<HTMLInputElement>,
    state: string[],
    setState: (state: string[]) => void
  ) => {
    if (e.target.checked) {
      setState([...state, e.target.value.toLocaleLowerCase()]);
    } else {
      setState(state.filter((f) => f !== e.target.value.toLocaleLowerCase()));
    }
  };
  const send = (title: string, state: string[]) => {
    const filterObject: any = {};
    setSearch({
      color: search.getAll("color"),
      brand: search.getAll("brand"),
      material: search.getAll("material"),
      fashion: search.getAll("fashion"),
      cutting: search.getAll("cutting"),
      [title]: state,
    });
  };

  const clearDataFilter = (
    setState: (state: string[]) => void,
    price?: boolean
  ) => {
    if (price) {
    }
    setState([]);
    navigate(`/${gender}/${type}/${undertype ? undertype : ""}`);
  };

  interface FiltersDate {
    title: string;
    value: string[];
    searchWindow?: boolean;
    tougle: string;
    setTougle: (tougle: string) => void;
    state: string[];
    setState: (state: string[]) => void;
  }

  return {
    addDeleteValue,
    search,
    price,
    min,
    max,
    color,
    brand,
    material,
    fashion,
    cutting,
    setMin,
    setMax,
    setColor,
    setBrand,
    setMaterial,
    setFashion,
    setCutting,
    send,
    clearDataFilter,
  };
};
