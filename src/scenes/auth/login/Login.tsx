import { useState, useContext, FC } from "react";
import { observer } from "mobx-react-lite";
import s from "../Auth.module.scss";
import g from "../../../Index.module.scss";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { routes } from "../../../config/routes";
import { Context } from "../../../index";
const Login: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { auth } = useContext(Context);
  const navigate = useNavigate();
  document.body.onkeydown = (e) => {
    e.key === "Enter" && login(e);
  };
  function login(e: any) {
    e.preventDefault();
    const authStore = auth.login(email.toLowerCase(), password);
    authStore.then((res) => res === 200 && navigate("/"));
  }
  return (
    <>
      {auth.isAuth && <Navigate to="/" />}
      <div className={g.flex}>
        <div className={s.logo}>
          <Link to={routes.home}>
            <img
              src={`${process.env.PUBLIC_URL}/img/logo.png`}
              alt="Logo"
              width="250"
            />
          </Link>
        </div>
        <div className={g.form}>
          <h1 className={s.title_login}>Zaloguj się</h1>
          <form>
            <div>
              <label htmlFor="email_login">
                <p>E-mail</p>
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className={g.input}
                id="email_login"
                type="text"
                name="email"
                placeholder="E-mail"
                required
              />
            </div>
            <br />
            <div>
              <label htmlFor="password_login">
                <p>Hasło</p>
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className={g.input}
                id="password_login"
                type="password"
                name="password"
                placeholder="Password"
                required
              />
            </div>
            <div className={s.button}>
              <button className={g.button} onClick={(e) => login(e)}>
                Login
              </button>
            </div>
          </form>
        </div>
        <p>
          <Link to={routes.forgot_password}>Forgot password?</Link>
        </p>
        <h3 className={s.first_time}>First time on our page?</h3>
        <Link to={routes.register}>
          <button className={g.button}>Registration</button>
        </Link>
      </div>
    </>
  );
};

export default observer(Login);
