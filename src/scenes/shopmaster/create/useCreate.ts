import { FormEvent, useState, useRef } from "react";
import { itemsType } from "../../../config/ItemsType";
import { sizes } from "../../../config/sizes";
import axios from "axios";
import Swal from "sweetalert2";
interface size {
  type: string;
  data: string[];
}

interface dataForm {
  ean: string;
  brand: string;
  name: string;
  type: string;
  under_type: string;
  size: string[];
  material: string;
  price: number;
  cent: null;
  gender: string;
  color: string;
  fasion: string;
  cutting: string;
  img: string[];
}
const useCreate = () => {
  const [underType, setUnderType] = useState<string[]>([]);
  const gender = useRef("woman");
  const type = useRef("cloth");
  const [size, setSize] = useState<string[]>([]);
  const [dataSize, setDataSize] = useState<string[]>();

  const [img, setImg] = useState();

  const sortUnderType = () => {
    itemsType.forEach((e) => {
      if (e.gender === gender.current && e.type === type.current) {
        setUnderType(e.data);
      }
    });
  };
  const sortSizes = () => {
    const result: size[] = sizes.filter((e) => e.type === type.current);
    setSize(result[0].data);
  };

  const changeData = (e: any) => {
    const options = e.target.options;
    let value = [];
    for (let option of options) {
      if (option.selected) {
        value.push(option.value);
      }
    }
    setDataSize(value);
  };

  const send = (e: dataForm) => {
    const form: any = document.getElementById("createForm");
    axios
      .post("https://shopmaster.onrender.com/api/item", e)
      .finally(() => {
        Swal.fire({ icon: "success", title: "success" });
        form.reset();
      })
      .catch((err) => {
        Swal.fire({ icon: "error", title: "error" });
        console.log(err);
      });
  };

  return {
    underType,
    sortUnderType,
    gender,
    type,
    sortSizes,
    size,
    dataSize,
    changeData,
    send,
  };
};

export default useCreate;
