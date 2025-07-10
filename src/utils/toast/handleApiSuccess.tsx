import { toast } from 'sonner'

export const handleApiSuccess = (response?: string) => {
  toast(`${response}`, {
    icon: '✅',
    duration: 5000,
    style: {
      background: '#1f222b',
      color: '#d3d3d3',
      borderColor: 'rgba(86, 87, 97, 0.329)'
    }
  })
}
