import React from 'react';

import muiThemeable from 'material-ui/styles/muiThemeable';

import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import {
  List,
  ListItem,
  makeSelectable,
} from 'material-ui/List';

const SelectableList = makeSelectable(List);

/**
 * # SideNavCustom
 *
 * Component that displays a `<SideNavCustom>`.
 * items are dynamic, they are send through `data` prop.
 *
 * This component is **MUI Themeable**
 */
class SideNavCustom extends React.Component {

  static get propTypes() {
    return {
      data: React.PropTypes.object,
      routes: React.PropTypes.array,
      isOpen: React.PropTypes.bool,
      location: React.PropTypes.string,
      muiTheme: React.PropTypes.object,
      onTouchLogo: React.PropTypes.func,
      onMenuChange: React.PropTypes.func,
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
      routes,
      isOpen,
      location,
      muiTheme,
      onTouchLogo,
      onMenuChange,
    } = this.props;

    const _style = {
      backgroundColor: muiTheme.palette.primary1Color,
      color: muiTheme.palette.canvasColor,
      margin: '0px auto',
      textAlign: 'center',
      width: '100%',
      padding: '30px 0px',
      fontWeight: '700',
      fontSize: '18px',
      cursor: 'pointer',
    };

    return (
      <Drawer
          open={isOpen}
          docked
      >
        {/* --- Logo --- */}
        <div
            style={_style}
            onTouchTap={onTouchLogo}
        >
          <div>{data.name.toUpperCase()}</div>
          <div>{data.version}</div>
        </div>

        <Divider />

        {/* --- Dynamic menu items --- */}
        <SelectableList
            value={location}
            onChange={onMenuChange}
        >
          <Subheader>{'Components'}</Subheader>

          {routes.map((route, index) => {
            return (
              <ListItem
                  key={index}
                  primaryText={route.path}
                  value={route.url}
              />
            );
          })}
        </SelectableList>
      </Drawer>
    );
  }
}

export default muiThemeable()(SideNavCustom);
