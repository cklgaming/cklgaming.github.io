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
        // if (req.method === 'GET') {
        //     
        // }
        if (req.method === 'GET') {
            let filePath;
            if (req.url === '/' || req.url === '/index.html') {
                    filePath = path.join(__dirname, 'index.html');
                    console.log(filePath);
                }
            // figure out how to write 'for' loop in order to iterate through all pages
            else {
                for (_ in urls) {
                    console.log(_);
                    if (req.url === urls[_]) {
                        filePath = path.join(__dirname, 'public', paths[_]);
                        console.log(filePath);
                    }
                    else {
                        console.log('error pnf');
                        throw new Error('Page Not Found');
                    }
                }            
            }

            const data = await fs.readFile(filePath);
            res.setHeader('Content-Type', 'text/html');
            res.write(data);
            res.end();
           // Finish listing this
            // Use `for` loop to get all files, list them here instead of hard-coding them? 
            // How to make this work in .html files?
       } 
        else {
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
