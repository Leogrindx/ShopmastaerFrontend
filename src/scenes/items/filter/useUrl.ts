import ItemService from "../../../service/ItemService";
import { useEffect, useState } from "react";
import {
  useParams,
  useNavigate,
  useSearchParams,
  useLocation,
} from "react-router-dom";
import { itemsType } from "../../../config/ItemsType";
export const useUrl = () => {
  // Filter - get and processed SearchData

  const location = useLocation();
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
  const [page, setPage] = useSearchParams({ page: "1" });

  useEffect(() => {
    setPrice(search.getAll("price"));
    setMin(search.getAll("price")[0]);
    setMax(search.getAll("price")[1]);
    setColor(search.getAll("color"));
    setBrand(search.getAll("brand"));
    setMaterial(search.getAll("material"));
    setFashion(search.getAll("fashion"));
    setCutting(search.getAll("cutting"));
  }, [location.search]);

  const send = (title: string, state: string[]) => {
    setSearch({
      color: search.getAll("color"),
      brand: search.getAll("brand"),
      material: search.getAll("material"),
      fashion: search.getAll("fashion"),
      cutting: search.getAll("cutting"),
      page: search.getAll("page"),
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

  // GET reqest ItemsData throw ReactQuery

  const pageParam = search.get("page") || "";
  const routeItemsQuery = () => ({
    queryKey: [gender, type, undertype, location.search, pageParam],
    queryFn: async () =>
      location.search
        ? ItemService.filter(
            gender || "",
            type || "",
            undertype,
            location.search,
            pageParam
          )
        : ItemService.route(gender || "", type || "", undertype, pageParam),
  });

  // Undertype middlewear

  const middlewearUnderType = () => {
    const itemsTypeAny: any = itemsType;
    const undertypes = itemsTypeAny[gender || ""][type || ""].data;
    for (const under of undertypes) {
      if (undertype === under) {
        return true;
      }
    }
    return false;
  };

  return {
    middlewearUnderType,
    routeItemsQuery,
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
    page,
    setPage,
    send,
    clearDataFilter,
  };
};
