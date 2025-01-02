'use client'

import { PlacesType, Tooltip } from 'react-tooltip'
import { IconType } from "react-icons"
import clsx from "clsx"

interface IconWrapperProps {
  className?: string,
  disabled?: boolean,
  IconComponent: IconType,
  onClick?: () => void,
  size?: number,
  tooltip?: {
    triggerId: string,
    place?: PlacesType,
    text: string
  }
}

export default function IconWrapper({
  className,
  disabled = false,
  IconComponent,
  onClick,
  size = 20,
  tooltip
}: IconWrapperProps) {

  return (
    <>
      {(tooltip && !disabled) &&
        <Tooltip
          anchorSelect={`#${tooltip.triggerId}`}
          place={tooltip.place ?? 'bottom'}
        >
          {tooltip.text}
        </Tooltip>
      }
      <IconComponent
        {...!disabled && { onClick }}
        className={clsx(
          "focus:outline-none",
          disabled ? "opacity-30" : "hover:opacity-80 cursor-pointer",
          className
        )}
        size={size}
        {...tooltip && { id: tooltip.triggerId }}
      />
    </>
  )
}