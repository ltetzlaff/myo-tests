const config = (entry, outfile, node= false) => {
  return {
    entry,
    output: {
      filename: outfile
    },
    target: node ? "node" : "web",
    module: {
      rules: [{
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      }],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"]
    }
  }
}

module.exports = [
  config("./src/deviceGraphs.ts", "public/deviceGraphs/index.js"),
  config("./src/poseDetector.ts", "public/poseDetector/index.js")
]
