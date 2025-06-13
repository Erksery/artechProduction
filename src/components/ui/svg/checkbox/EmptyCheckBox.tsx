import { SVGProps } from 'react'
import { JSX } from 'react/jsx-runtime'

export const EmptyCheckBox = (
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className='svg-inline--fa fa-square aaf_hi'
    data-icon='square'
    data-prefix='far'
    viewBox='0 0 448 512'
    {...props}>
    <path
      fill='currentColor'
      d='M384 80c8.8 0 16 7.2 16 16v320c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V96c0-8.8 7.2-16 16-16h320zM64 32C28.7 32 0 60.7 0 96v320c0 35.3 28.7 64 64 64h320c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64z'
    />
  </svg>
)
