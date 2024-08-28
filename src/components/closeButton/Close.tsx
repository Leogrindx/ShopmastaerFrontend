import { FC } from "react";
import s from "./Close.module.scss";
import classNames from "classnames";
interface Props {
  setState: (hum: boolean) => void;
  size: number;
  zIndex?: number;
}
const Close: FC<Props> = ({ setState, size, zIndex }) => {
  return (
    <div
      className={s.cross}
      style={{ transform: `scale(${size})`, zIndex: zIndex }}
      onClick={() => setState(false)}
    >
      <div className={classNames(s.partition, s.up)}></div>
      <div className={classNames(s.partition, s.down)}></div>
    </div>
  );
};
export default Close;
