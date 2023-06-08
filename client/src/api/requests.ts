import axios, { AxiosError } from 'axios'
import { getAccessToken, removeAccessToken } from 'utils/storage'

export const baseURL = ''

export const request = axios.create({
	baseURL,
	headers: {
		'Content-Type': 'application/json',
	},
})

// intercepts private requests and add token to header
request.interceptors.request.use(
	async config => {
		const token = getAccessToken()
		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}

		return config
	},
	error => Promise.reject(error)
)

// intercepts private response and check if token has expired
request.interceptors.response.use(
	response => {
		return response
	},
	error => {
		if (error instanceof AxiosError) {
			if (error.response?.status === 401) {
				removeAccessToken()
				// window.location.pathname = '/login'
			}

			throw error
		}
	}
)
