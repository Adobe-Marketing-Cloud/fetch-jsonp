import babel from 'rollup-plugin-babel';

export default {
  moduleName: 'fetchJsonp',
  entry: 'src/fetch-jsonp.js',
  plugins: [ babel() ],
  format: 'umd'
};
