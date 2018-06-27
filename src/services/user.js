import request from '../utils/request';

export async function getUser(url) {
  return request(url);
}
export async function accountLogin(params, url) {
  return request(url, {
    method: 'post',
    data: params,
  });
}
export async function accountLoginOut(url) {
  return request(url);
}
