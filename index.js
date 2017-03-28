#! /usr/bin/env node

import Log from 'log';
import path from 'path';
import fs from 'fs-extra';
import program from 'commander';
import validate from 'validate-npm-package-name';
import spawn from 'cross-spawn';
import mustache from 'mustache';

const __log = new Log('debug');
const pkg = require('../package.json');

const _swith_action = (_action) => {
  const choices = {
    'create': _action_create,
  };

  return choices[_action] || (() => {
    program.help();
  });
};

const _pre_run = (path_root, name, path_origin) => {
  const _template_core = 'template/core';
  const _project_pkg = require(path.join(
    path_root, 'package.json'
  ));

  const _classic_files = [
    '.eslintrc',
    '.gitattributes',
    '.nvmrc',
  ];

  __log.info('Change to package folder');

  process.chdir(path_root);

  __log.info('Copy template files');

  fs.readdirSync(path.join(path_origin, _template_core)).forEach((file) => {
    fs.copySync(
      path.join(path_origin, `${_template_core}/${file}`),
      path.join(path_root, `${file}`)
    );
  });

  __log.info('Update package.json');

  _project_pkg.main = 'lib/index.js';
  _project_pkg.description = `${name} showcase`;

  /* eslint-disable max-len */
  _project_pkg.scripts = {
    'test': 'jest',
    'demo:run': 'NODE_ENV=development node ./demo/webpack.server.js',
    'demo:build': 'NODE_ENV=production ./node_modules/.bin/webpack -p --config ./demo/webpack.config.prod.js',
    'lib:build': 'babel src -d lib --presets es2015,stage-1 --copy-files',
    'build': 'npm run lib:build && npm run demo:build',
    'start': 'npm run demo:run',
  };
  /* eslint-enable */

  _project_pkg.devDependencies = {
    'babel-cli': '^6.16.0',
    'babel-core': '^6.17.0',
    'babel-jest': '^16.0.0',
    'babel-loader': '^6.2.5',
    'babel-plugin-react-transform': '^2.0.2',
    'babel-polyfill': '^6.16.0',
    'babel-eslint': '^7.0.0',
    'babel-preset-es2015': '^6.18.0',
    'babel-preset-react': '^6.16.0',
    'babel-preset-stage-1': '^6.16.0',
    'chalk': '^1.1.3',
    'classnames': '^2.2.5',
    'clean-webpack-plugin': '^0.1.13',
    'cowsay': '^1.1.8',
    'css-loader': '^0.25.0',
    'doctrine': '^1.5.0',
    'enzyme': '^2.5.1',
    'eslint': '^3.18.0',
    'eslint-config-google': '^0.7.1',
    'eslint-plugin-react': '^6.4.1',
    'file-loader': '^0.9.0',
    'gitbook-cli': '^2.3.0',
    'highlight.js': '^9.7.0',
    'html-loader': '^0.4.4',
    'html-webpack-plugin': '^2.22.0',
    'ip': '^1.1.3',
    'jest': '^16.0.2',
    'json-loader': '^0.5.4',
    'jsxhint': '^0.15.1',
    'less': '^2.7.1',
    'less-loader': '^2.2.3',
    'marked': '^0.3.6',
    'nodemon': '^1.11.0',
    'opn-cli': '^3.1.0',
    'postcss-cssnext': '^2.8.0',
    'postcss-focus': '^1.0.0',
    'postcss-loader': '^1.0.0',
    'postcss-reporter': '^1.4.1',
    'raw-loader': '^0.5.1',
    'react-addons-test-utils': '^15.3.2',
    'react-docgen': '^2.12.1',
    'react-document-title': '^2.0.2',
    'react-router': '^2.8.1',
    'react-test-renderer': '^15.3.2',
    'react-transform-hmr': '^1.0.4',
    'rimraf': '^2.5.4',
    'style-loader': '^0.13.1',
    'url-loader': '^0.5.7',
    'webpack': '^1.13.2',
    'webpack-dashboard': 'git+ssh://git@github.com/bagoftrycks/webpack-dashboard.git',
    'webpack-dev-server': '^1.16.2',
    'webpack-load-plugins': '^0.1.2',
  };

  _project_pkg.dependencies = {
    'flexboxgrid': '^6.3.1',
    'material-ui': '^0.16.1',
    'react': '^15.3.2',
    'react-addons-shallow-compare': '^15.3.2',
    'react-dom': '^15.3.2',
    'react-flexbox-grid': '^0.10.2',
    'react-fontawesome': '^1.4.0',
    'react-tap-event-plugin': '^2.0.1',
    'underscore': '^1.8.3',
  };

  fs.writeFileSync(
    path.join(path_root, 'package.json'),
    JSON.stringify(_project_pkg, null, 2)
  );

  __log.info('Create .babelrc file');

  fs.writeFileSync(
    path.join(path_root, '.babelrc'),
    JSON.stringify({
      'presets': ['es2015', 'stage-1', 'react'],
      'env': {
        'development': {
          'plugins': [
            ['react-transform', {
              'transforms': [{
                'transform': 'react-transform-hmr',
                'imports': ['react'],
                'locals': ['module'],
              }],
            }],
          ],
        },
      },
    }, null, 2)
  );

  __log.info('Copy remained files');

  _classic_files.forEach((file) => {
    fs.copySync(
      path.join(path_origin, file),
      path.join(path_root, file)
    );
  });

  __log.info('Start run');

  _run();
};

