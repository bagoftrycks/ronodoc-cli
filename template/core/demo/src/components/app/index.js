import React from 'react';

import {
  hashHistory,
} from 'react-router';

import {join} from 'path';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import DocumentTitle from 'react-document-title';

import appPackage from '../../../../package.json';
import AppTheme from './theme';
import AppBarCustom from './AppBarCustom';
import SideNavCustom from './SideNavCustom';

import './main.css';

const interrogate = function interrogate(routes, parentPath) {
  let result = [];

  routes.forEach((route) => {
    const _route = {...route};

    let path = _route.path;

    if (path) {
      path = parentPath ? join(parentPath, path) : path;

      if (path !== '/') {
        result.push({
          path: _route.path,
          url: path,
        });
      }
    }

    if (_route.childRoutes) {
      result = result.concat(interrogate(_route.childRoutes, path));
    }
  });

  return result;
};

/**
 * # App: The Main Component
 */
class App extends React.Component {

  static get propTypes() {
    return {
      children: React.PropTypes.element,
      location: React.PropTypes.object,
      routes: React.PropTypes.array,
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      drawerOpen: true,
      routes: interrogate(this.props.routes.filter((route) => {
        return route.path === '/';
      })),
    };

    this.handleTouchLeftIcon = this.handleTouchLeftIcon.bind(this);
    this.handleTouchLogo = this.handleTouchLogo.bind(this);
  }

  handleTouchLeftIcon() {
    this.setState({
      drawerOpen: !this.state.drawerOpen,
    });
  }

  handleMenuChange(event, value) {
    hashHistory.push(value);
  }

  handleTouchLogo() {
    hashHistory.push('/');
  }

  render() {
    const {
      children,
      location,
    } = this.props;

    const {
      drawerOpen,
      routes,
    } = this.state;

    const _style = {
      left: {
        paddingLeft: drawerOpen ? '256px' : '0px',
      },
      content: {
        margin: '100px 72px 60px',
      },
    };

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(AppTheme)}>
        <DocumentTitle title={appPackage.description}>
          <div>

            {/* --- AppBar --- */}
            <div style={_style.left}>
              <AppBarCustom
                  data={appPackage}
                  onTouchLeftIcon={this.handleTouchLeftIcon}
              />
            </div>

            {/* --- SideNav --- */}
            <SideNavCustom
                data={appPackage}
                isOpen={drawerOpen}
                routes={routes}
                location={location.pathname}
                onTouchLogo={this.handleTouchLogo}
                onMenuChange={this.handleMenuChange}
            />

            {/* --- Main Content --- */}
            <div style={Object.assign({}, _style.left, _style.content)}>
              {children}
            </div>
          </div>
        </DocumentTitle>
      </MuiThemeProvider>
    );
  }
}

export default App;
