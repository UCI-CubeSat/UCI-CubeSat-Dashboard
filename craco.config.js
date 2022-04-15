// const {when, whenDev, whenProd, whenTest} = require('@craco/craco');

module.exports = {
  babel: {
    loaderOptions: {
      ignore: ['./node_modules/mapbox-gl/dist/mapbox-gl.js']
    }
  }
};
