import { useQuery } from "@tanstack/react-query";
import { ItemResponse } from "../../../models/ItemResponse";
import { useUrl } from "../filter/useUrl";
export const useRender = () => {
  const { routeItemsQuery, send, page } = useUrl();
  const scrollPages = (state: string) => {
    const pageNum = Number(page.get("page"));
    if (state === "prev") {
      if (pageNum > 1) {
        send("page", [`${pageNum - 1}`]);
      }
    }
    if (state === "next") {
      send("page", [`${pageNum + 1}`]);
    }
  };

  const disbledNext = () => {
    return;
  };

  const { data, isLoading, error } = useQuery(routeItemsQuery());
  const items = data?.data as ItemResponse[];
  // console.log("renderRender");
  return { isLoading, error, items, scrollPages, page, disbledNext };
};
