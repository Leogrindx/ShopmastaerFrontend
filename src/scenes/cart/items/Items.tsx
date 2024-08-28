import { Link } from "react-router-dom";
import classNames from "classnames";
import { useContext } from "react";
import { Context } from "../../../index";
import s from "./Items.module.scss";
import r from "./ItemsResponsive.module.scss";
import g from "../../../Index.module.scss";
import { useResponsive } from "../../../Hooks/useResponsive";

const Items = () => {
  const { cart, auth } = useContext(Context);
  const { respon, responMini } = useResponsive();

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div className={respon ? r.items : s.items}>
      {cart.cartItems.map((e, i) => (
        <div className={classNames(s.cart_item, g.flex_row)} id={"id"} key={i}>
          <Link to={`/item/${e.item.ean}`}>
            <div className={classNames(s.block_cart1, g.flex_row)}>
              <div className={s.img_cart}>
                <img
                  src={`${process.env.PUBLIC_URL}${
                    e.item.img.filter((e) => e.search("front") > -1)[0]
                  }`}
                  alt="item"
                />
              </div>
              <div
                className={
                  respon
                    ? classNames(r.text, r.brand)
                    : classNames(s.text, s.brand)
                }
              >
                <p className={g.hideText}>{e.item.brand}</p>
              </div>
              {!respon && (
                <div className={classNames(s.text, s.name)}>
                  <p>{e.item.name}</p>
                </div>
              )}
            </div>
          </Link>
          <div className={classNames(s.block_cart2, g.flex_row)}>
            <div className={s.size_item}>
              <p className={respon ? r.sizeP : s.sizeP}>
                <span className={s.span}>size:</span>
                {e.cart.size}
              </p>
            </div>
            {!responMini && (
              <div className={s.price_cart}>
                <p>{e.item.price} $</p>
              </div>
            )}
            <div className={s.number_cart}>
              <select
                name={e.cart.size}
                className={s.select_cart}
                value={e.cart.number}
                onChange={(element) =>
                  cart.update(
                    auth.user.id,
                    e.cart.id,
                    Number(element.target.value)
                  )
                }
              >
                {numbers.map((e) => (
                  <option value={e} key={e}>
                    {e}
                  </option>
                ))}
              </select>
            </div>
            <img
              className={s.delete_cart}
              onClick={() => cart.delete(e.cart.id, auth.user.id)}
              src={`${process.env.PUBLIC_URL}/img/quit.png`}
              alt="delete"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Items;
