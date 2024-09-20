import { FC } from "react";
import { Link } from "react-router-dom";
import Animation from "../../../components/loading/Loading";

import Cart from "./cart/Cart";
import s from "./RenderItems.module.scss";
import classNames from "classnames";
import { useResponsive } from "../../../Hooks/useResponsive";
import { useRender } from "./useRender";
const RenderItems: FC = () => {
  const { respon } = useResponsive();
  const { isLoading, items, scrollPages, page, error } = useRender();
  if (isLoading) {
    return (
      <>
        <Animation />
      </>
    );
  }
  return (
    <div
      className={s.items}
      style={respon ? { marginTop: 30, width: "100%" } : {}}
    >
      <>
        <div className={s.view_items}>
          {items && (
            <>
              {items.length !== 0 ? (
                items.map((e, i) => (
                  <div className={s.view_item} key={i}>
                    <div>
                      <Cart sizes={e.size} keyx={i} itemID={e.id} />
                    </div>
                    <div className={s.item}>
                      <Link to={`/item/${e.ean}`}>
                        <div className={s.img}>
                          <div className={s.articl_items}>
                            <img
                              className={s.img}
                              src={`${process.env.PUBLIC_URL}${
                                e.img.filter((e) => e.search("front") > -1)[0]
                              }`}
                              alt="item"
                            />
                            <div className={s.got_to}>
                              <div className={s.btn_item}>go to</div>
                            </div>
                          </div>
                          <div className={s.add_item_in_basket}></div>
                        </div>
                        <div className={s.item_text}>
                          <div className={s.item_textColumn}>
                            <div className={s.item_name}>
                              <div className={s.brand}>
                                <p>{e.brand}</p>
                              </div>
                              <div className={s.name}>
                                <p>{e.name}</p>
                              </div>
                            </div>
                            <div className={s.item_price}>
                              <p>{e.price},</p>
                              <p>{e.cent ? e.cent : "00"}</p>
                              <p className={s.currency}>zl</p>
                            </div>
                          </div>
                          <div className={s.item_size}>
                            <p>size:</p>
                            {e.size.map((e) => `${e}, `)}
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className={s.notItems}>
                  <h1>There is no such product</h1>
                </div>
              )}
            </>
          )}
        </div>
        <div className={s.trigger}>
          <div className={s.prev}>
            <button
              onClick={(e) => scrollPages("prev")}
              className={classNames(s.arrow, s.leftArrow)}
              disabled={Number(page.get("page")) <= 1 ? true : false}
            >
              ➤
            </button>
          </div>
          <div className={s.pages}>{page.get("page")}</div>
          <div className={s.next}>
            <button onClick={(e) => scrollPages("next")} className={s.arrow}>
              ➤
            </button>
          </div>
        </div>
      </>
    </div>
  );
};

export default RenderItems;
