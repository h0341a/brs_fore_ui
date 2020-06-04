import axios from './axios'


/**
 * 获取首页数据
 */
export const getHomeBooks = params => axios.get('/books', { params: params })
export const getHomeRecommends = params => axios.get('/recommends', { params: params })
export const isStar = params => axios.get('/user/isStar', { params: params })
export const isCollection = params => axios.get('/user/isCollection', { params: params })
export const cancelCollection = params => axios.delete('/user/collection', { params: params })
export const addCollection = params => axios.post('/user/collection', params)
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
export const userLogout = () => axios.get('/logout')
/**
 * 获取用户头像
 */
export const getUserAvatarUrl = () => axios.get('/user/avatarUrl')
/**
 * 获取用户的收藏
 */
export const getUserCollection = () => axios.get('/user/collect')
/**
 * 获取用户的推荐
 */
export const getUserRecommends = () => axios.get('/user/recommends')
/**
 * 上传用户的推荐
 */
export const uploadUserRecommend = params => axios.post('/user/recommend', params)