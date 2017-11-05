const frontend = {
  entry: "./src/index.ts",
  output: {
    filename: "public/dist/bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /(node_modules)|(tests)/,
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  }
}

const tests = {
  entry: "./tests/tests.ts",
  target: "node",
  output: {
    filename: "tests/tests.js"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /(node_modules)/,
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  }
}


module.exports = [ frontend, tests ]
