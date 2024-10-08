import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { Context } from "../index";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
const Routers = () => {
  const { auth } = useContext(Context);
  if (auth.isAuth) {
    auth.checkAuth();
  }
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Routers;
