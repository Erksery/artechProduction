export const useFormat = () => {
  const formatFileSize = (size: number): string => {
    const units = ['B', 'KB', 'MB', 'GB']
    let index = 0
    while (size >= 1024 && index < units.length - 1) {
      size /= 1024
      index++
    }
    return `${size.toFixed(2)} ${units[index]}`
  }

  const formatFileDate = (date: string): string => {
    const formatDate = new Date(date)

    const formatted = formatDate.toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
    return formatted
  }

  return { formatFileSize, formatFileDate }
}
