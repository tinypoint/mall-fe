import http from './public'
// 按照用户名或用户id查询用户
export const searchUser = params => {
  return http.fetchPost('/admin/searchUser', params)
}
