import http from 'http';
import fs from 'fs';
import url from 'url';
import path from 'path';

const PORT = process.env.PORT;
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let pages = [];
fs.readdirSync("./public/").forEach(file => {
                pages.push(file);
});

let urls = [];
let paths = [];
for (let page in pages) {
    if (path.extname(pages[page]) === '.html') {
        paths.push(pages[page]);
        urls.push('/' + path.parse(pages[page]).name);
    }
}

const server = http.createServer(async(req, res) => {
    console.log(req.url, req.method);
    try {
        if (req.method === 'GET') {
            let filePath;
            for (_ in urls) {
                if (req.url === '/') {
                    filePath = path.join(__dirname, 'public', 'index.html');
                    console.log(filePath);
                }
                else if (req.url === urls[_]) {
                    filePath = path.join(__dirname, 'public', paths[_]);
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
