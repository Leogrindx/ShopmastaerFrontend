import ItemService from "../service/ItemService";

export const all = async () => {
  try {
    const res = await ItemService.all();
    return res.data;
  } catch (e) {}
};

export const getOne = async (ean: string) => {
  try {
    const res = await ItemService.getOne(ean);
    return res.data;
  } catch (e) {}
};
