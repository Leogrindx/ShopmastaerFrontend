import { useState, useContext, FC, useEffect } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import classNames from "classnames";
import s from "../Auth.module.scss";
import g from "../../../Index.module.scss";
import { routes } from "../../../config/routes";
import { Context } from "../../../index";
const Register: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirm, setConfirm] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const { auth } = useContext(Context);
  const navigate = useNavigate();
  document.body.onkeydown = (e) => {
    e.key === "Enter" && register();
  };
  useEffect(() => {
    auth.clearError();
  }, []);
  function register() {
    const store = auth.registration(
      firstName,
      lastName,
      gender,
      email,
      password,
      confirm
    );
    store.then((res) => res === 200 && navigate("/login"));
  }
  const errors = (input: string) => {
    if (auth.error.status === false) {
      const result = auth.error.messages.filter((err) => err.input === input)[0]
        ?.message;
      return result;
    }
  };
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
        <div className={g.flex} id="form">
          <h1 className={s.title_registration}>Create account</h1>
          <div className={g.flex}>
            <label htmlFor="first_name" className={s.text}>
              <p>First Name</p>
            </label>
            <input
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              className={classNames(
                g.input,
                errors("first_name") && s.errorInput
              )}
              id="first_name"
              type="text"
              name="first_name"
              placeholder="First Name"
              required
            />
            <div className={s.error}>{errors("first_name")}</div>
          </div>
          <div className={g.flex}>
            <label htmlFor="last_name" className={s.text}>
              <p>Last Name</p>
            </label>
            <input
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              className={classNames(
                g.input,
                errors("last_name") && s.errorInput
              )}
              id="last_name"
              type="text"
              name="last_name"
              placeholder="Last Name"
              required
            />
            <div className={s.error}>{errors("last_name")}</div>
          </div>
          <div className={g.flex}>
            <label htmlFor="email" className={s.text}>
              <p>Email</p>
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className={classNames(g.input, errors("email") && s.errorInput)}
              id="email"
              type="text"
              name="email"
              placeholder="E-mail"
              required
            />
            <div className={s.error}>{errors("email")}</div>
          </div>
          <div className={g.flex}>
            <label htmlFor="password" className={s.text}>
              <p>Password</p>
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className={classNames(
                g.input,
                errors("password") && s.errorInput
              )}
              id="password"
              type="password"
              name="password"
              placeholder="Password"
              required
            />
            <div className={s.error}>{errors("password")}</div>
          </div>
          <div className={g.flex}>
            <label htmlFor="password" className={s.text}>
              <p>Confirm password</p>
            </label>
            <input
              onChange={(e) => setConfirm(e.target.value)}
              value={confirm}
              className={classNames(g.input, errors("confirm") && s.errorInput)}
              id="password"
              type="password"
              name="password"
              placeholder="Confirm password"
              required
            />
            <div className={s.error}>{errors("confirm")}</div>
          </div>
          <div className={s.gender}>
            <h4>Coose gender</h4>
            <div className={g.flex_row}>
              <div className={s.input}>
                <input
                  onChange={(e) => setGender(e.target.value)}
                  type="radio"
                  name="gender"
                  value="man"
                  id="man"
                  checked
                />
                <label htmlFor="man">Man</label>
              </div>
              <div className={s.input}>
                <input
                  onChange={(e) => setGender(e.target.value)}
                  type="radio"
                  name="gender"
                  value="woman"
                  id="woman"
                  required
                />
                <label htmlFor="woman">Woman</label>
              </div>
            </div>
          </div>
          {/* <div className={s.newsletter}>
                    <input type="checkbox" name="newsletter" value="true" id="newsletter" required />
                    <label htmlFor="newsletter">
                    Yes, I want a newsletter about trends, offers
                    and a 10% discount coupon for purchases over 200
                    zl. Cancellation is available at any time. (optional)
                    </label>
                </div> */}
          <button
            onClick={() => register()}
            className={classNames(g.button, s.margin)}
          >
            Register
          </button>
        </div>
      </div>
      <div id="check_email" className={g.d_none}>
        <div className={s.check_email}>
          <div className={s.logo}>
            <Link to={routes.home}>
              <img
                src={`${process.env.PUBLIC_URL}/img/logo.png`}
                alt="logo"
                width="250"
              />
            </Link>
          </div>
          <form>
            <h1>WPISZ KOD Z E-MAILA</h1>
            <input type="text" name="kod" placeholder="Kod" />
            <button type="submit">Zakoncz Rejestracje</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default observer(Register);
