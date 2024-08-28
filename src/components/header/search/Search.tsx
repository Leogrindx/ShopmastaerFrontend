import { FC } from "react";
import { Link } from "react-router-dom";
import s from "./Search.module.scss";
import r from "./SeacrhResponsie.module.scss";
import g from "../../../Index.module.scss";
import { useLogicSearch } from "./useSearch";
import classnames from "classnames";
import { LoadingSmallSpace } from "../../loading/Loading";
import { useResponsive } from "../../../Hooks/useResponsive";
import CloseButton from "../../closeButton/Close";
const Seacrh: FC = () => {
  const { items, load, value, input, change, open, close, setInput } =
    useLogicSearch();
  const { respon } = useResponsive();
  return (
    <>
      {respon ? (
        <div
          className={
            input
              ? classnames(r.search, r.hide, r.show)
              : classnames(r.search, r.hide)
          }
        >
          <div className={r.inputPanel} id="search_panel">
            <input
              onClick={(e) => open(e, r.activeInput, true)}
              onChange={change}
              className={r.input}
              type="text"
              id="search"
              placeholder="Search"
              value={value}
            />
            {input && (
              <div className={r.closeButtonPos}>
                <CloseButton setState={setInput} size={0.6} zIndex={1} />
              </div>
            )}
          </div>
          <div
            className={r.track}
            style={input ? { display: "block" } : { display: "none" }}
          >
            <div className={r.items} id="item_search">
              {load && <LoadingSmallSpace />}
              {items.length !== 0 ? (
                items.map((e, i) => (
                  <div className={r.itemBlock} key={i}>
                    <div className={s.item}>
                      <Link to={`item/${e.ean}`}>
                        <div
                          className={s.block_item}
                          onClick={(e) => close(e, r.activeInput, true)}
                        >
                          <div className={s.text}>
                            <img
                              className={s.img}
                              src={`${process.env.PUBLIC_URL}${
                                e.img.filter((e) => e.search("front") > -1)[0]
                              }`}
                              alt="img"
                            />
                            <p className={s.brand}>{e.brand}</p>
                            <p className={classnames(r.name, g.hideText)}>
                              {e.name}
                            </p>
                          </div>
                          <p className={s.price}>{e.price}$</p>
                        </div>
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className={s.notItems}>
                  <h2>Not items</h2>
                </div>
              )}
            </div>
          </div>
          {/* <div
            className={r.close}
            style={input ? { display: "flex" } : { display: "none" }}
          >
            <button
              onClick={(e) => close(e, r.activeInput, true)}
              className={classnames(g.button, g.w100)}
            >
              close
            </button>
          </div> */}
        </div>
      ) : (
        <div className={s.track}>
          <div className={s.search_block}>
            <div id="search_panel">
              <input
                onClick={(e) => open(e, s.activeInput, false)}
                onChange={change}
                className={s.input}
                type="text"
                id="search"
                placeholder="Search"
                value={value}
              />
              <button
                className={s.close}
                onClick={(e) => close(e, s.activeInput, false)}
                id="close"
              >
                &#x2715;
              </button>
            </div>
            <div className={s.search_panel} id="item_search">
              {load && <LoadingSmallSpace />}
              {items.length !== 0 ? (
                items.map((e, i) => (
                  <div className={s.item} key={i}>
                    <Link to={`item/${e.ean}`}>
                      <div className={s.block_item}>
                        <div className={s.text}>
                          <img
                            className={s.img}
                            src={`${process.env.PUBLIC_URL}${
                              e.img.filter((e) => e.search("front") > -1)[0]
                            }`}
                            alt="img"
                          />
                          <p className={s.brand}>{e.brand}</p>
                          <p className={classnames(s.name, g.hideText)}>
                            {e.name}
                          </p>
                        </div>
                        <p className={s.price}>{e.price}$</p>
                      </div>
                    </Link>
                  </div>
                ))
              ) : (
                <div className={s.notItems}>
                  <h2>Not items</h2>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Seacrh;
