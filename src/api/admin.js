import http from './public'
// 按照用户名或用户id查询用户
export const searchUser = params => {
  return http.fetchPost('/admin/searchUser', params)
}

export const changeRole = params => {
  return http.fetchPost('/admin/changeRole', params)
}

export const searchGood = params => {
  return http.fetchPost('/admin/searchGood', params)
}

export const updateGood = params => {
  return http.fetchPost('/admin/updateGood', params)
}

export const addGood = params => {
  return http.fetchPost('/admin/addGood', params)
}

// 删除商品
export const deleteProd = params => {
  return http.fetchPost('/admin/deleteProd', params)
}

// 配置热门
export const configHots = params => {
  return http.fetchPost('/goods/configHot', params)
}
