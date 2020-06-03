import axios from './axios'

/**
 * 判断用户名是否存在 
 */
export const usernameIsSave = params => axios.get('/usernameIsSave', { params: params })
/**
 * 用户注册
 */
export const userRegister = params => axios.post('/register', params)
/**
 * 用户登录
 */
export const userLogin = params => axios.post('/login', params)
/**
 * 用户登出
 */
export const userLogout = ()=>axios.get('/logout')
/**
 * 获取用户头像
 */
export const getUserAvatarUrl = ()=>axios.get('/user/avatarUrl')
/**
 * 获取用户的收藏
 */
export const getUserCollection = ()=>axios.get('/user/collect')