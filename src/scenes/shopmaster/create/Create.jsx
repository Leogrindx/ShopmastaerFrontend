import { useState, useEffect } from "react";
import s from "./create.module.scss";
import { brands } from "../../../config/brand";
import { materials } from "../../../config/materials";
import { colors } from "../../../config/colors";
import { fashions } from "../../../config/fashions";
import { cuttings } from "../../../config/cutting";
import useCreate from "./useCreate";
const Create = () => {
  const {
    underType,
    sortUnderType,
    setSize,
    gender,
    type,
    sortSizes,
    size,
    dataSize,
    changeData,
    send,
  } = useCreate();
  const submit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const img = formData.getAll("img");
    const data = Object.fromEntries(formData);
    const parseImg = img[0].split(",");
    console.log(img);
    data.img = parseImg;
    data.size = dataSize;
    data.cent = null;
    send(data);
  };
  useEffect(() => {
    sortUnderType();
    sortSizes();
  }, []);
  return (
    <div className={s.create}>
      <form className={s.form} onSubmit={submit} id="createForm">
        <input name="ean" type="text" placeholder="ean" />
        <input name="name" type="text" placeholder="name" />
        <input name="price" type="number" placeholder="price" />
        <select name="brand" className={s.brands}>
          {brands.map((e, i) => (
            <option className={s.brand} value={e} key={i}>
              {e}
            </option>
          ))}
        </select>
        <select
          onChange={(e) => {
            gender.current = e.target.value;
            sortUnderType();
          }}
          name="gender"
          className={s.gender}
        >
          <option value="woman">Woman</option>
          <option value="man">Man</option>
        </select>
        <select
          name="type"
          onChange={(e) => {
            type.current = e.target.value;
            sortUnderType();
            sortSizes();
          }}
        >
          <option value="cloth">Cloth</option>
          <option value="shoes">Shoes</option>
        </select>
        <select name="under_type">
          {underType.map((e, i) => (
            <option value={e} key={i}>
              {e}
            </option>
          ))}
        </select>
        <select name="size" multiple onChange={changeData}>
          {size.map((e, i) => (
            <option value={e} key={i}>
              {e}
            </option>
          ))}
        </select>
        <select name="material">
          {materials.map((e, i) => (
            <option value={e} key={i}>
              {e}
            </option>
          ))}
        </select>
        <select name="color">
          {colors.map((e, i) => (
            <option value={e} key={i}>
              {e}
            </option>
          ))}
          <option value="colored">colored</option>
        </select>
        <select name="fasion">
          {fashions.map((e, i) => (
            <option value={e} key={i}>
              {e}
            </option>
          ))}
        </select>
        <select name="cutting">
          {cuttings.map((e, i) => (
            <option value={e} key={i}>
              {e}
            </option>
          ))}
        </select>
        <textarea name="img" id=""></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Create;
