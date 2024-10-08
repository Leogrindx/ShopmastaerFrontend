import { useSearchParams, useLocation, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ItemResponse } from "../../../models/ItemResponse";
import { useUrl } from "../filter/useUrl";
export const useRender = () => {
  const { routeItemsQuery } = useUrl();
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
  const { data, isLoading, error } = useQuery(routeItemsQuery());
  const items = data?.data as ItemResponse[];
  // console.log("renderRender");
  return { isLoading, error, items, scrollPages, page };
};
