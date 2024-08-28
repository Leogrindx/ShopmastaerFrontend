import { FC, useState, useEffect, memo } from "react";
import g from "../filter.module.scss";
import r from "../filterResponsive.module.scss";
import classNames from "classnames";
import i from "../../../../Index.module.scss";
import ac from "../ArrrowClose.module.scss";
import BussinesLogic, { FiltersDate } from "../bisnesFilters";
import { useResponsive } from "../../../../Hooks/useResponsive";
import { useFilter } from "../useFilter";
import { useUrl } from "../useUrl";

const TextFilter: FC<FiltersDate> = (props) => {
  const { submitFilter } = useUrl();
  const { generateDataFilter, state, clearDataFilter } = useFilter();
  const { respon } = useResponsive();
  const [items, setItems] = useState(props.value);
  const [input, setInput] = useState<string>("");
  const [checkBox, setCheckBox] = useState(false);
  const [position, setPosition] = useState<boolean>(false);
  const search = (e: any) => {
    setInput(e.target.value);
    setItems(
      props.value.filter(
        (i) => i.toLowerCase().search(e.target.value.toLowerCase()) > -1
      )
    );
  };

  return (
    <div className={g.filterType}>
      <div
        className={respon ? r.showHidePanel : g.showHidePanel}
        onClick={(e) => {
          BussinesLogic.showHide(
            props.title,
            g.arrow,
            g.hideArrow,
            g.hideEffect,
            g.hidePanel,
            g.showPanel,
            g.showArrow
          );
          setPosition(!position);
        }}
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
      <div id={props.title} className={classNames(g.hideEffect, g.hidePanel)}>
        <div className={respon ? r.filterContent : ""}>
          {props.searchWindow && (
            <div className={respon ? r.search : g.search}>
              <input
                className={i.input}
                type="text"
                placeholder="Search"
                onChange={(e) => search(e)}
                value={input}
                style={respon ? {} : { width: "120px", marginBottom: "20px" }}
              />
            </div>
          )}
          <div className={g.scroll}>
            {items.map((val, i) => (
              <div className={respon ? r.checkBlock : g.checkBlock} key={i}>
                <input
                  id={val}
                  className={classNames(g.checkbox_input, props.title)}
                  onChange={(e) => {
                    generateDataFilter(e, props.title);
                    setCheckBox(!checkBox);
                  }}
                  type="checkbox"
                  value={val}
                  checked={BussinesLogic.checked(val, state)}
                />
                <label
                  className={classNames(g.checkbox_label, g.color)}
                  htmlFor={val}
                >
                  <div className={g.content}>
                    <div className={g.slider}>
                      <div
                        className={g.text}
                        onMouseEnter={(e) =>
                          !respon &&
                          BussinesLogic.sliderAdd(val, e, g.textHover)
                        }
                        onMouseLeave={(e) =>
                          !respon &&
                          BussinesLogic.sliderRemove(val, e, g.textHover)
                        }
                      >
                        {val}
                      </div>
                    </div>
                  </div>
                </label>
              </div>
            ))}
          </div>
          <div className={g.buttons}>
            <button
              className={g.button}
              onClick={(e) => {
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
              onClick={(e) => submitFilter(props.title, state)}
            >
              submito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(TextFilter);
