import { FC } from "react";
import s from "./color.module.scss";
import g from "../filter.module.scss";
import r from "../filterResponsive.module.scss";
import ac from "../ArrrowClose.module.scss";

import classNames from "classnames";
import { colors } from "../../../../config/colors";
import BussinesLogic from "../bisnesFilters";
import { useResponsive } from "../../../../Hooks/useResponsive";
import { useFilter } from "../useFilter";
const Color: FC<{
  title: string;
  tougle: string;
  setTougle: (tougle: string) => void;
  state: string[];
  setState: (state: string[]) => void;
}> = (props) => {
  const { addDeleteValue, send, search, clearDataFilter } = useFilter();
  const { respon } = useResponsive();

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
            <p onClick={() => clearDataFilter(props.setState)}>
              {props.state.length > 0 && props.state.length}
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
            <p onClick={() => clearDataFilter(props.setState)}>
              {props.state.length > 0 && props.state.length}
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
                  onChange={(e) =>
                    addDeleteValue(e, props.state, props.setState)
                  }
                  type="checkbox"
                  name="color"
                  value={val}
                  checked={BussinesLogic.checked(val, props.state)}
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
                onChange={(e) => addDeleteValue(e, props.state, props.setState)}
                type="checkbox"
                name="color"
                value="colored"
                checked={BussinesLogic.checked("colored", props.state)}
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
                !respon && clearDataFilter(props.setState);
              }}
            >
              {respon ? "back" : "clear"}
            </button>
            <button
              className={g.button}
              onClick={(e) => {
                send(props.title, props.state);
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
