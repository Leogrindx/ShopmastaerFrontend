import s from "./ItemDetail.module.scss";
import r from "./ItemDetailResponsive.module.scss";
import classnames from "classnames";
import { useItemDetail } from "./useItemDetail";
import SwiperRes from "./SwiperRes/SwiperRes";
import "swiper/css";
const ItemDetailResponsive = () => {
  const { item, setSliderState, addCart, setZoomState } = useItemDetail();
  return (
    <div className={s.ItemView}>
      <>
        {item.map((e, i) => (
          <div className={s.top_details} key={i}>
            <div className={r.image_block}>
              <div
                style={{ width: window.innerWidth }}
                onClick={() => setZoomState(true)}
              >
                <SwiperRes img={e.img} />
              </div>
            </div>
            <div className={r.name_item_details}>
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
    </div>
  );
};

export default ItemDetailResponsive;
