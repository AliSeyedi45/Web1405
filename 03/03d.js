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

function Responses(request,response){
    for (let i = 0 ; i < controller.length ; i++){ 
        if (request.url.startsWith(controller[i].name)){
            controller[i].func(request , response)
            break;
        }
    }
}
let server = createServer(Responses);
server.listen(8081);
console.log('Server running at http://127.0.0.1:8081/');