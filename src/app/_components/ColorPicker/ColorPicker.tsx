import { Sketch } from '@uiw/react-color'
import { useRef } from 'react'

import useClickOutside from '@/hooks/useClickOutside'

interface ColorPickerProps {
	color: string
	onClickOutside?: CallableFunction
	onChangeColor: (color: string) => void
}

const ColorPicker = ({
	color,
	onClickOutside,
	onChangeColor,
}: ColorPickerProps) => {
	const ref = useRef(null)

	useClickOutside(ref, onClickOutside || (() => {}), !onClickOutside)

	return (
		<Sketch
			ref={ref}
			color={color}
			onChange={({ hex }) => onChangeColor(hex)}
		/>
	)
}

export default ColorPicker
