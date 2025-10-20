'use client'

import { api } from '@/trpc/react'
import { Dotting, useBrush, useData, useDotting } from 'dotting'
import type { BrushTool, DottingRef, PixelModifyItem } from 'dotting'
import { nanoid } from 'nanoid'
import { useEffect, useRef, useState, type MouseEventHandler } from 'react'
import ColorPicker from '@/app/_components/ColorPicker/ColorPicker'
import { toast } from 'react-hot-toast'

import {
	StyledButtonTool,
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

		const promise = updateProjectMutation.mutateAsync({
			id,
			data: dataArray as unknown as PixelModifyItem[][],
		})

		toast.promise(promise, {
			loading: 'Guardando...',
			success: <strong>Guardado</strong>,
			error: <strong>Error guardando</strong>,
		})

		await promise
	}

	const handleToggleColorPicker: MouseEventHandler = (event) => {
		event.stopPropagation()
		setIsOpenColorPicker(!isOpenColorPicker)
	}

	const handleCloseColorPicker = () => {
		setIsOpenColorPicker(!isOpenColorPicker)
	}

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
					gridStrokeColor="rgba(0, 0, 0, 0.1)"
				/>
				{/* biome-ignore lint/a11y/useSemanticElements: <explanation> */}
				<StyledToolsContainer role="listbox" aria-label="Herramientas">
					{Object.entries(TOOLS_IMAGES).map(([tool, Icon]) => (
						<StyledButtonTool
							key={`editor-tool-${nanoid()}`}
							// biome-ignore lint/a11y/useSemanticElements: <explanation>
							role="option"
							aria-selected={tool === brushTool}
							$isSelected={tool === brushTool}
							onClick={() => changeBrushTool(tool as BrushTool)}
						>
							<Icon width={15} height={15} />
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
						<ColorPicker
							color={brushColor}
							onChangeColor={(hex) => changeBrushColor(hex)}
							onClickOutside={handleCloseColorPicker}
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
