const path = require("path");
const fs = require("fs");

const appDirectory = fs.realpathSync(process.cwd());
function resolveApp(relativePath) {
  return path.resolve(appDirectory, relativePath);
}

const nodePaths = (process.env.NODE_PATH || "")
  .split(process.platform === "win32" ? ";" : ":")
  .filter(Boolean)
  .filter(folder => !path.isAbsolute(folder))
  .map(resolveApp);

module.exports = {
  appBuild: resolveApp("build"),
  appClient: resolveApp("client"),
  postCssConfig: resolveApp("config"),
  appIndexJs: resolveApp("client/index.jsx"),
  serverIndexJs: resolveApp("server/index.js"),
  serverBuild: resolveApp("build"),
  nodePaths,
};
