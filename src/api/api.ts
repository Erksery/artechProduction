import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true
})

let isRefreshing = false
let refreshSubscribers: (() => void)[] = []

const onRefreshed = () => {
  refreshSubscribers.forEach(callback => callback())
  refreshSubscribers = []
}

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config

    if (
      error.response.status === 401 &&
      // error.response.status === 403 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true

      if (isRefreshing) {
        return new Promise(resolve => {
          refreshSubscribers.push(() => {
            resolve(api(originalRequest))
          })
        })
      }

      isRefreshing = true

      try {
        const refreshToken = localStorage.getItem('refreshToken')

        if (!refreshToken) {
          console.error('Refresh token отсутствует в localStorage')
          return Promise.reject(new Error('Refresh token отсутствует'))
        }

        await api.post(
          '/auth/refresh',
          {},
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`
            }
          }
        )

        isRefreshing = false
        onRefreshed()

        return api(originalRequest)
      } catch (refreshError) {
        isRefreshing = false

        localStorage.removeItem('refreshToken')

        window.location.href = '/sign'
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export default api
