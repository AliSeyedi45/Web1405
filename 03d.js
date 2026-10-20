import { createServer } from "http";
let controller = [{
    name:"/sum",
    func : function (request,response)
    {
        console.log("---------------------------------------");
        response.writeHead(200);
        let num = request.url.split("/");
        let result = Number(num[2])+Number(num[3]);
        response.write(result.toString());
        response.end();
    }
}]

function Responses(){
    for (let i = 0 ; i < contoller.length() ; i++){ 
        if (request.url.startWith(controller[i])){
            controller[i].func(request,response)
            break;
        }
    }
}
let server = createServer(sum);
server.listen(8081);
console.log('Server running at http://127.0.0.1:8081/');