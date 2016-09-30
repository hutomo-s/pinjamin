module.exports = {
  entry: "./assets/js/dependencies/react-classes.js",
  output: {
    path: "./assets/js/dependencies",
    filename: "bundle.js"
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  }
}