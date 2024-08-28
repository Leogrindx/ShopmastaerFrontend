import { FC, useContext, useState } from "react";
import s from "./Account.module.scss";
import r from "./AccountResponsive.module.scss";
import g from "../../../Index.module.scss";
import { routes } from "../../../config/routes";
import { hideMiniCart } from "../cart/LogicCart";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { Context } from "../../../index";
import { observer } from "mobx-react-lite";
import { useResponsive } from "../../../Hooks/useResponsive";

const AccountPanel: FC = () => {
  const { auth } = useContext(Context);
  const { respon } = useResponsive();
  const [authResponsive, setAuthResponsive] = useState(false);
  return (
    <>
      {respon ? (
        <>
          {auth.isAuth ? (
            <>
              <div className={s.img_block}>
                <img
                  src={`${process.env.PUBLIC_URL}/img/login.png`}
                  alt=""
                  onClick={() => setAuthResponsive(!authResponsive)}
                />
                <div className={s.whitePartition}></div>
              </div>
              {authResponsive && (
                <div className={r.Account_panel}>
                  <div className={r.closeBlock}>
                    <button
                      className={r.close}
                      onClick={(e) => setAuthResponsive(false)}
                      id="close"
                    >
                      &#x2715;
                    </button>
                  </div>
                  <div className={r.under_developing}>
                    <img
                      className={s.under_developing}
                      src={`${process.env.PUBLIC_URL}/img/under_construction.png`}
                      alt=""
                    />
                  </div>
                  <div>
                    <div className={s.partition_user}></div>
                    <p className={s.black}>change password</p>
                    <div className={s.partition_user}></div>
                  </div>
                  <div className={r.logout}>
                    <button onClick={() => auth.logout()} className={g.button}>
                      Log Out
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <Link to={routes.login}>
              <div className={s.img_block}>
                <img src={`${process.env.PUBLIC_URL}/img/login.png`} alt="" />
                <div className={s.whitePartition}></div>
              </div>
            </Link>
          )}
        </>
      ) : (
        <div
          className={s.account_panel}
          onMouseEnter={() => hideMiniCart(false)}
        >
          <div className={s.img_block}>
            <img src={`${process.env.PUBLIC_URL}/img/login.png`} alt="" />
            <div className={s.whitePartition}></div>
          </div>
          <div className={s.panel}>
            {auth.isAuth ? (
              <div className={s.Account_panel}>
                <img
                  className={s.under_developing}
                  src={`${process.env.PUBLIC_URL}/img/under_construction.png`}
                  alt=""
                />
                <div className={s.partition_user}></div>
                <p className={s.black}>change password</p>
                <div className={s.partition_user}></div>
                <button onClick={() => auth.logout()} className={g.button}>
                  Log Out
                </button>
              </div>
            ) : (
              <div className={s.emptyAccount_panel}>
                <h2>Not account?</h2>
                <p>Sign in or Sign Up it's easy</p>
                <div className={s.buttons}>
                  <Link to={routes.login}>
                    <button className={classnames(g.button, s.w100)}>
                      Sign In
                    </button>
                  </Link>
                  <div className={s.block_partition_login}>
                    <div className={s.partition}></div>
                  </div>
                  <Link to={routes.register}>
                    <button className={classnames(g.button, s.w100)}>
                      Sign Up
                    </button>
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

export default observer(AccountPanel);
