import { useState, useContext } from "react";
import s from "./filter.module.scss";
import r from "./filterResponsive.module.scss";
import Price from "./price/Price";
import Color from "./color/Color";
import TextFilter from "./text/TextFilter";
import { Context } from "../items";
import { brands } from "../../../config/brand";
import { materials } from "../../../config/materials";
import { fashions } from "../../../config/fashions";
import { cuttings } from "../../../config/cutting";
import { useResponsive } from "../../../Hooks/useResponsive";
import { useUrl } from "./useUrl";
import classNames from "classnames";

const Filter = () => {
  const [tougle, setTougle] = useState<string>("");
  const [closeOpen, setCloseOpen] = useState<boolean>(false);

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
          <Color title={"color"} tougle={tougle} setTougle={setTougle} />
          <TextFilter
            title={"brand"}
            value={brands}
            searchWindow={true}
            tougle={tougle}
            setTougle={setTougle}
          />
          <TextFilter
            title={"material"}
            value={materials}
            tougle={tougle}
            setTougle={setTougle}
          />
          <TextFilter
            title={"fashion"}
            value={fashions}
            tougle={tougle}
            setTougle={setTougle}
          />
          <TextFilter
            title={"cutting"}
            value={cuttings}
            tougle={tougle}
            setTougle={setTougle}
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
