'use strict';

var autoprefixer = require('autoprefixer');
var assets = require('postcss-assets');

module.exports = {
  plugins: [
    assets({
      loadPaths: ['images/']
    }),
		autoprefixer({
			browsers: [
				'>1%',
				'last 4 versions',
				'Firefox ESR',
				'not ie <9'
			]
		})
  ]
};
