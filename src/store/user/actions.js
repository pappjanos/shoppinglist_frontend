import userService from "../../api/services/userService";
import dummyService from "../../api/services/dummyService";
import blogService from "../../api/services/blogService";
import { parse } from "@/util/jwt";
import router from "../../router";

function setMessage(context, message, color = "red") {
  context.dispatch(
    "general/setSnackbar",
    {
      message,
      color,
    },
    { root: true }
  );
}

export const actions = {
  setEmail(context, to) {
    context.commit("SET_EMAIL", to);
  },

  async login(context, { email, password }) {
    try {
      const response = await userService.login({ email, password });
      localStorage.setItem("token", response.data.tokens.access.token);
      const token = parse(response.data.tokens.access.token);

      context.commit("SET_USER", {
        email: data.user.email,
        isloggedIn: true,
        roles: data.user.role,
        id: data.user.id,
      });

      // call setAuthToken for all apis here
      dummyService.setAuthToken(response.data.tokens.access.token);
      blogService.setAuthToken(response.data.tokens.access.token);

      setMessage(context, "Succesfull login!", "green");
      router.push({ name: "Home" }).catch(() => {});
    } catch (error) {
      setMessage(context, error.response.data.message);
    }
  },

  reloadUserFromLocalStorage(context) {
    if (localStorage.getItem("user")) {
      context.commit("RELOAD_USER_FROM_LOCAL_STORAGE");
    } else {
      context.dispatch("logout");
    }
  },

  async register(context, { email, password }) {
    const user = {
      name: "name",
      email,
      password,
    };
    try {
      const registerResp = await userService.register(user);

      setMessage(
        context,
        "Registration succesfull! Please check your email address for validate your account!",
        "green"
      );
      router.push({ name: "Login" }).catch(() => {});
    } catch (error) {
      setMessage(context, error.response.data.message);
    }
  },

  async logout(context) {
    localStorage.clear("token");
    context.commit("LOGOUT_USER");
    router.push({ name: "Home" }).catch(() => {});
  },
};
