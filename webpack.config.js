module.exports = {
  
  // this code will be compiled 
  entry: "./app/app.js",

  // then output into this file:
  output: {
    filename: "public/bundle.js"
  },

  // BUILD:
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          // specific transformations: 
          presets: ['react', 'es2015']
        }
      }
    ]
  }

}