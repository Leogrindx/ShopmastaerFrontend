import { useContext, useEffect } from "react";
import { Context } from "../../index";
import { useResponsive } from "../../Hooks/useResponsive";
import { observer } from "mobx-react-lite";
import s from "./Cart.module.scss";
import r from "./CartResponsive.module.scss";
import ImageCheck from "../../components/imageCheck/ImageCheck";
import Sale from "./Sale/Sale";
import Items from "./items/Items";
const Cart = () => {
  const { cart, auth } = useContext(Context);
  const { respon } = useResponsive();
  useEffect(() => {
    cart.get(auth.user.id);
  }, []);

  return (
    <>
      {respon ? (
        <div className={r.cartContainer}>
          {cart.cartItems.length > 0 ? (
            <div className={r.cart}>
              <div className={s.renders}>
                <Items />
                <Sale />
              </div>
            </div>
          ) : (
            <div className={s.cart_empty}>
              <div className={s.title}>
                <h1>Cart empty</h1>
                <h3>Choose item</h3>
              </div>
              <ImageCheck />
            </div>
          )}
        </div>
      ) : (
        <div className={s.cartContainer}>
          {cart.cartItems.length > 0 ? (
            <div className={s.cart}>
              <div className={s.renders}>
                <Items />
                <Sale />
              </div>
              <div className={s.payment}>
                <p className={s.titlePayment}>Type of payments</p>
                <div className={s.images}>
                  <img
                    className={s.img}
                    src={`${process.env.PUBLIC_URL}/img/types_of_pay/Gpay.png`}
                    alt="Gpay"
                  />
                  <img
                    className={s.img}
                    src={`${process.env.PUBLIC_URL}/img/types_of_pay/Apple_Pay.png`}
                    alt="Apple_Pay"
                  />
                  <img
                    className={s.img}
                    src={`${process.env.PUBLIC_URL}/img/types_of_pay/blik.png`}
                    alt="blik"
                  />
                  <img
                    className={s.img}
                    src={`${process.env.PUBLIC_URL}/img/types_of_pay/Mastercard.png`}
                    alt="Mastercard"
                  />
                  <img
                    className={s.img}
                    src={`${process.env.PUBLIC_URL}/img/types_of_pay/Visa.png`}
                    alt="Visa"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className={s.cart_empty}>
              <div className={s.title}>
                <h1>Cart empty</h1>
                <h3>Choose item</h3>
              </div>
              <ImageCheck />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default observer(Cart);
