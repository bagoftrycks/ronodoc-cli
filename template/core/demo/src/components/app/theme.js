import {
  grey100, grey300, grey500, grey900,
  white, darkBlack, fullBlack,
  blueGrey900,
  brown900,
} from 'material-ui/styles/colors';

import {
  fade,
} from 'material-ui/utils/colorManipulator';

/*
 *  Light Theme is the default theme used in material-ui. It is guaranteed to
 *  have all theme variables needed for every component. Variables not defined
 *  in a custom theme will default to these values.
 */

export default {
  spacing: {
    iconSize: 24,
    desktopGutter: 24,
    desktopGutterMore: 32,
    desktopGutterLess: 16,
    desktopGutterMini: 8,
    desktopKeylineIncrement: 64,
    desktopDropDownMenuItemHeight: 32,
    desktopDropDownMenuFontSize: 15,
    desktopDrawerMenuItemHeight: 48,
    desktopSubheaderHeight: 48,
    desktopToolbarHeight: 50,
  },
  palette: {
    primary1Color: grey900,
    primary2Color: blueGrey900,
    primary3Color: brown900,
    accent1Color: grey900,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: darkBlack,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: grey900,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack,
  },
  toolbar: {
    height: 50,
  },
  appBar: {
    color: darkBlack,
  },
};
