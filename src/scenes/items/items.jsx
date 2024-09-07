import { useRef, createContext } from "react";
import s from "./items.module.scss";
import Filter from "./filter/filter";
import Menu from "../../components/menu/Menu";
import RenderItems from "./RenderItems/RenderItems";
import Error404 from "../error/Error404";
import { useResponsive } from "../../Hooks/useResponsive";
import { useParams } from "react-router-dom";
import { routes } from "../../config/routes";

export const Context = createContext();

const Items = () => {
  const { respon } = useResponsive();
  const { type } = useParams();
  const types = [routes.shoes, routes.cloth];
  const filter = useRef([]);
  return (
    <Context.Provider value={filter}>
      {types.findIndex((e) => e === type) > -1 ? (
        <>
          {!respon && <Menu />}
          <div className={s.itemsContainer}>
            <Filter />
            <RenderItems />
          </div>
        </>
      ) : (
        <Error404 />
      )}
    </Context.Provider>
  );
};

export default Items;
