import { createServer } from "http";
function Hello(){
    console.log("---------------------------------------");
}
let server = createServer(Hello);
server.listen(8081);
console.log('Server running at http://127.0.0.1:8081/');