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

const _indexOf = (array, search) => {
  let _index = -1;

  if (!array || !search) {
    return;
  }

  if (Object.prototype.toString.call(array) !== '[object Array]') {
    return;
  }

  if (search.constructor !== RegExp) {
    return;
  }

  for (let i = array.length - 1; i >= 0; i--) {
    if (array[i].search(search) !== -1) {
      _index = i;
      break;
    }
  }

  return _index;
};

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
  const _path_origin_template_core = path.join(path_origin, _template_core);
  const _path_root_pkg = path.join(path_root, 'package.json');
  const _pkg_file = require(_path_root_pkg);

  const _classic_files = [
    '.eslintrc',
    '.gitattributes',
    '.nvmrc',
  ];

  __log.info('Change to package folder');

  process.chdir(path_root);

  __log.info('Copy template files');

  fs.readdirSync(_path_origin_template_core).forEach((file) => {
    fs.copySync(
      path.join(_path_origin_template_core, file),
      path.join(path_root, file)
    );
  });

  __log.info('Update package.json');

  _pkg_file.main = 'lib/index.js';
  _pkg_file.description = `${name} showcase`;

  /* eslint-disable max-len */
  _pkg_file.scripts = {
    'test': 'jest',
    'demo:run': 'NODE_ENV=development node ./demo/webpack.server.js',
    'demo:build': 'NODE_ENV=production ./node_modules/.bin/webpack -p --config ./demo/webpack.config.prod.js',
    'lib:build': 'babel src -d lib --presets es2015,stage-1 --copy-files',
    'build': 'npm run lib:build && npm run demo:build',
    'start': 'npm run demo:run',
  };
  /* eslint-enable */

  _pkg_file.devDependencies = {
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

  _pkg_file.dependencies = {
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

  fs.writeFileSync(_path_root_pkg, JSON.stringify(_pkg_file, null, 2));

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

const _render_file = (source, path, obj) => {
  fs.readFile(source, (err, data) => {
    let _rendered;

    if (err) {
      return __log.error(err);
    }

    _rendered = mustache.render(data.toString(), obj);

    fs.ensureFileSync(path);
    fs.writeFileSync(path, _rendered);
  });
};

const _create_component = (module, component) => {
  const _path_root = process.cwd();
  const _path_root_src = path.join(_path_root, 'src');
  const _path_root_src_index = path.join(_path_root_src, 'index.js');
  const _path_root_demo_src = path.join(_path_root, 'demo/src');
  const _path_root_demo_src_main = path.join(_path_root, 'demo/src/main.js');
  const _path_tpl = path.join(__dirname, '../template');
  const _path_tpl_src = path.join(_path_tpl, 'component/example_src');
  const _path_tpl_page = path.join(_path_tpl, 'component/example_page');

  const _data = {
    component: {
      name: component.charAt(0).toUpperCase() + component.slice(1),
      package: module,
    },
  };

  const _ex_src_index = path.join(_path_tpl_src, 'index.mst');
  const _ex_page_index = path.join(_path_tpl_page, 'index.mst');
  const _ex_page_base = path.join(_path_tpl_page, 'ExampleBase.mst');

  const _line_import = `import _${component} from './${component}';`;
  const _line_export = `export const ${_data.component.name} = _${component};`;

  _render_file(
    _ex_src_index,
    path.join(_path_root_src, `${component}/index.js`),
    _data
  );

  _render_file(
    _ex_page_index,
    path.join(_path_root_demo_src, `pages/${component}/index.js`),
    _data
  );

  _render_file(
    _ex_page_base,
    path.join(_path_root_demo_src, `pages/${component}/ExampleBase.js`),
    _data
  );

  fs.ensureFileSync(_path_root_src_index);
  fs.readFile(_path_root_src_index, (err, data) => {
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
      _index_to_add_import = _indexOf(_lines, /^import/) + 1;
      if (_index_to_add_import !== -1) {
        _lines.splice(_index_to_add_import, 0, _line_import);
      }

      _index_to_add_export = _indexOf(_lines, /^export/) + 1;
      if (_index_to_add_export !== -1) {
        _lines.splice(_index_to_add_export, 0, _line_export);
      }
    }

    fs.writeFile(_path_root_src_index, _lines.join('\n'), (err) => {
      if (err) {
        throw err;
      }
    });
  });

  fs.readFile(_path_root_demo_src_main, (err, data) => {
    if (err) {
      throw err;
    }

    const _lines = data.toString().split('\n');

    let _index_ronodoc_end;
    let _index_ronodoc_route_end;

    _index_ronodoc_end = _indexOf(_lines, /\/\* ronodoc-import-end/);
    if (_index_ronodoc_end !== -1) {
      _lines.splice(
        _index_ronodoc_end,
        0,
        `import ${_data.component.name} from './pages/${component}';`
      );
    }

    _index_ronodoc_route_end = _indexOf(_lines, /\/\* ronodoc-route-end/);
    if (_index_ronodoc_route_end !== -1) {
      _lines.splice(
        _index_ronodoc_route_end,
        0,
        `      <Route
          path="${component.toLowerCase()}"
          component={${_data.component.name}}
      />`
      );
    }

    fs.writeFile(_path_root_demo_src_main, _lines.join('\n'), (err) => {
      if (err) {
        throw err;
      }
    });
  });
};

const _action_create = () => {
  const _app = program.app ? program.app : 'app';
  const _host = program.host ? program.host : 'localhost';
  const _port = program.port ? program.port : 3030;
  const _component = program.component;

  if (_component) {
    if (_app === 'app') {
      const _crd = process.cwd();
      const _crd_split = _crd.split('/');

      _create_component(
        _crd_split[_crd_split.length - 1],
        _component.trim().toLowerCase().replace(/ /gi, '-')
      );
    } else {
      _create_component(
        _app,
        _component.trim().toLowerCase().replace(/ /gi, '-')
      );
    }
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
