import React from 'react';

import AppBar from 'material-ui/AppBar';

/**
 * # AppBarCustom
 *
 * Component that displays an `AppBar`
 */
class AppBarCustom extends React.Component {

  static get propTypes() {
    return {
      data: React.PropTypes.object,
      onTouchLeftIcon: React.PropTypes.func,
    };
  }

  static get defaultProps() {
    return {
      data: {},
    };
  }

  render() {
    const {
      data,
      onTouchLeftIcon,
    } = this.props;

    const _style = {
      position: 'fixed',
      width: '100%',
      top: '0px',
    };

    return (
      <AppBar
          title={data.description}
          style={_style}
          onLeftIconButtonTouchTap={onTouchLeftIcon}
      />
    );
  }
}

export default AppBarCustom;
