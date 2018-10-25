import request from "@/core/utils/request";

export async function getUser() {
  return request("/sys/currentUser");
}
export async function accountLogin(params) {
  return request("/sys/doLogin", {
    method: "post",
    data: params
  });
}
export async function accountLoginOut() {
  return request("/sys/logout");
}
