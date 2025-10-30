import axiosInstance from "./axios";

export const authApi = {
  login: async (username, password) => {
    const res = await axiosInstance.get("/accounts", { params: { username, password } });
    const user = res.data?.[0];
    if (!user) {
      throw new Error("Invalid username or password.");
    }
    return user;
  }
};
