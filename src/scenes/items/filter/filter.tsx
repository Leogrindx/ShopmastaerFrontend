import { useEffect, useState } from "react";
import s from "./filter.module.scss";
import r from "./filterResponsive.module.scss";
import Price from "./price/Price";
import Color from "./color/Color";
import TextFilter from "./text/TextFilter";
import { brands } from "../../../config/brand";
import { materials } from "../../../config/materials";
import { fashions } from "../../../config/fashions";
import { cuttings } from "../../../config/cutting";
import { useResponsive } from "../../../Hooks/useResponsive";
import classNames from "classnames";
import { useUrl } from "./useUrl";

const Filter = () => {
  const [tougle, setTougle] = useState<string>("");
  const [closeOpen, setCloseOpen] = useState<boolean>(false);
  useEffect(() => {
    document.body.style.overflow = closeOpen ? "hidden" : "auto";
  }, [closeOpen]);
  const {
    color,
    brand,
    material,
    fashion,
    cutting,
    setColor,
    setBrand,
    setMaterial,
    setFashion,
    setCutting,
  } = useUrl();
  const { respon } = useResponsive();
  return (
    <>
      {respon && (
        <button
          className={classNames(s.button, r.ResponFilterButton)}
          onClick={() => setCloseOpen(true)}
        >
          filter
        </button>
      )}
      <div
        className={respon ? r.ResponFilterIcon : s.allFilter}
        style={
          respon
            ? closeOpen
              ? {}
              : { transform: "translate(0%, -110%" }
            : { transform: "translate(0%, 0%" }
        }
      >
        <div>
          <Price title={"price"} tougle={tougle} setTougle={setTougle} />
          <Color
            title={"color"}
            tougle={tougle}
            setTougle={setTougle}
            state={color}
            setState={setColor}
          />
          <TextFilter
            title={"brand"}
            value={brands}
            searchWindow={true}
            tougle={tougle}
            setTougle={setTougle}
            state={brand}
            setState={setBrand}
          />
          <TextFilter
            title={"material"}
            value={materials}
            tougle={tougle}
            setTougle={setTougle}
            state={material}
            setState={setMaterial}
          />
          <TextFilter
            title={"fashion"}
            value={fashions}
            tougle={tougle}
            setTougle={setTougle}
            state={fashion}
            setState={setFashion}
          />
          <TextFilter
            title={"cutting"}
            value={cuttings}
            tougle={tougle}
            setTougle={setTougle}
            state={cutting}
            setState={setCutting}
          />
        </div>
        {respon && (
          <div className={r.ResponseCloseFilter}>
            <button className={s.button} onClick={() => setCloseOpen(false)}>
              close
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Filter;
