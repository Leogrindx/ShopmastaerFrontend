import { createContext } from "react";
import * as ReactDOM from "react-dom/client";
import AuthStore from "./store/auth";
import CartStore from "./store/cart";
import App from "./Router";
interface State {
  auth: AuthStore;
  cart: CartStore;
}
const auth = new AuthStore();
const cart = new CartStore();

export const Context = createContext<State>({
  auth,
  cart,
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLDivElement
);
export const rootLoading = ReactDOM.createRoot(
  document.getElementById("loading") as HTMLDivElement
);
root.render(
  <Context.Provider value={{ auth, cart }}>
    <App />
  </Context.Provider>
);
