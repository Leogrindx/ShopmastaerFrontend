import ItemService from "../../../service/ItemService";
import { useParams, useSearchParams, useLocation } from "react-router-dom";
import { searchParams } from "../../../config/searchParams";
import { itemsType } from "../../../config/ItemsType";
export const useUrl = () => {
  const [seacrhParam, setSearchParam] = useSearchParams();
  const { gender, type, undertype } = useParams();
  const location = useLocation();
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

  const GetSearchParams = () => {
    const state = [];
    for (const param of searchParams) {
      const data = seacrhParam.getAll(param);
      if (seacrhParam.getAll(param).length > 0) {
        state.push({ [param]: data });
      }
    }
    return state;
  };

  const pageParam = seacrhParam.get("page") || "";

  const routeItemsQuery = () => ({
    queryKey: [gender, type, undertype, GetSearchParams, pageParam],
    queryFn: async () =>
      GetSearchParams.length > 0
        ? ItemService.filter(
            gender || "",
            type || "",
            undertype,
            location.search,
            pageParam
          )
        : ItemService.route(gender || "", type || "", undertype, pageParam),
  });

  const submitFilter = (filterType: string, state: string[]) => {
    setSearchParam({ [filterType]: state });
  };
  const submitPage = (page: number) => {
    setSearchParam({ page: "page" });
  };

  return {
    middlewearUnderType,
    routeItemsQuery,
    GetSearchParams,
    submitFilter,
    submitPage,
  };
};
