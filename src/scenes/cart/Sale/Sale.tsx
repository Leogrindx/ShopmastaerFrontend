import classNames from "classnames";
import s from "./Sale.module.scss";
import r from "./SaleResponsive.module.scss";
import g from "../../../Index.module.scss";
import { useResponsive } from "../../../Hooks/useResponsive";
import { useSale } from "./useSale";
const ToPay = () => {
  const { content, arrow, acum, toggle } = useSale();
  const { respon } = useResponsive();

  return (
    <div className={respon ? r.sale : s.sale}>
      <div className={respon ? r.total_priceBox : s.total_priceBox}>
        <div className={respon ? r.total_price : s.total_price}>
          <h2 className={s.titleToPay}>To pay</h2>
          <div className={s.text}>
            <p>The value of the products</p>
            <p>{acum} $</p>
          </div>
          <div className={s.text}>
            <p>Delivery</p>
            <p>{"0$"}</p>
          </div>
          <div className={g.partition}></div>
          <div className={classNames(s.text, s.boldText)}>
            <p>To be paid (incl. VAT)</p>
            <p>{acum} $</p>
          </div>
        </div>
        <button className={classNames(g.button, s.fullButton)}>buy</button>
      </div>

      <div
        className={respon ? r.discount : s.discount}
        style={content ? { height: 145 } : { height: 30 }}
      >
        <div className={s.textDiscount}>
          <p>Add a discount code</p>
          <p
            className={arrow ? classNames(s.arrow, s.rotate) : s.arrow}
            onClick={() => toggle()}
          >
            〱
          </p>
        </div>
        <div className={s.enterCode}>
          <p>Enter Code</p>
          <input type="text" className={g.input} />
        </div>
      </div>
    </div>
  );
};

export default ToPay;
