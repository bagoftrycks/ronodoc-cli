import React from 'react';

import {parse} from 'react-docgen';

import Markdownothor from '../markdownothor';

import {
  blue400,
  red400,
} from 'material-ui/styles/colors';

/**
 * # PropTypesDescripthor
 *
 * Component that displays a table of properties
 * description for a component passed from the prop.
 */
class PropTypesDescripthor extends React.PureComponent {

  static propTypes = {
    /**
     * Title of the markdown table.
     */
    header: React.PropTypes.string,

    /**
     * String code (raw) from a component source code.
     */
    code: React.PropTypes.string.isRequired,
  };

  static get defaultProps() {
    return {
      header: '### Properties',
    };
  }

  render() {
    const {
      header,
      code,
    } = this.props;

    const _data = parse(code);

    let _table_props = `${header}
| Name | Type | Default | Description |
|:-----|:-----|:-----|:-----|\n`;

    for (let key in _data.props) {
      if (!Object.prototype.hasOwnProperty.call(_data.props, key)) {
        continue;
      }

      const _prop = _data.props[key];

      const _name = key;
      const _type = _prop.type.name;
      const _default = (_prop.defaultValue && _prop.defaultValue.value) ?
        _prop.defaultValue.value : null;
      const _description = _prop.description;

      const _indexOfShit = _description.indexOf('\`\`\`');

      let _desc_part_1 = '';
      let _desc_part_2 = '';

      if (_indexOfShit === -1) {
        _desc_part_1 = _description.replace(/\n/gi, '<br />');
      } else {
        _desc_part_1 = _description
          .substring(0, _indexOfShit)
          .replace(/\n/gi, '<br />');

        _desc_part_2 = _description
          .substring(_indexOfShit)
          .split('\n')
          .filter((s) => s !== '' && s !== '\`\`\`')
          .map((s) => `\`${s}\``)
          .join('<br />');
      }

      /* eslint-disable max-len */
      _table_props += `| <span style="color: ${blue400}">${_name}</span> | <span style="color: ${red400}">${_type}</span> | ${_default} | ${_desc_part_1}<br />${_desc_part_2} |\n`;
      /* eslint-enable */
    }

    return (
      <Markdownothor text={_table_props} />
    );
  }
}

export default PropTypesDescripthor;
