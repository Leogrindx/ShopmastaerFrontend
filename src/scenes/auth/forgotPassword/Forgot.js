import React from "react";
import s from "../Auth.module.scss";
import g from "../../../Index.module.scss";
import classNames from "classnames";
import { Link } from "react-router-dom";
const Forgot = () => {
  return (
    <div className={g.flex}>
      <div className={s.logo}>
        <Link to="/">
          <img
            src={`${process.env.PUBLIC_URL}/img/logo.png`}
            alt="Logo"
            width="250"
          />
        </Link>
      </div>
      <div className={g.form}>
        <h3 className={s.title_forgot}>Write your Email</h3>
        <div>
          <label htmlFor="email">
            <p>Email</p>
          </label>
          <input
            className={g.input}
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            required
          />
        </div>
        <button className={classNames(g.button, s.margin)} type="submit">
          change password
        </button>
      </div>
    </div>
  );
};

export default Forgot;
