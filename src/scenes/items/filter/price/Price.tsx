import { useState, useEffect, FC } from "react";
import { useParams, useNavigate } from "react-router-dom";
import s from "./price.module.scss";
import g from "../filter.module.scss";
import r from "../filterResponsive.module.scss";
import ac from "../ArrrowClose.module.scss";
import classNames from "classnames";
import BussinesLogic from "../bisnesFilters";
import { useResponsive } from "../../../../Hooks/useResponsive";

const Price: FC<{
  title: string;
  tougle: string;
  setTougle: (tougle: string) => void;
}> = (props) => {
  const { respon } = useResponsive();
  const [min, setMin] = useState<number>(0);
  const [max, setMax] = useState<number>(10000);
  const { gender, filter } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const data = BussinesLogic.parseUrl(filter!, "price");
    if (data) {
      setMin(Number(data![0]));
      BussinesLogic.stylePrice("L", Number(data![0]), Number(data![1]));
      setMax(Number(data![1]));
      BussinesLogic.stylePrice("R", Number(data![0]), Number(data![1]));
    }
  }, [filter]);

  const submit = () => {
    // const url = min === 0 && max === 10000 ? '' : `price=${min}_${max}`
    const url =
      min === 0 && max === 10000
        ? ""
        : BussinesLogic.generateUrl(filter!, "price", [`${min}`, `${max}`]);
    navigate(`/${gender}/${url}`);
  };

  const clear = () => {
    setMin(0);
    setMax(10000);
    BussinesLogic.stylePrice("L", 0, 10000);
    BussinesLogic.stylePrice("R", 0, 10000);
    const url =
      min === 0 && max === 10000
        ? ""
        : BussinesLogic.generateUrl(filter!, "price", []);
    navigate(`/${gender}/${url}`);
  };

  const left = (value: number) => {
    if (value <= max) {
      setMin(value);
      BussinesLogic.stylePrice("L", value, max);
    }
  };
  const right = (value: number) => {
    if (min <= value) {
      setMax(value);
      BussinesLogic.stylePrice("R", min, value);
    }
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
            <p>{min !== 0 || (max !== 10000 && 1)}</p>
            <div
              className={classNames(g.arrow, g.hideArrow)}
              id={`${props.title}Arrow`}
            >
              <div className={ac.cross}>
                <div className={classNames(ac.partition, ac.upArrow)}></div>
                <div className={classNames(ac.partition, ac.downArrow)}></div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <p>{props.title}</p>
            <p>{min !== 0 || (max !== 10000 && 1)}</p>
            <div
              className={classNames(g.arrow, g.hideArrow)}
              id={`${props.title}Arrow`}
            >
              <div className={ac.cross}>
                <div className={classNames(ac.partition, ac.upArrow)}></div>
                <div className={classNames(ac.partition, ac.downArrow)}></div>
              </div>
            </div>
          </>
        )}
      </div>
      <div id={props.title} className={classNames(g.hideEffect, g.hidePanel)}>
        <div className={respon ? s.filterContent : ""}>
          <div className={s.flex}>
            <div>
              <input
                onChange={(e) => left(Number(e.target.value))}
                type="text"
                className={s.inp}
                value={min}
                size={3}
                placeholder="min"
              />
            </div>
            <div className={s.partition}></div>
            <div>
              <input
                onChange={(e) => right(Number(e.target.value))}
                type="text"
                className={s.inp}
                value={max}
                size={3}
                placeholder="max"
              />
            </div>
            <div className={s.currency}>
              <p>{""}</p>
            </div>
          </div>
          <div className={s.range}>
            <div className={s.middle}>
              <div className={s.m}>
                <input
                  onChange={(e) => left(Number(e.target.value))}
                  type="range"
                  id="input-left"
                  min="0"
                  max="10000"
                  value={min}
                />
                <input
                  onChange={(e) => right(Number(e.target.value))}
                  type="range"
                  id="input-right"
                  min="0"
                  max="10000"
                  value={max}
                />

                <div className={s.slider_filter}>
                  <div className={s.track}></div>
                  <div className={s.range} id="range"></div>
                  <div
                    className={classNames(s.thumb, s.left)}
                    id="thumbL"
                  ></div>
                  <div
                    className={classNames(s.thumb, s.right)}
                    id="thumbR"
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div className={s.buttons}>
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
                !respon && clear();
              }}
            >
              {respon ? "back" : "clear"}
            </button>
            <button className={g.button} onClick={(e) => submit()}>
              submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Price;
