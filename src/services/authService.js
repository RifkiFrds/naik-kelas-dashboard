import api from "../app/api";

// request login ke backend
export const login = async (email, password) => {
  const res = await api.post("/auth/login", { email, password });
  return res.data; // { token, user, ... }
};
