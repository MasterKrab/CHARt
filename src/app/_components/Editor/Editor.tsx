'use client'

import { api } from '@/trpc/react'
import { Sketch } from '@uiw/react-color'
import { Dotting, useBrush, useData, useDotting } from 'dotting'
import type { BrushTool, DottingRef, PixelModifyItem } from 'dotting'
import { nanoid } from 'nanoid'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

import {
	StyledButtonTool,
	StyledButtonToolSpan,
	StyledColorButton,
	StyledColorPickerContainer,
	StyledEditorContainer,
	StyledToolsContainer,
	StyledSaveButton,
} from './styles'
import { TOOLS_IMAGES } from './tools'

import SaveIcon from '@/assets/icons/save.svg'

const Editor = ({
	id,
	initialData = [[]],
}: {
	id: string
	initialData?: PixelModifyItem[][]
}) => {
	const ref = useRef<DottingRef>(null)

	const [isSaved, setIsSaved] = useState(true)
	const [isSaving, setIsSaving] = useState(false)
	const [isOpenColorPicker, setIsOpenColorPicker] = useState(false)

	const { dataArray } = useData(ref)
	const { setData } = useDotting(ref)
	const { changeBrushColor, changeBrushTool, brushTool, brushColor } =
		useBrush(ref)

	const updateProjectMutation = api.project.update.useMutation()

	useEffect(() => {
		setIsSaved(false)
	}, [dataArray])

	useEffect(() => {
		if (!ref.current) return
		setData(initialData)
	}, [ref.current, initialData])

	const handleSave = async () => {
		setIsSaving(true)
		await updateProjectMutation.mutateAsync({
			id,
			data: dataArray as unknown as PixelModifyItem[][],
		})
		setTimeout(() => {
			setIsSaving(false)
			setIsSaved(true)
		}, 2000)
	}

	const handleToggleColorPicker = () => setIsOpenColorPicker(!isOpenColorPicker)

	return (
		<>
			<StyledEditorContainer>
				<Dotting
					ref={ref}
					width="100%"
					height="100%"
					style={{
						border: 'none',
					}}
					backgroundColor="white"
					brushColor="#000"
					gridStrokeColor="rgba(0, 0, 0, 0.1)"
				/>
				<StyledToolsContainer role="listbox" aria-label="Herramientas">
					{Object.entries(TOOLS_IMAGES).map(([tool, image]) => (
						<StyledButtonTool
							key={`editor-tool-${nanoid()}`}
							role="option"
							aria-selected={tool === brushTool}
							onClick={() => changeBrushTool(tool as BrushTool)}
						>
							<StyledButtonToolSpan>
								<Image src={image} alt={tool} fill={true} />
							</StyledButtonToolSpan>
						</StyledButtonTool>
					))}
				</StyledToolsContainer>

				<StyledColorButton
					role="switch"
					aria-checked={isOpenColorPicker}
					color={brushColor}
					type="button"
					onClick={handleToggleColorPicker}
					aria-label={brushColor}
				/>

				{isOpenColorPicker && (
					<StyledColorPickerContainer>
						<Sketch
							color={brushColor}
							onChange={({ hex }) => changeBrushColor(hex)}
						/>
					</StyledColorPickerContainer>
				)}

				<StyledSaveButton
					onClick={handleSave}
					disabled={isSaved}
					$animate={`${isSaving || isSaved}`}
				>
					<SaveIcon width="100%" height="100%" />
				</StyledSaveButton>
			</StyledEditorContainer>

			{/* <style jsx>{`
        .editor{
          height: 100%;
          overflow-x: hidden;
          position: relative;
        }

        .tools{
          position: absolute;
          bottom: 0.5rem;
          right: 0.5rem;
        }

        @media screen and (min-width: 50rem) {
          .bar{
          }
        }

        .button-color{
          position: absolute;
          left: 0.5rem;
          bottom: 0.5rem;
          width: 2rem;
          height: 2rem;
          background-color: ${brushColor};
          border: 0.25rem solid white;
          box-shadow: 0 0 1rem rgba(0, 0, 0, 0.25);
        }

        .color-picker {
          position: absolute;
          bottom: 3.5rem;
          left: 0.5rem;
        }
      `}</style> */}
		</>
	)
}

export default Editor
