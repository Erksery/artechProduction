import { toast } from 'sonner'

export const handleApiError = (error: string) => {
  toast(`${error || 'Произошла ошибка'}`, {
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
