import { useEffect, useState } from "react";
import s from "./menu.module.scss";
import r from "./menuRespons.module.scss";
import { useMenu } from "./useMenu";
import { useParams, Link } from "react-router-dom";
import { useResponsive } from "../../Hooks/useResponsive";
import classNames from "classnames";
import { routes } from "../../config/routes";

const Menu = () => {
  const [menu, setMenu] = useState(false);
  const [chose, setChose] = useState(false);
  const { respon } = useResponsive();
  const { gender, type } = useParams();
  const { underType, sortUnderType, width, height, correctLink } =
    useMenu(gender);
  useEffect(() => {
    sortUnderType(gender, "shoes");
  }, []);
  return (
    <>
      {!respon === true ? (
        <div className={s.menu}>
          <div className={s.types}>
            <Link to={`/${gender}/${routes.shoes}`} className="clearFilter">
              <div
                onMouseEnter={() => sortUnderType(gender, "shoes")}
                className={s.type}
              >
                Shoes
              </div>
            </Link>
            <Link to={`/${gender}/${routes.cloth}`} className="clearFilter">
              <div
                onMouseEnter={() => sortUnderType(gender, "cloth")}
                className={s.type}
              >
                Cloth
              </div>
            </Link>
          </div>
          <div className={s.content} style={{ width: width, height: height }}>
            {underType.map((e, i) => (
              <div
                key={i}
                style={!respon && { width: 200, height: 50 }}
                className={s.menuElement}
              >
                <Link
                  to={`/${gender}/${type}/${correctLink(e)}`}
                  className="clearFilter"
                >
                  {e}
                </Link>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          {type && (
            <div className={r.menu}>
              <div className={r.types}>
                <div
                  onClick={() => {
                    sortUnderType(gender, "shoes");
                    setChose("shoes");
                    setMenu(true);
                  }}
                  className={r.menuElement}
                >
                  Shoes
                </div>
                <div
                  onClick={() => {
                    sortUnderType(gender, "cloth");
                    setChose("cloth");
                    setMenu(true);
                  }}
                  className={r.menuElement}
                >
                  Cloth
                </div>
              </div>
              <div className={menu ? classNames(r.show, r.block) : r.block}>
                <div onClick={() => setMenu(false)} className={r.back}>
                  <p>➔</p>
                </div>
                <div className={r.menuElement}>
                  <Link to={`${gender}/${chose}`} className={s.capitalize}>
                    {`all ${chose}`}
                  </Link>
                </div>
                {underType.map((e, i) => (
                  <div key={i} className={r.menuElement}>
                    <Link
                      to={`${gender}/${type}/${correctLink(e)}`}
                      className={s.capitalize}
                    >
                      {e}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Menu;
