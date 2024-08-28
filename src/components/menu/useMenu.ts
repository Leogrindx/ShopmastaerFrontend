import { useState } from "react";
import { itemsType } from "../../config/ItemsType";

export const useMenu = () => {
  const [underType, setUnderType] = useState<string[]>([]);
  const [width, setWidth] = useState<number>();
  const [height, setHeight] = useState<number>();
  const paramWrap = {
    widthBlock: 200,
    heightBlock: 50,
    sizeColumn: 5,
  };
  const sortUnderType = (gender: string, type: string = "shoes") => {
    itemsType.forEach((e) => {
      if (e.gender === gender && e.type === type) {
        setUnderType(e.data);
        calculateWidth(e.data.length);
      }
    });
  };
  const calculateWidth = (arrayLength: number) => {
    const columns = Math.ceil(arrayLength / paramWrap.sizeColumn);
    const width = columns * paramWrap.widthBlock;
    const height = paramWrap.heightBlock * paramWrap.sizeColumn;
    setWidth(width);
    setHeight(height);
  };

  const correctLink = (link: string) => {
    const result = link.toLocaleLowerCase().replaceAll(" ", "_");
    return result;
  };
  return {
    underType,
    sortUnderType,
    calculateWidth,
    width,
    height,
    correctLink,
  };
};
