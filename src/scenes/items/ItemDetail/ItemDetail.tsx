import { FC } from "react";
import s from "./ItemDetail.module.scss";
import r from "./ItemDetailResponsive.module.scss";
import classnames from "classnames";
import { useItemDetail } from "./useItemDetail";
import classNames from "classnames";
import Close from "../../../components/closeButton/Close";
import ItemDetailResponsive from "./ItemDetailResponsive";
const Item: FC = () => {
  const {
    item,
    sliderState,
    setSliderState,
    increase,
    reduction,
    addCart,
    zoomState,
    setZoomState,
    zoomSliderRight,
    zoomSliderLeft,
    respon,
  } = useItemDetail();
  return (
    <div className={s.ItemView}>
      {respon ? (
        <ItemDetailResponsive />
      ) : (
        <>
          {item.map((e, i) => (
            <div className={s.top_details} key={i}>
              <div className={s.image_block}>
                <div className={s.slider}>
                  {e.img.map((e, i) => (
                    <img
                      className={s.image_button_slider}
                      src={`${process.env.PUBLIC_URL}${e}`}
                      key={i}
                      onClick={(e) => setSliderState(i)}
                    />
                  ))}
                </div>

                {zoomState ? (
                  <div className={s.zoom}>
                    <div className={s.closeButton}>
                      <Close setState={setZoomState} size={1} />
                    </div>
                    <div className={s.sliderZoom}>
                      <div
                        className={classNames(s.arrow, s.left)}
                        onClick={() => zoomSliderLeft(e.img.length)}
                      >
                        <div className={classNames(s.partition, s.up)}></div>
                        <div className={classNames(s.partition, s.down)}></div>
                      </div>
                      <div>
                        <img
                          id="image"
                          className={s.imgZoom}
                          src={`${process.env.PUBLIC_URL}${e.img[sliderState]}`}
                          alt="image"
                        />
                      </div>
                      <div
                        className={classNames(s.arrow, s.right)}
                        onClick={() => zoomSliderRight(e.img.length)}
                      >
                        <div className={classNames(s.partition, s.up)}></div>
                        <div className={classNames(s.partition, s.down)}></div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    className={s.image}
                    id="imageCon"
                    onMouseMove={increase}
                    onMouseOut={reduction}
                    onClick={() => setZoomState(true)}
                  >
                    <img
                      id="image"
                      src={`${process.env.PUBLIC_URL}${e.img[sliderState]}`}
                      alt=""
                    />
                  </div>
                )}
              </div>
              <div
                className={respon ? r.name_item_details : s.name_item_details}
              >
                <h1 className={s.brand}>{e.brand}</h1>
                <br />
                <h3>{e.name}</h3>
                <br />
                <div className={s.selects}>
                  <div className={s.flex}>
                    <div className={s.size_details}>
                      <p>Size</p>
                      <select
                        className={s.size_select}
                        name="size"
                        id="size_select"
                      >
                        {e.size.map((e, i) => (
                          <option className={s.up} value={e} key={i}>
                            {e}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <h1 className={s.price_details}>{e.price}$</h1>
                </div>
                <br />
                <div className={classnames(s.color_details, s.flex)}>
                  <p>
                    color: <span>{e.color}</span>{" "}
                  </p>
                </div>
                <div className={classnames(s.color_details, s.flex)}>
                  <p>
                    material: <span>{e.material}</span>
                  </p>
                </div>
                <button className={s.cartButoon} onClick={() => addCart(e.id)}>
                  add to basket
                </button>
                <div className={s.info_from_item}>
                  <div className={s.details}>
                    <h3>Details:</h3>
                  </div>
                  <p>
                    <strong>{"material"}</strong>: {e.material}
                  </p>
                  <p>
                    <strong>{"cutting"}</strong>: {e.cutting}
                  </p>
                  <p>
                    <strong>{"fasion"}</strong>: {e.fasion}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Item;
