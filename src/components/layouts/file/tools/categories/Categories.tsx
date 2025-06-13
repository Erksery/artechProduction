import { JSX } from 'react'

import { JpgSvg } from '@components/ui/svg/mimeTypes/JpgSvg'
import { Mp3Svg } from '@components/ui/svg/mimeTypes/Mp3Svg'
import { Mp4Svg } from '@components/ui/svg/mimeTypes/Mp4Svg'

import { DocSvg } from '../../../../ui/svg/mimeTypes/DocSvg'
import { UnknownSvg } from '../../../../ui/svg/mimeTypes/UnknownSvg'

export interface FileCategoriesTypes {
  id: number
  value: string
  title: string
  icon: JSX.Element
}

export const fileCategories = [
  { id: 1, value: '', title: 'Все', icon: <UnknownSvg /> },
  { id: 2, value: 'image', title: 'Картинки', icon: <JpgSvg /> },
  { id: 3, value: 'application', title: 'Документы', icon: <DocSvg /> },
  { id: 4, value: 'audio', title: 'Аудио', icon: <Mp3Svg /> },
  { id: 5, value: 'video', title: 'Видео', icon: <Mp4Svg /> }
]
