import { IIconProps } from '@/shared/types'

export const TrendingIcon = ({
	height = '32px',
	width = '32px',
	fill = 'none',
    stroke = '#292D32',
	className
}: IIconProps) => {
	return (
		<svg
			width={width}
			height={height}
			viewBox="0 0 24 24"
			fill={fill}
            className={className}
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M16.5 9.5L12.3 13.7L10.7 11.3L7.5 14.5"
				stroke={stroke}
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M14.5 9.5H16.5V11.5"
				stroke={stroke}
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
				stroke={stroke}
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	)
}
