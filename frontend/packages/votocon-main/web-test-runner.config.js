import { esbuildPlugin } from '@web/dev-server-esbuild';
import { fromRollup } from '@web/dev-server-rollup';
import rollupReplace from '@rollup/plugin-replace';
import { playwrightLauncher } from '@web/test-runner-playwright';
import { legacyPlugin } from '@web/dev-server-legacy';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const replace = fromRollup(rollupReplace);

export default {
  files: ['tests/**/*.test.ts'],
  nodeResolve: {
    exportConditions: ['browser', 'development']
  },
  plugins: [
    esbuildPlugin({ 
      ts: true,
      tsconfig: path.join(__dirname, 'tsconfig.json'),
      target: 'es2020',
      define: {
        'process.env.NODE_ENV': '"test"'
      },
      resolveExtensions: ['.ts', '.js'],
      loader: { '.ts': 'ts' }
    }),
    {
      name: 'resolve-typescript-paths',
      async resolveImport({ source }) {
        // Handle test dependencies
        if (['chai', 'sinon', '@open-wc/testing'].includes(source)) {
          return source;
        }
        // Handle @ imports
        if (source.startsWith('@/')) {
          return path.resolve(__dirname, 'src', source.slice(2));
        }
        if (source.startsWith('@components/')) {
          return path.resolve(__dirname, 'src/components', source.slice(11));
        }
        if (source.startsWith('@services/')) {
          return path.resolve(__dirname, 'src/services', source.slice(10));
        }
        return source;
      }
    },
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    legacyPlugin({
      polyfills: [
        'core-js/es/array',
        'core-js/es/object',
        'core-js/es/promise',
      ]
    }),
  ],
  browsers: [
    playwrightLauncher({ product: 'chromium' })
  ],
  testFramework: {
    config: {
      ui: 'bdd',
      timeout: '5000',
    },
  },
  coverageConfig: {
    include: ['src/**/*.ts']
  },
  middleware: [
    (ctx, next) => {
      ctx.set('Access-Control-Allow-Origin', '*');
      return next();
    },
    function (ctx, next) {
      // Rewrite import paths
      ctx.url = ctx.url.replace(/^\/(@[^\/]+)/, (match, alias) => {
        const aliasMap = {
          '@components': '/src/components',
          '@services': '/src/services',
          '@models': '/src/models',
          '@utils': '/src/utils',
          '@config': '/src/config',
          '@': '/src'
        };
        return aliasMap[alias] || match;
      });
      return next();
    }
  ],
  esbuildTarget: 'es2020',
  moduleDirs: [path.resolve(__dirname, 'node_modules'), path.resolve(__dirname, 'src')],
  moduleLookupDir: __dirname,
  moduleLookupOptions: {
    baseDir: __dirname,
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@models': path.resolve(__dirname, 'src/models'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@config': path.resolve(__dirname, 'src/config')
    }
  },
  moduleMappings: [
    {
      find: '@/',
      replacement: path.resolve(__dirname, 'src/')
    },
    {
      find: '@components/',
      replacement: path.resolve(__dirname, 'src/components/')
    },
    {
      find: '@services/',
      replacement: path.resolve(__dirname, 'src/services/')
    },
    {
      find: '@models/',
      replacement: path.resolve(__dirname, 'src/models/')
    },
    {
      find: '@utils/',
      replacement: path.resolve(__dirname, 'src/utils/')
    },
    {
      find: '@config/',
      replacement: path.resolve(__dirname, 'src/config/')
    }
  ],
  testRunnerHtml: testFramework => `
    <html>
      <body>
        <script>
          // Set up path aliases
          import { pathsToModuleNameMapper } from 'ts-jest/utils';
          const { compilerOptions } = require('./tsconfig.json');
          const moduleNameMapper = pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' });
          
          // Configure test environment
          window.process = { env: { NODE_ENV: 'test' } };
          window.customElements.forcePolyfill = true;
        </script>
        <script type="module">
          // Configure test environment
          window.process = { env: { NODE_ENV: 'test' } };
        </script>
        <script type="module" src="${testFramework}"></script>
      </body>
    </html>
  `,
  rootDir: __dirname,
  tsconfig: path.resolve(__dirname, 'tsconfig.json'),
  nodeResolve: {
    exportConditions: ['development', 'browser'],
    preferBuiltins: false,
    mainFields: ['module', 'browser', 'main']
  },
  mochaOptions: {
    ui: 'bdd',
    timeout: 5000
  },
  compatibility: 'all'
};
