import $api from "../http/Htttp";
import { AxiosResponse } from "axios";
import { ItemResponse } from "../models/ItemResponse";

export default class ItemService {
  static all(): Promise<AxiosResponse<ItemResponse[]>> {
    return $api.get<ItemResponse[]>(`/items`);
  }

  static getOne(ean: string): Promise<AxiosResponse<ItemResponse>> {
    return $api.get<ItemResponse>(`/item/${ean}`);
  }

  static route(
    gender: string,
    type: string,
    underType?: string,
    page?: string
  ): Promise<AxiosResponse<ItemResponse[]>> {
    if (underType) {
      if (page) {
        return $api.get<ItemResponse[]>(
          `/items/${gender}/${type}/${underType}?page=${page}`
        );
      }
      return $api.get<ItemResponse[]>(`/items/${gender}/${type}/${underType}`);
    }
    if (page) {
      const url = `/items/${gender}/${type}?page=${page}`;
      return $api.get<ItemResponse[]>(url);
    }

    return $api.get<ItemResponse[]>(`/items/${gender}/${type}`);
  }

  static filter(
    gender: string,
    type: string,
    underType?: string,
    filter?: string,
    page?: string
  ): Promise<AxiosResponse<ItemResponse[]>> {
    if (underType) {
      const url = `/items/${gender}/${type}/${underType}${filter}`;
      return $api.get<ItemResponse[]>(url);
    }
    if (page) {
      const url = `/items/${gender}/${type}${filter}`;
      return $api.get<ItemResponse[]>(url);
    }
    const url = `/items/${gender}/${type}${filter}`;
    return $api.get<ItemResponse[]>(url);
  }
}
