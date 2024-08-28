import s from "./Cart.module.scss";
import classNames from "classnames";
import { useCart } from "./useCart";
const Cart = ({
  sizes,
  keyx,
  itemID,
}: {
  sizes: string[];
  keyx: number;
  itemID: number;
}) => {
  const { state, toggle } = useCart({
    sizes: sizes,
    keyx: keyx,
    itemID: itemID,
  });
  return (
    <div className={s.basket_item} id={`showHideCartOfItems_${keyx}`}>
      {state ? (
        <div className={s.sizes}>
          <div className={s.close} onClick={() => toggle()}>
            <div className={s.partitions}>
              <div className={classNames(s.partition, s.right)}></div>
              <div className={classNames(s.partition, s.left)}></div>
            </div>
          </div>
          {sizes.map((e, i) => (
            <p onClick={() => toggle(e)} key={i} className={s.size}>
              {e}
            </p>
          ))}
        </div>
      ) : (
        <div className={s.img} onClick={(e) => toggle()}>
          <img src={`${process.env.PUBLIC_URL}/img/basket.png`} alt="basket" />
        </div>
      )}
    </div>
  );
};

export default Cart;
