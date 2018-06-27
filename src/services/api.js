import request from '../utils/request';

export async function queryPost(params, url) {
  return request(url, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: params,
  });
}
export async function query(url) {
  return request(url);
}
export async function create(params, url) {
  return request(url, {
    method: 'post',
    data: params,
  });
}
export async function update(params, url) {
  return request(url, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: params,
  });
}
export async function remove(params, url) {
  return request(url, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: params,
  });
}
