export const getContrastColor = (basedOnColor: string, lightColor: string, darkColor: string) => {
  const color = (basedOnColor.charAt(0) === '#') ? basedOnColor.substring(1, 7) : basedOnColor;
  const red = parseInt(color.substring(0, 2), 16);
  const green = parseInt(color.substring(2, 4), 16); 
  const blue = parseInt(color.substring(4, 6), 16); 
  const uicolors = [red / 255, green / 255, blue / 255];

  const c = uicolors.map((col) => {
    if (col <= 0.03928) {
      return col / 12.92;
    }
    return Math.pow((col + 0.055) / 1.055, 2.4);
  });
  const L = (0.2126 * c[0]) + (0.7152 * c[1]) + (0.0722 * c[2]);
  return (L > 0.179) ? darkColor : lightColor;
}