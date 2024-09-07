import { FC, useEffect, useRef, useState } from "react";
import s from "./color.module.scss";
import g from "../filter.module.scss";
import r from "../filterResponsive.module.scss";
import ac from "../ArrrowClose.module.scss";

import classNames from "classnames";
import { colors } from "../../../../config/colors";
import BussinesLogic from "../bisnesFilters";
import { useResponsive } from "../../../../Hooks/useResponsive";
import { useUrl } from "../useUrl";
import { useFilter } from "../useFilter";
import { useSearchParams } from "react-router-dom";
const Color: FC<{
  title: string;
  tougle: string;
  setTougle: (tougle: string) => void;
}> = (props) => {
  const { GetSearchParams, submitFilter } = useUrl();
  const { generateDataFilter, clearDataFilter } = useFilter();
  const { respon } = useResponsive();
  const [search, setSearch] = useSearchParams();
  const [state, setSate] = useState(search.getAll("color"));
  const colorRef = useRef<string[]>();
  const addValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSate([...state, e.target.value]);
    } else {
      setSate(state.filter((f) => f !== e.target.value));
    }
  };
  window.addEventListener("popstate", (event) => {});
  onpopstate = (event) => {
    setSate(search.getAll("color"));
  };
  return (
    <div className={g.filterType}>
      <div
        className={respon ? r.showHidePanel : g.showHidePanel}
        onClick={(e) =>
          BussinesLogic.showHide(
            props.title,
            g.arrow,
            g.hideArrow,
            g.hideEffect,
            g.hidePanel,
            g.showPanel,
            g.showArrow
          )
        }
      >
        {respon ? (
          <div className={r.showHideButton}>
            <p>{props.title}</p>
            <p onClick={() => clearDataFilter(props.title)}>
              {state.length > 0 && state.length}
            </p>
            <div className={classNames(g.arrow, g.hideArrow)} id="colorArrow">
              <div className={ac.cross}>
                <div className={classNames(ac.partition, ac.upArrow)}></div>
                <div className={classNames(ac.partition, ac.downArrow)}></div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <p>{props.title}</p>
            <p onClick={() => clearDataFilter(props.title)}>
              {state.length > 0 && state.length}
            </p>
            <div className={classNames(g.arrow, g.hideArrow)} id="colorArrow">
              <div className={ac.cross}>
                <div className={classNames(ac.partition, ac.upArrow)}></div>
                <div className={classNames(ac.partition, ac.downArrow)}></div>
              </div>
            </div>
          </>
        )}
      </div>
      <div id="color" className={classNames(g.hideEffect, g.hidePanel)}>
        <div className={respon ? r.filterContent : ""}>
          <div className={g.scroll}>
            {colors.map((val, i) => (
              <div className={r.checkBlock} key={i}>
                <input
                  id={val}
                  className={classNames(g.checkbox_input, props.title)}
                  onChange={(e) => addValue(e)}
                  type="checkbox"
                  name="color"
                  value={val}
                  checked={BussinesLogic.checked(val, state)}
                />
                <label
                  className={classNames(g.checkbox_label, g.color)}
                  htmlFor={val}
                >
                  <div className={s.content}>
                    <div
                      className={s.box}
                      style={{ backgroundColor: val }}
                    ></div>
                    <p className={s.text}>{val}</p>
                  </div>
                </label>
              </div>
            ))}
            <div className={g.checkBlock}>
              <input
                id="colored"
                className={classNames(g.checkbox_input, props.title)}
                onChange={(e) => generateDataFilter(e, props.title)}
                type="checkbox"
                name="color"
                value="colored"
                checked={BussinesLogic.checked("colored", state)}
              />
              <label className={g.checkbox_label} htmlFor="colored">
                <div className={s.content}>
                  <div className={s.colorfb}>
                    <div className={classNames(s.colorf, s.y)}></div>
                    <div className={classNames(s.colorf, s.g)}></div>
                    <div className={classNames(s.colorf, s.p)}></div>
                    <div className={classNames(s.colorf, s.b)}></div>
                  </div>
                  <p className={s.text}>colored</p>
                </div>
              </label>
            </div>
          </div>
          <div className={g.buttons}>
            <button
              className={g.button}
              onClick={(e) => {
                respon &&
                  BussinesLogic.showHide(
                    props.title,
                    g.arrow,
                    g.hideArrow,
                    g.hideEffect,
                    g.hidePanel,
                    g.showPanel,
                    g.showArrow
                  );
                !respon && clearDataFilter(props.title);
              }}
            >
              {respon ? "back" : "clear"}
            </button>
            <button
              className={g.button}
              onClick={(e) => {
                setSearch({ color: state });
              }}
            >
              submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Color;
