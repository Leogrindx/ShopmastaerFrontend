import { FC } from "react";
import s from "./Loading.module.scss";
import { rootLoading } from "../../index";

export const loading = (position: boolean) => {
  if (position) {
    rootLoading.render(<Animation />);
  } else {
    rootLoading.render(<></>);
  }
};

const Animation: FC = () => {
  return (
    <div className={s.loading}>
      <div>
        <img
          src={`${process.env.PUBLIC_URL}/img/loading.gif`}
          alt="Loading..."
        />
      </div>
    </div>
  );
};

export const LoadingSmallSpace = () => {
  return (
    <div className={s.loadingSmallSpace}>
      <img src={`${process.env.PUBLIC_URL}/img/loading.gif`} alt="Loading..." />
    </div>
  );
};

export default Animation;
