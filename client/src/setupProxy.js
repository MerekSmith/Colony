const proxy = require("http-proxy-middleware");

// This proxy setup allows us to use the 2 servers for Node and React but allow our relative paths to work in the dev environment. It will change our local route (usually 3000 which matchs the react server) to 5000 (to match whatever is set in Node). In Production, none of this is used but still works with our relative paths ok.
module.exports = function(app) {
  app.use(proxy(["/api", "/auth/google"], { target: "http://localhost:5000" }));
};
