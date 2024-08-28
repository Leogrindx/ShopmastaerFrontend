import { Outlet, Link } from "react-router-dom";
import s from "./admin.module.scss";
const Shopmaster = () => {
  return (
    <div className={s.admin}>
      <div className={s.tools}>
        <Link to="create">Create</Link>
      </div>
      <Outlet />
    </div>
  );
};

export default Shopmaster;
