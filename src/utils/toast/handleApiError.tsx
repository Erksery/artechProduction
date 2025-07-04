import { AxiosError } from 'axios'
import { toast } from 'sonner'

export const handleApiError = (error: AxiosError<{ message: string }>) => {
  const message =
    error?.response?.data?.message || error?.message || 'Произошла ошибка'

  toast(`${message}`, {
    icon: '❌',
    duration: 5000,
    style: {
      background: '#1f222b',
      color: '#d3d3d3',
      borderColor: 'rgba(86, 87, 97, 0.329)'
    }
  })

  console.error(error)
}
