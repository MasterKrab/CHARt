// Code created using https://www.magicpattern.design/tools/css-backgrounds

const createRectanglesPatterns = ({
	frontColor = '#d5d5d5',
	backColor = '#e5e5f7',
}) => ({
	backgroundColor: frontColor,
	backgroundImage: ` repeating-linear-gradient(45deg, ${frontColor} 25%, transparent 25%, transparent 75%, ${frontColor} 75%, ${frontColor}), repeating-linear-gradient(45deg, ${frontColor} 25%, ${backColor} 25%, ${backColor} 75%, ${frontColor} 75%, ${frontColor})`,
	backgroundPosition: '0 0, 10px 10px',
	backgroundSize: '20px 20px',
})

export default createRectanglesPatterns
