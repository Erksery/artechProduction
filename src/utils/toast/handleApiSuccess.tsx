import { toast } from 'sonner'

import { Description } from '../../components/ui/toast/Description'

export const handleApiSuccess = (
  message: any,
  context?: string,
  isText?: boolean
) => {
  const status = message?.status || 'Успешно'
  const successMessage =
    message?.data?.message ||
    message?.message ||
    (isText && message) ||
    'Запрос успешно выполнен'

  toast(`${status}: ${context}`, {
    description: <Description>{successMessage}</Description>,
    icon: '✅',
    duration: 3000,
    style: {
      background: '#1f222b',
      color: '#d3d3d3',
      borderColor: 'rgba(86, 87, 97, 0.329)'
    }
  })
}
