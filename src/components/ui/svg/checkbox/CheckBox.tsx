import { SVGProps } from "react";
import { JSX } from "react/jsx-runtime";

export const CheckBox = (
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="svg-inline--fa fa-square-check aaf_hi"
    data-icon="square-check"
    data-prefix="fas"
    viewBox="0 0 448 512"
    {...props}
  >
    <path
      fill="currentColor"
      d="M64 32C28.7 32 0 60.7 0 96v320c0 35.3 28.7 64 64 64h320c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm273 177L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"
    />
  </svg>
);
