import { makeAutoObservable } from "mobx";
import $api from "../http/Htttp";
import { CartResponse } from "../models/CartResponse";
import { ItemResponse } from "../models/ItemResponse";
import { authMiddleware } from "../middleware/authMiddleware";
import Swal from "sweetalert2";

export default class CartStore {
  cartItems: { cart: CartResponse; item: ItemResponse }[] = [];
  toggleHidePanel: boolean = true;
  constructor() {
    makeAutoObservable(this);
  }

  private setCartItems(
    cartItems: { cart: CartResponse; item: ItemResponse }[]
  ) {
    this.cartItems = cartItems;
  }

  setHidePanel(toggle: boolean) {
    this.toggleHidePanel = toggle;
  }

  async add(userid: number, itemid: number, size: string) {
    const middlewareDoubleItem =
      this.cartItems.findIndex(
        (e) => e.cart.itemid === itemid && e.cart.size === size
      ) < 0;
    try {
      if (authMiddleware()) {
        if (middlewareDoubleItem) {
          await $api.post("/cart", [
            {
              userid: userid,
              itemid: itemid,
              size: size,
            },
          ]);
          this.get(userid);
        }
      } else {
        if (middlewareDoubleItem) {
          const cart = JSON.parse(localStorage.getItem("cart")!);
          let res = [];
          if (cart) {
            res = [
              ...cart,
              { id: cart.at(-1).id + 1, itemid: itemid, size: size, number: 1 },
            ];
          } else {
            res = [{ id: 1, itemid: itemid, size: size, number: 1 }];
          }
          localStorage.setItem("cart", `${JSON.stringify(res)}`);
          this.get(userid);
        }
      }
    } catch (e) {
      console.log(e);
      localStorage.removeItem("cart");
      Swal.fire({ icon: "error", title: "Error", text: "can't add" });
    }
  }

  async migrationToServer(userid: number) {
    const migration = await $api.post("/cart", [
      userid,
      localStorage.getItem("cart"),
    ]);
    if (migration.status === 200) {
      localStorage.removeItem("cart");
    }
  }

  async get(userid: number) {
    const cart = localStorage.getItem("cart");
    const sendSet = async (req: string | number) => {
      if (req) {
        const query = await $api.get<
          { cart: CartResponse; item: ItemResponse }[]
        >(`/cart/${req}`);
        this.setCartItems(query.data);
      } else {
        this.setCartItems([]);
      }
    };
    try {
      if (authMiddleware()) {
        if (cart) {
          Swal.fire({
            title: "Do you want save previous cart?",
            text: "If not i will be deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "Delete",
            confirmButtonText: "Yes",
          }).then(async (result) => {
            if (result.isConfirmed) {
              await this.migrationToServer(userid);
              await sendSet(userid);
              localStorage.removeItem("cart");
              Swal.fire("Saved!", "Your cart now in account.", "success");
            } else {
              localStorage.removeItem("cart");
              Swal.fire("Deleted!", "Your cart now empty.", "error");
            }
          });
        } else {
          sendSet(userid);
        }
      } else {
        sendSet(cart || "");
      }
    } catch (e) {
      localStorage.removeItem("cart");
      console.log(e);
    }
  }

  async update(userid: number, id: number, number: number) {
    try {
      if (authMiddleware()) {
        await $api.put("/cart", { id: id, number: number });
        this.get(userid);
      } else {
        const cart = JSON.parse(localStorage.getItem("cart")!);
        const middlewear: [
          {
            id: number;
            userid: number;
            itemid: number;
            size: string;
            number: number;
          }
        ] = cart
          ? cart
          : [{ id: 1, userid: 0, itemid: 0, size: " ", number: 1 }];
        for (const e of middlewear) if (e.id === id) e.number = number;
        localStorage.setItem("cart", `${JSON.stringify(middlewear)}`);
        this.get(userid);
      }
    } catch (e) {
      Swal.fire({ icon: "error", title: "Error", text: "can't Update" });
    }
  }

  async delete(id: number, userid: number) {
    try {
      if (authMiddleware()) {
        await $api.delete(`/cart/${id}`);
        this.get(userid);
      } else {
        const cart = JSON.parse(localStorage.getItem("cart")!);
        const middlewear: [
          {
            id: number;
            userid: number;
            itemid: number;
            size: string;
            number: number;
          }
        ] = cart
          ? cart
          : [{ id: 1, userid: 0, itemid: 0, size: " ", number: 1 }];
        const res = middlewear.filter((e) => e.id !== id);
        if (res.length > 0) {
          localStorage.setItem("cart", `${JSON.stringify(res)}`);
        } else {
          localStorage.removeItem("cart");
        }
        this.get(userid);
      }
    } catch (e) {
      Swal.fire({ icon: "error", title: "Error", text: "can't Delete" });
    }
  }
}
