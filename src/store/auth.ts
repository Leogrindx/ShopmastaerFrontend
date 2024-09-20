import { IUser } from "../models/AuthResponse";
import { makeAutoObservable } from "mobx";
import AuthResponseService from "../service/AuthService";
import { AuthResponse } from "../models/AuthResponse";
import { API_URL } from "../http/Htttp";
import Swal from "sweetalert2";
import axios from "axios";
import { loading } from "../components/loading/Loading";
import { verification, Iverification } from "../service/VerificationService";
export default class AuthStore {
  error = {} as Iverification;
  isAuth: boolean = false;
  user = {} as IUser;

  constructor() {
    makeAutoObservable(this);
  }

  clearError() {
    this.error = {} as Iverification;
  }

  private setUser(user: IUser) {
    this.user = user;
  }

  private setAuth(boolean: boolean) {
    this.isAuth = boolean;
  }

  private setError(error: Iverification) {
    this.error = error;
  }

  async login(email: string, password: string) {
    try {
      loading(true);
      const response = await AuthResponseService.login(email, password);
      console.log(response);
      localStorage.setItem("token", response.data.accessToken);
      this.setUser(response.data.user);
      this.setAuth(true);
      loading(false);
      Swal.fire({ icon: "success", title: "Success" });
      return response.status;
    } catch (e) {
      console.error(e);
      loading(false);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Email or Password wrong",
      });
    }
  }

  async registration(
    first_name: string,
    last_name: string,
    gender: string,
    email: string,
    password: string,
    confirm: string
  ) {
    try {
      this.clearError();
      const audit = verification(
        first_name,
        last_name,
        email,
        password,
        confirm
      );
      if (audit.status) {
        loading(true);
        const response = await AuthResponseService.register(
          first_name,
          last_name,
          gender,
          email,
          password
        );
        Swal.fire({
          icon: "success",
          title: "Success",
        });
        loading(false);
        return response.status;
      } else {
        this.setError(audit);
      }
    } catch (e) {
      loading(false);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "This email address is already in use",
      });
    }
  }

  async logout() {
    try {
      loading(true);
      await AuthResponseService.logout();
      localStorage.removeItem("token");
      this.setUser({} as IUser);
      this.setAuth(false);
      loading(false);
    } catch (e) {
      loading(false);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "This email address is already in use",
      });
    }
  }

  async checkAuth() {
    try {
      const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {
        withCredentials: true,
      });
      this.setUser(response.data.user);
      this.setAuth(true);
      return response.status;
    } catch (e) {
      console.error(e);
      localStorage.removeItem("token");
    }
  }
}
