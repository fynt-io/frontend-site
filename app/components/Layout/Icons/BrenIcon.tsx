'use client';
import React from 'react';

export default function BrenIcon({
  icon = '',
  color = 'text-inherit',
  size = '30px',
  className = '',
  onClick = () => {},
  stroke = '0.01rem',
  dataTestId = '',
}: {
  icon: string;
  color?: string;
  size?: string;
  className?: string;
  onClick?: Function | any;
  stroke?: string | number;
  dataTestId?: string;
}) {
  return (
    <span
      onClick={onClick}
      className="flex justify-center align-center rounded-full w-auto h-auto"
      data-testid={dataTestId}
    >
      <i
        className={`${className} bren-icon icon-${icon} ${color} inline-flex  !w-[14px]`}
        style={{ fontSize: size, WebkitTextStroke: stroke }}
      ></i>
    </span>
  );
}
