const http = require('http');

http.createServer(function(req,res){
    res.writeHead(200,{'Content-Type':'text/plain'});
    res.end('welcome zhang bing bing 2222222!');
}).listen(3000)

console.log('run at 3000');