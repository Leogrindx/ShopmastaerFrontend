import s from "./ImageCheck.module.scss";
import g from "../../Index.module.scss";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { routes } from "../../config/routes";
const ImageCheck = () => {
  return (
    <div className={s.row}>
      <div className={classNames(s.man, s.container_content)}>
        <Link to={routes.man}>
          <div className={g.img_preview}>
            <img
              src={`${process.env.PUBLIC_URL}/img/man_preview.jpg`}
              width="100%"
              alt="Man"
            />
          </div>
        </Link>
      </div>

      <div className={classNames(s.woman, s.container_content)}>
        <Link to={routes.woman}>
          <div className={g.img_preview}>
            <img
              src={`${process.env.PUBLIC_URL}/img/women_preview.jpg`}
              width="100%"
              alt="Woman"
            />
          </div>
        </Link>
      </div>
    </div>
  );
};
export default ImageCheck;
