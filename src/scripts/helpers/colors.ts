/**
 * Returns the color for the "trophy" icon for 1st, 2nd and 3rd place.
 * 1st place = index 0
 * 2nd place = index 1
 * 3rd place = index 2
 * @param index 
 * @returns a CSS color value
 */
export const rankToColor = (index: number): string => {
    if (index === 0) {
      return "#b8860b";
    }
    if (index === 1) {
      return "lightslategray";
    }
    return "#664620";
  };
  