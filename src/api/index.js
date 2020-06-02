import axios from './axios'

/**
 * 判断用户名是否存在 
 */
export const usernameIsSave = params => axios.get('/usernameIsSave', { params: params })
/**
 * 用户注册
 */
export const userRegister = params => axios.post('/register', params)