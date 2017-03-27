import React from 'react';

import marked from 'marked';
import hljs from 'highlight.js';

require('./style.css');

const _STYLE = {
  root: {
    marginTop: 20,
    marginBottom: 20,
    padding: '0 10px',
  },
};

/**
 * @see https://github.com/chjj/marked/pull/418
 * Fucking hack as they not merge this pull
 */
const MarkedRenderer = new marked.Renderer();
MarkedRenderer.code = (code, lang) => {
  /* eslint-disable max-len */
  return `<pre class="hljs"><code class="lang-${lang}">${hljs.highlight(lang, code).value}</code></pre>`;
  /* eslint-enable */
};

/**
 * # Markdownothor
 *
 * Component that transform string into a markdown using `marked` parser.
 */
class Markdownothor extends React.Component {

  static propTypes = {
    /**
     * Style the root element
     */
    style: React.PropTypes.object,

    /**
     * Text to format
     */
    text: React.PropTypes.string.isRequired,
  };

  static get defaultProps() {
    return {
      text: '',
    };
  }

  componentWillMount() {
    marked.setOptions({
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      highlight: function (code, lang) {
        return require('highlight.js').highlight(lang, code).value;
      },
    });
  }

  render() {
    const {
      style,
      text,
    } = this.props;

    /* eslint-disable react/no-danger */
    return (
      <div
          style={{..._STYLE.root, style}}
          className="markdown-body"
          dangerouslySetInnerHTML={{
            __html: marked(text, {
              renderer: MarkedRenderer,
            }),
          }}
      />
    );
    /* eslint-enable */
  }
}

export default Markdownothor;
