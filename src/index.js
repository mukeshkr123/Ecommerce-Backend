const http = require("http");
const app = require("./app/app");

//create server
const PORT = process.env.PORT || 8080;
const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`Server is running and  listening on ${PORT}`);
});
