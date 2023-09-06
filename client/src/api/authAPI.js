import request from "./request";

const register = (data) => {
  return request({
    url: "/users/register",
    method: "POST",
    data,
  });
};

const login = (data) => {
  return request({
    url: "/users/login",
    method: "POST",
    data,
  });
};

const logout = () => {
  return request({
    url: "/users/logout",
    method: "GET",
  });
};

const checkAuth = () => {
  return request({
    url: "/users/checkauth",
    method: "GET",
  });
};

const refreshToken = (data) => {
  return request({
    url: "/users/refresh",
    method: "POST",
    data,
  });
};

export default {
  register,
  login,
  logout,
  checkAuth,
  refreshToken,
};
