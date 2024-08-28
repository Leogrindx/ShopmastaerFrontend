import ItemService from "../service/ItemService";

export const all = async () => {
  try {
    const res = await ItemService.all();
    return res.data;
  } catch (e) {}
};

export const routeItemsQuery = (
  gender: string,
  type: string,
  underType?: string,
  filter?: string
) => ({
  queryKey: [gender, type, underType, filter],
  queryFn: async () =>
    filter
      ? ItemService.filter(gender, type, underType, filter)
      : ItemService.route(gender, type, underType),
});

export const getOne = async (ean: string) => {
  try {
    const res = await ItemService.getOne(ean);
    return res.data;
  } catch (e) {}
};
