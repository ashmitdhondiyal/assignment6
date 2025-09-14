// server.js
const http = require("http");
const fs = require("fs");
const path = require("path");

// Reusable function to serve HTML files
function servePage(res, filePath, statusCode) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/html" });
      res.end("<h1>500 - Internal Server Error</h1>");
    } else {
      res.writeHead(statusCode, { "Content-Type": "text/html" });
      res.end(data);
    }
  });
}

// Create HTTP server
const server = http.createServer((req, res) => {
  const url = req.url;

  if (url === "/" || url === "/home") {
    servePage(res, path.join(__dirname, "pages", "home.html"), 200);
  } else if (url === "/about") {
    servePage(res, path.join(__dirname, "pages", "about.html"), 200);
  } else if (url === "/contact") {
    servePage(res, path.join(__dirname, "pages", "contact.html"), 200);
  } else if (url.endsWith(".css")) {
    // Serve CSS file
    const cssPath = path.join(__dirname, "public", path.basename(url));
    fs.readFile(cssPath, (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("CSS file not found");
      } else {
        res.writeHead(200, { "Content-Type": "text/css" });
        res.end(data);
      }
    });
  } else {
    // Custom 404 Page
    servePage(res, path.join(__dirname, "pages", "404.html"), 404);
  }
});

// Server listening on port 3000
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
