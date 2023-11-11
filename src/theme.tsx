import { ThemeType } from "grommet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faHeart,
  faStar,
  faSquare,
  faCertificate,
  faTimes,
  faCoffee,
  faCube,
} from "@fortawesome/free-solid-svg-icons";

export const grommetTheme: ThemeType = {
  global: {
    font: {
      family: "Sans-Serif",
    },
    colors: {
      brand: "#1a73d9",
      focus: "#1356a3",
      selected: "#1356a3",
      "status-ok": "#34A86E",
      "status-critical": "#de3354",
    },
  },
  button: {
    default: {
      background: {
        color: "brand",
      },
      border: {
        radius: "2em",
      },
      padding: {
        horizontal: "1.2em",
        vertical: "0.3em",
      },
    },
    primary: {
      background: {
        color: "brand",
      },
      border: {
        radius: "2em",
      },
      padding: {
        horizontal: "1.2em",
        vertical: "0.3em",
      },
    },
    hover: {
      primary: {
        background: {
          color: "#1356a3",
        },
      },
    },
  },
};

export const questionColors = [
  "#DA4453",
  "#FFCE54",
  "#4FC1E9",
  "#A0D468",
  "#37BC9B",
  "#D770AD",
  "#967ADC",
  "#AAB2BD",
];

export const questionIcons = [
  <FontAwesomeIcon icon={faCircle} />,
  <FontAwesomeIcon icon={faHeart} />,
  <FontAwesomeIcon icon={faStar} />,
  <FontAwesomeIcon icon={faSquare} />,
  <FontAwesomeIcon icon={faCertificate} />,
  <FontAwesomeIcon icon={faTimes} />,
  <FontAwesomeIcon icon={faCoffee} />,
  <FontAwesomeIcon icon={faCube} />,
];

/**
 * Returns the color for the "trophy" icon for 1st, 2nd and 3rd place.
 * 1st place = index 0
 * 2nd place = index 1
 * 3rd place = index 2
 * @param index
 * @returns a CSS color value
 */
export const rankToColor = (index: number): string => {
  // gold
  if (index === 0) {
    return "#b8860b";
  }
  // silver
  if (index === 1) {
    return "lightslategray";
  }
  // bronze
  return "#664620";
};