const _run = () => {
  __log.info('Install packages');

  const _proc = spawn.sync('npm', ['install'], {
    stdio: 'inherit',
  });

  if (_proc.status !== 0) {
    __log.error('npm install failed');
    process.exit(1);
  }

  if (spawn.sync('npm', ['start'], {
    stdio: 'inherit',
  }).status !== 0) {
    __log.error('npm start failed');
    process.exit(1);
  }

  __log.info('Ronodoc Installation finished!');
};

const _check_name = (name) => {
  __log.info('Validate name');

  const _is_valid = validate(name);

  if (!_is_valid) {
    __log.error(`We cannot create the project ${name}. The name is invalid!`);
    process.exit(1);
  }

  return _is_valid;
};

const _create_pkg = (name, host, port) => {
  __log.info('Create package.json');

  const _path_root = path.resolve(name);
  const _pkg = {
    name: name,
    version: '0.1.0',
  };

  const _webpack_devserver = {
    name: name,
    host: host,
    port: port,
  };

  fs.ensureDirSync(name);
  fs.writeFileSync(
    path.join(_path_root, 'package.json'),
    JSON.stringify(_pkg, null, 2)
  );

  __log.info('Create webpack.config.json for WebpackDevServer');

  fs.writeFileSync(
    path.join(__dirname, '../template/core/demo/webpack.config.json'),
    JSON.stringify(_webpack_devserver, null, 2)
  );

  __log.info('Start pre-run');
  _pre_run(_path_root, name, path.join(__dirname, '../'));
};

const _create_component = (name, component) => {
  const _path_current = process.cwd();
  const _path_template = path.join(__dirname, '../template');

  const _data = {
    component: {
      name: component.charAt(0).toUpperCase() + component.slice(1),
      package: name.toLowerCase(),
    },
  };

  const _ex_src_index = path.join(
    _path_template, 'component/example_src/index.mst'
  );

  const _page_index = path.join(
    _path_template, 'component/example_page/index.mst'
  );

  const _page_example = path.join(
    _path_template, 'component/example_page/ExampleBase.mst'
  );

  /* eslint-disable max-len */
  const _line_import = `import _${component.toLowerCase()} from './${component.toLowerCase()}';`;
  const _line_export = `export const ${_data.component.name} = _${component.toLowerCase()};`;
  /* eslint-enable */

  _data.component.nameLowerCase = _data.component.name.toLowerCase();

  fs.readFile(_ex_src_index, (err, data) => {
    let _rendered;

    if (err) {
      return __log.error(err);
    }

    _rendered = mustache.render(data.toString(), _data);

    fs.ensureFileSync(
      path.join(_path_current, `src/${component.toLowerCase()}/index.js`)
    );

    fs.writeFileSync(
      path.join(_path_current, `src/${component.toLowerCase()}/index.js`),
      _rendered
    );
  });

  fs.readFile(_page_index, (err, data) => {
    let _rendered;

    if (err) {
      return __log.error(err);
    }

    _rendered = mustache.render(data.toString(), _data);

    fs.ensureFileSync(
      path.join(
        _path_current,
        `demo/src/pages/${component.toLowerCase()}/index.js`
      )
    );

    fs.writeFileSync(
      path.join(
        _path_current,
        `demo/src/pages/${component.toLowerCase()}/index.js`
      ),
      _rendered
    );
  });

  fs.readFile(_page_example, (err, data) => {
    let _rendered;

    if (err) {
      return __log.error(err);
    }

    _rendered = mustache.render(data.toString(), _data);

    fs.ensureFileSync(
      path.join(
        _path_current,
        `demo/src/pages/${component.toLowerCase()}/ExampleBase.js`
      )
    );

    fs.writeFileSync(
      path.join(
        _path_current,
        `demo/src/pages/${component.toLowerCase()}/ExampleBase.js`
      ),
      _rendered
    );
  });

  fs.ensureFileSync(path.join(_path_current, `src/index.js`));
  fs.readFile(path.join(_path_current, `src/index.js`), (err, data) => {
    if (err) {
      throw err;
    }

    const _lines = data.toString().split('\n');

    let _index_to_add_import;
    let _index_to_add_export;

    if (_lines.length === 1) {
      _lines.splice(0, 0, _line_import);
      _lines.splice(1, 0, _line_export);
    } else {
      for (let i = _lines.length - 1; i >= 0; i--) {
        if (_lines[i].search(/^import/gi) !== -1) {
          _index_to_add_import = i + 1;
          break;
        }
      }

      _lines.splice(_index_to_add_import, 0, _line_import);

      for (let i = _lines.length - 1; i >= 0; i--) {
        if (_lines[i].search(/^export/gi) !== -1) {
          _index_to_add_export = i + 1;
          break;
        }
      }

      _lines.splice(_index_to_add_export, 0, _line_export);
    }

    fs.writeFile(
      path.join(_path_current, `src/index.js`),
      _lines.join('\n'),
      (err) => {
        if (err) {
          throw err;
        }
      }
    );
  });
};

const _action_create = () => {
  const _app = program.app ? program.app : 'app';
  const _host = program.host ? program.host : 'localhost';
  const _port = program.port ? program.port : 3030;
  const _component = program.component;

  if (_component) {
    _create_component(_app, _component);
  } else {
    _check_name(_app);
    _create_pkg(_app, _host, _port);
  }
};

const _action = (_argument) => {
  _swith_action(_argument)();
};

program
  .version(pkg.version)
  .description('create new app to showcase your component')
  .option('-a, --app [app]', 'set name of the application')
  .option('-h, --host [host]', 'set webpack dev server hostname')
  .option('-p, --port [port]', 'set webpacl dev server port')
  .option('-c, --component [component]', 'set component name to create')
  .arguments('<create>')
  .action(_action)
  .parse(process.argv);

if (!process.argv.slice(2).length) {
  program.help();
}
