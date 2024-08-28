import { useSearchParams, useLocation, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ItemResponse } from "../../../models/ItemResponse";
import { useUrl } from "../filter/useUrl";
export const useRender = () => {
  const { routeItemsQuery } = useUrl();
  const [search, setSearch] = useSearchParams();
  const { gender, type, undertype } = useParams();
  const location = useLocation();
  const [page, setPage] = useSearchParams({ page: "1" });
  const scrollPages = (state: string) => {
    const pageNum = Number(page.get("page"));
    if (state === "prev") {
      if (pageNum > 1) {
        setPage({ page: `${pageNum - 1}` });
      }
    }
    if (state === "next") {
      setPage({ page: `${pageNum + 1}` });
    }
  };
  const { data, isLoading } = useQuery(routeItemsQuery());
  const items = data?.data as ItemResponse[];
  return { isLoading, items, scrollPages, page };
};
