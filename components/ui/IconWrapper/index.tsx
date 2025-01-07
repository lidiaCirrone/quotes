'use client'

import clsx from "clsx"
import { IconType } from "react-icons"
import { PlacesType, Tooltip } from 'react-tooltip'

interface IconWrapperProps {
  className?: string,
  disabled?: boolean,
  IconComponent: IconType,
  mobileLabel?: boolean,
  onClick?: () => void,
  size?: number,
  tooltip?: {
    triggerId: string,
    place?: PlacesType,
    text: string
  }
  wrapperClassName?: string,
  dataCy?: string
}

export default function IconWrapper({
  className,
  disabled = false,
  IconComponent,
  mobileLabel = false,
  onClick,
  size = 20,
  tooltip,
  wrapperClassName,
  dataCy
}: IconWrapperProps) {

  return (
    <div
      className={clsx(
        wrapperClassName,
        disabled ? "opacity-30" : "hover:opacity-80 cursor-pointer"
      )}
      {...(!disabled && onClick) && { onClick }}
      {...tooltip && { id: tooltip.triggerId }}
      {...dataCy && { "data-cy": dataCy }}
    >
      {(tooltip && !disabled) &&
        <Tooltip
          anchorSelect={`#${tooltip.triggerId}`}
          className="hidden sm:flex"
          place={tooltip.place ?? 'bottom'}
        >
          {tooltip.text}
        </Tooltip>
      }
      <IconComponent
        className={clsx(
          "focus:outline-none",
          className
        )}
        size={size}
      />
      {mobileLabel && <span className="sm:hidden">{tooltip?.text ?? ""}</span>}
    </div>
  )
}