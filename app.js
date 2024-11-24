import http from 'http';
import fs from 'fs';
import url from 'url';
import path from 'path';

// setup port, define file name and directory name variables
const PORT = process.env.PORT;
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 
let pages = [];
fs.readdirSync("./public/").forEach(file => {
    pages.push(file);
});
fs.readdirSync("./public/writing/").forEach(file => {
    pages.push(file);
});
console.log(pages);

// define url and path arrays
// urls holds the file the way it should show up in the url
// paths holds the file the way it is named in the fs
let urls = [];
let paths = [];
for (let page in pages) {
    if (path.extname(pages[page]) === '.html') {
        paths.push(pages[page]);
        urls.push('/' + path.parse(pages[page]).name);
    }
}
console.log(urls);
console.log(paths);

const server = http.createServer(async(req, res) => {
    console.log(req.url, req.method);
    try {
        if (req.method === 'GET') {
            let filePath;
            // figure out how to write 'for' loop in order to iterate through all pages
            for (_ in urls) {
                if (req.url === '/') {
                    filePath = path.join(__dirname, 'public', 'index.html');
                    console.log(filePath);
                }
                else if (req.url === urls[_]) {
                    filePath = path.join(__dirname, 'public', paths[_]);
                    console.log(filePath);
                }
                // put writing pages in the same array as regular paths?
                else if (req.url === writing[_]) {
                    filePath = path.join(__dirname, 'public/writing', paths[_]);
                    console.log(filePath);
                }
            }            
           // Finish listing this
            // Use `for` loop to get all files, list them here instead of hard-coding them? 
            // How to make this work in .html files?
       } else {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Invalid Credentials');
        }
    } catch(error) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Server Error');
    }
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
