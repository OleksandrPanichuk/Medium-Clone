import { IIconProps } from '@/shared/types'
import React from 'react'

export const SparkleIcon = ({
	height = '800px',
	width = '800px',
	fill = 'rgb(255, 192, 23)',
	className
}: IIconProps) => {
	return (
		<svg
			fill={fill}
			width={width}
			height={height}
			viewBox="0 0 256 256"
			id="Flat"
			className={className}
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d="M208.8584,144a15.85626,15.85626,0,0,1-10.46778,15.01367l-52.16015,19.2168-19.2168,52.16015a16.00075,16.00075,0,0,1-30.02734,0l-19.2168-52.16015-52.16015-19.2168a16.00075,16.00075,0,0,1,0-30.02734l52.16015-19.2168,19.2168-52.16015a16.00075,16.00075,0,0,1,30.02734,0l19.2168,52.16015,52.16015,19.2168A15.85626,15.85626,0,0,1,208.8584,144ZM152,48h16V64a8,8,0,0,0,16,0V48h16a8,8,0,0,0,0-16H184V16a8,8,0,0,0-16,0V32H152a8,8,0,0,0,0,16Zm88,32h-8V72a8,8,0,0,0-16,0v8h-8a8,8,0,0,0,0,16h8v8a8,8,0,0,0,16,0V96h8a8,8,0,0,0,0-16Z" />
		</svg>
	)
}
