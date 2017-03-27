import React from 'react';

import ClearFix from 'material-ui/internal/ClearFix';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import CodeIcon from 'material-ui/svg-icons/action/code';
import transitions from 'material-ui/styles/transitions';
import Divider from 'material-ui/Divider';
import {
  Toolbar,
  ToolbarGroup,
  ToolbarTitle,
} from 'material-ui/Toolbar';

import Markdownothor from '../markdownothor';

/**
 * # Hodor
 *
 * Component that displays a block container
 * with the `source code` and its preview
 * using `code` and `children` props.
 * Usually, these come from a component.
 */
class Hodor extends React.PureComponent {

  static propTypes = {
    /**
     * Title displayed in the `<Toolbar>`
     */
    title: React.PropTypes.string,

    /**
     * String of the code source to displayed.
     */
    code: React.PropTypes.string,

    /**
     * Element to displayed directly
     */
    children: React.PropTypes.element,

    /**
     * Open the door.
     * By default, **Hodor does not hold the door**.
     */
    open: React.PropTypes.bool,
  };

  static get defaultProps() {
    return {
      title: 'Example',
      code: '',
      open: true,
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      expand: this.props.open,
    };

    this.handleIconOnTouchTap = this.handleIconOnTouchTap.bind(this);
  }

  handleIconOnTouchTap() {
    this.setState({
      expand: !this.state.expand,
    });
  }

  render() {
    const {
      title,
      code,
      children,
    } = this.props;

    const {
      expand,
    } = this.state;

    const _style = {
      expand: {
        overflow: 'auto',
        maxHeight: expand ? '1400px' : '0px',
        transition: transitions.create(
          'max-height', '400ms', '0ms', 'ease-in-out'
        ),
      },
    };

    return (
      <Paper>
        <Toolbar>
          <ToolbarGroup>
            <ToolbarTitle text={title} />
          </ToolbarGroup>

          <ToolbarGroup>
            <IconButton
                tooltip={`${expand ? 'hide' : 'show'} me the code behind hodor`}
                onTouchTap={this.handleIconOnTouchTap}
            >
              <CodeIcon />
            </IconButton>
          </ToolbarGroup>
        </Toolbar>

        <div style={_style.expand}>
          <div style={{padding: '5px 30px 20px'}}>
            <h3>{'Code'}</h3>
            <Markdownothor
                style={{
                  padding: '0px',
                }}
                text={`\`\`\`js\n${code}\n\`\`\``}
            />
          </div>
          <Divider />
        </div>

        <ClearFix>
          <div style={{padding: '5px 30px 20px'}}>
            <h3>{'Preview'}</h3>
            {children}
          </div>
        </ClearFix>
      </Paper>
    );
  }
}

export default Hodor;
