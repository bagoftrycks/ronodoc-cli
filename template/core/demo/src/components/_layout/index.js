import React from 'react';

import Hodor from '../hodor';
import Markdownothor from '../markdownothor';
import PropTypesDescripthor from '../proptypes-descripthor';

import {parse} from 'react-docgen';

/**
 * # Layout
 *
 * This component is used to render a classic page.
 * Each pages extend this component `<Layout>`.
 */
class Layout extends React.Component {

  renderTitle(title) {
    return (
      <div>
        <h2 style={{
          fontWeight: '500',
          fontSize: '24px',
          borderBottom: '1px solid #ccc',
          paddingBottom: '20px',
        }}
        >{title}</h2>
      </div>
    );
  }

  renderDescriptionFromMarkdownDoc(Source) {
    return (
      <Markdownothor text={parse(Source).description} />
    );
  }

  renderHodorContent(ExampleSource, Example, title) {
    return (
      <Hodor
          title={title}
          code={ExampleSource}
      >
        {Example}
      </Hodor>
    );
  }

  renderProps(Source) {
    return (
      <PropTypesDescripthor code={Source} />
    );
  }

  renderSource(Source) {
    return (
      <Markdownothor text={`\`\`\`js\n${Source}\n\`\`\``} />
    );
  }
}

export default Layout;
