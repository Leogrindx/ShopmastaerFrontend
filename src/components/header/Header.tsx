import { FC, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { routes } from "../../config/routes";
import s from "./Header.module.scss";
import r from "./HeaderResposive.module.scss";
import Search from "./search/Search";
import AccountPanel from "./accountPanel/AccountPanel";
import Cart from "./cart/Cart";
import Menu from "../menu/Menu";
import Close from "../closeButton/Close";
import { useResponsive } from "../../Hooks/useResponsive";
import classNames from "classnames";
const Header: FC = () => {
  const { respon } = useResponsive();
  const [hamburger, setHamburger] = useState<Boolean>(false);
  return (
    <>
      {respon ? (
        <header className={s.headerResponsive}>
          <div className={r.firstPanel}>
            <div className={r.logo} id="logo">
              <Link to={routes.home}>
                <img
                  src={`${process.env.PUBLIC_URL}/img/logo.png`}
                  width="200"
                  alt="Logo"
                />
              </Link>
            </div>
            <div className={r.accrounPanel}>
              <AccountPanel />
              <Cart />
            </div>
          </div>
          <div className={r.secondPanel}>
            <div className={r.menu}>
              <div className={r.hamburger} onClick={() => setHamburger(true)}>
                <div
                  className={
                    hamburger ? r.partition : classNames(r.partition, r.show)
                  }
                ></div>
                <div className={r.partition}></div>
                <div className={r.partition}></div>
              </div>
              <div
                className={hamburger ? classNames(r.block, r.show) : r.block}
              >
                <div className={r.closeBlock}>
                  <Close setState={setHamburger} size={0.8} zIndex={4} />
                </div>
                <div className={r.navBar}>
                  <NavLink
                    to={routes.man}
                    onClick={() => setHamburger(false)}
                    className={({ isActive }) =>
                      isActive ? s.linkActive : s.linkNotActive
                    }
                  >
                    man
                  </NavLink>
                  <NavLink
                    to={routes.woman}
                    onClick={() => setHamburger(false)}
                    className={({ isActive }) =>
                      isActive ? s.linkActive : s.linkNotActive
                    }
                  >
                    woman
                  </NavLink>
                </div>
                <Menu />
              </div>
            </div>
            <Search />
          </div>
        </header>
      ) : (
        <header className={s.headerMain}>
          <div className={s.navBar}>
            <NavLink
              to={routes.man}
              className={({ isActive }) =>
                isActive ? s.linkActive : s.linkNotActive
              }
            >
              man
            </NavLink>
            <NavLink
              to={routes.woman}
              className={({ isActive }) =>
                isActive ? s.linkActive : s.linkNotActive
              }
            >
              woman
            </NavLink>
          </div>

          <div className={s.logo} id="logo">
            <Link to={routes.home}>
              <img
                src={`${process.env.PUBLIC_URL}/img/logo.png`}
                width="200"
                alt="Logo"
              />
            </Link>
          </div>
          <Search />
          <div className={s.block_user}>
            <AccountPanel />
            <Cart />
          </div>
        </header>
      )}
    </>
  );
};

export default Header;
