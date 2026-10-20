import { createServer } from "http";
function Controller(request,response){
    console.log("---------------------------------------");
    response.writeHead(200);
    let num = request.url.split("/");
    let result = Number(num[1])+Number(num[2]);
    response.write(result);
    response.end();
}
let server = createServer(Hello);
server.listen(8081);
console.log('Server running at http://127.0.0.1:8081/');