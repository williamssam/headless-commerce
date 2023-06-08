import Cookies from 'js-cookie'

export const setAccessToken = (token: string) => Cookies.set('wustomers', token)
export const getAccessToken = () => Cookies.get('wustomers')
export const removeAccessToken = () => Cookies.remove('wustomers')
