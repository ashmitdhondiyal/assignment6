// Import core Node.js modules
const http = require("http");   // To create an HTTP server
const fs = require("fs");       // To read HTML & CSS files
const path = require("path");   // To handle file paths

// 🔹 Helper function to serve HTML pages
function servePage(res, filePath, statusCode) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      // If file reading fails → send 500 error
      res.writeHead(500, { "Content-Type": "text/html" });
      res.end("<h1>500 - Internal Server Error</h1>");
    } else {
      // Serve the requested page
      res.writeHead(statusCode, { "Content-Type": "text/html" });
      res.end(data);
    }
  });
}

// 🔹 Create HTTP server
const server = http.createServer((req, res) => {
  const url = req.url; // Get requested route (e.g., /home, /about)

  // Serve different pages based on the route
  if (url === "/" || url === "/home") {
    servePage(res, path.join(__dirname, "pages", "home.html"), 200);
  } else if (url === "/about") {
    servePage(res, path.join(__dirname, "pages", "about.html"), 200);
  } else if (url === "/contact") {
    servePage(res, path.join(__dirname, "pages", "contact.html"), 200);
  } else if (url.endsWith(".css")) {
    // 🔹 Serve CSS file
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
    // 🔹 For invalid routes → show custom 404 page
    servePage(res, path.join(__dirname, "pages", "404.html"), 404);
  }
});

// 🔹 Start server on port 3000
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
