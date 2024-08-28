import { FC, useContext, useEffect, useState } from "react";
import s from "./Cart.module.scss";
import g from "../../../Index.module.scss";
import { routes } from "../../../config/routes";
import { Link } from "react-router-dom";
import { Context } from "../../../index";
import { observer } from "mobx-react-lite";
import classnames from "classnames";
import { LoadingSmallSpace } from "../../loading/Loading";
import { showMiniCart, hideMiniCart } from "./LogicCart";
import { useResponsive } from "../../../Hooks/useResponsive";
const Cart: FC = () => {
  const { cart, auth } = useContext(Context);
  const [load, setLoad] = useState();
  const { respon } = useResponsive();
  useEffect(() => {
    cart.get(auth.user.id);
  }, [auth.isAuth]);
  const countTotalPrice = () => {
    if (cart.cartItems) {
      let acum = 0;
      cart.cartItems.forEach(
        (e) => (acum = e.cart.number * e.item.price + acum)
      );
      return acum;
    }
  };

  return (
    <>
      {respon ? (
        <Link to={routes.cart}>
          <div id="imgMiniCart" className={s.img_block}>
            <div className={s.counterCartItems}>{cart.cartItems.length}</div>
            <img src={`${process.env.PUBLIC_URL}/img/basket.png`} alt="cart" />
            <div className={s.whitePartition} id="whitePartition"></div>
          </div>
        </Link>
      ) : (
        <div
          className={s.account_panel}
          onMouseEnter={() => showMiniCart()}
          onMouseLeave={() => hideMiniCart(true)}
        >
          <div id="imgMiniCart" className={s.img_block}>
            <div className={s.counterCartItems}>{cart.cartItems.length}</div>
            <img src={`${process.env.PUBLIC_URL}/img/basket.png`} alt="cart" />
            <div className={s.whitePartition} id="whitePartition"></div>
          </div>
          <div id="miniCart" className={s.panel}>
            {load && <LoadingSmallSpace />}
            {cart.cartItems.length > 0 ? (
              <div className={s.miniCart}>
                <div className={s.items}>
                  {cart.cartItems.map((e) => (
                    <div className={s.item} key={e.cart.id}>
                      <Link to={`/item/${e.item.ean}`}>
                        <div className={s.link}>
                          <img
                            className={s.imgItem}
                            alt="item"
                            src={`${process.env.PUBLIC_URL}${
                              e.item.img.filter(
                                (e) => e.search("front") > -1
                              )[0]
                            }`}
                          />
                          <div className={s.text}>
                            <p className={s.brand}>{e.item.brand}</p>
                            <p className={classnames(s.name, g.hideText)}>
                              {e.item.name}
                            </p>
                            <div className={s.info}>
                              <p>
                                size: <span>{e.cart.size}</span>
                              </p>
                              <p>number: {e.cart.number}</p>
                            </div>
                          </div>
                        </div>
                      </Link>
                      <div className={s.price_delete}>
                        <h3>{e.item.price}$</h3>
                        <div
                          onClick={() => cart.delete(e.cart.id, auth.user.id)}
                          className={s.delete}
                        >
                          delete
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className={s.menucart}>
                  <div className={s.partition}></div>
                  <div className={s.textTotalPrice}>
                    <div>total price:</div>
                    <div className={s.totalPrice}>{countTotalPrice()}$</div>
                  </div>
                  <Link to={routes.cart}>
                    <button className={classnames(g.button, s.w100)}>
                      Go to Cart
                    </button>
                  </Link>
                </div>
              </div>
            ) : (
              <div id="miniCart" className={s.empty}>
                <h2>Your cart is empty</h2>
                <p>Get inspired and fill it with the latest trends.</p>
                <div className={s.partition}></div>
                <p>choose your gender</p>
                <div className={s.buttons}>
                  <Link to={routes.man} className={g.button}>
                    man
                  </Link>
                  <Link to={routes.woman} className={g.button}>
                    woman
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default observer(Cart);
