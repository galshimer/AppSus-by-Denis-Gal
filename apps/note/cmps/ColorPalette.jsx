
const { useState } = React

export function ColorPalette({ onChangeBgColor }) {
  const colors = [
    '#FFFFFF', // White
    '#faafa8', // Coral
    '#f39f76', // Peach
    '#fff8b8', // Sand
    '#e2f6d3', // Mint
    '#b2dfdb', // Sage
    '#d4e4ed', // Fog
    '#aeccdc', // Storm
    '#d3bfdb', // Dusk
    '#f6e2dd', //Blossom
    '#e9e3d4', // Clay
    '#e5e5e5'  //Chaik
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
      {colors.map(color => (
        <div
          key={color}
          className={`color-option ${pickedColor === color ? 'selected' : ''}`}
          style={{ backgroundColor: color }}
          onClick={(ev) => onColorPickerClick(ev, color)} // Fixed
        ></div>
      ))}
    </div>
  )
}
