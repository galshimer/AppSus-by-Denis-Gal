
const { useState } = React

export function ColorPalette({ onChangeBgColor }) {
  const colors = [
    { color: '#FFFFFF', colorName: 'White' },
    { color: '#faafa8', colorName: 'Coral' },
    { color: '#f39f76', colorName: 'Peach' },
    { color: '#fff8b8', colorName: 'Sand' },
    { color: '#e2f6d3', colorName: 'Mint' },
    { color: '#b2dfdb', colorName: 'Sage' },
    { color: '#d4e4ed', colorName: 'Fog' },
    { color: '#aeccdc', colorName: 'Storm' },
    { color: '#d3bfdb', colorName: 'Dusk' },
    { color: '#f6e2dd', colorName: 'Blossom' },
    { color: '#e9e3d4', colorName: 'Clay' },
    { color: '#e5e5e5', colorName: 'Chaik' }
  ]
  const [pickedColor, setPickedColor] = useState(null)

  function onColorPickerClick(ev, color) {
    ev.stopPropagation()
    if (!color) return
    setPickedColor(color)
    onChangeBgColor(color)
  }

  return (
    <div className="color-palette">
      {colors.map(({color,colorName}) => (
        <div
          key={color}
          title={colorName}
          className={`color-option ${pickedColor === color ? 'selected' : ''}`}
          style={{ backgroundColor: color }}
          onClick={(ev) => onColorPickerClick(ev, color)}
        ></div>
      ))}
    </div>
  )
}
