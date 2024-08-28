import { Link, useParams } from "react-router-dom";
import s from "./typeChose.module.scss";
import g from "../../Index.module.scss";
import { useResponsive } from "../../Hooks/useResponsive";
import { routes } from "../../config/routes";
import Error404 from "../error/Error404";
const TypeChose = () => {
  const { respon } = useResponsive();
  const { gender } = useParams();
  const genders = [routes.woman, routes.man];
  return (
    <>
      {genders.findIndex((e) => e === `/${gender}`) > -1 ? (
        <div className={s.typeChose}>
          <h1>Chose One</h1>
          <div className={s.row}>
            <Link to={`/${gender}/${routes.cloth}`}>
              {respon ? (
                <div className={s.buttonBlock}>
                  <button className={g.button}>Cloth</button>
                </div>
              ) : (
                <div className={s.imgBlock}>
                  <img
                    src={`${process.env.PUBLIC_URL}/img/${gender}/home/cloth.jpg`}
                    width="100%"
                    alt="Man"
                  />
                </div>
              )}
            </Link>

            <Link to={`/${gender}/${routes.shoes}`}>
              {respon ? (
                <div className={s.buttonBlock}>
                  <button className={g.button}>Shoes</button>
                </div>
              ) : (
                <div className={s.imgBlock}>
                  <div>
                    <img
                      src={`${process.env.PUBLIC_URL}/img/${gender}/home/shoes.jpg`}
                      width="100%"
                      alt="Woman"
                    />
                  </div>
                </div>
              )}
            </Link>
          </div>
        </div>
      ) : (
        <Error404 />
      )}
    </>
  );
};

export default TypeChose;
