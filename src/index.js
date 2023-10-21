const http = require("http");

//create server
const PORT = process.env.PORT || 8080;
const server = http.createServer();
server.listen(PORT, () => {
  console.log(`Server is running and  listening on ${PORT}`);
});
