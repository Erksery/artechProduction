import { AxiosResponse } from 'axios'
import { toast } from 'sonner'

export const handleApiSuccess = (
  response: AxiosResponse<{ message: string }>
) => {
  const message = response?.data?.message || 'Запрос успешно выполнен'

  toast(`${message}`, {
    icon: '✅',
    duration: 5000,
    style: {
      background: '#1f222b',
      color: '#d3d3d3',
      borderColor: 'rgba(86, 87, 97, 0.329)'
    }
  })
}
