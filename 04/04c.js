import { createServer } from "http"
import {writeFile} from "node:fs"
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
    },
    name:"/createFile",
    func : function (request,response)
    {
        let file = request.url.split("/");
        writeFile(file[2],file[3],function(error)
        {
            if(error){
                console.log('error',error);
                response.writeHead(500);
                response.write("Create file error");
                response.end();
            }
            else{
                let result = "Created file successfully";
                response.writeHead(200);
                response.write(result);
                response.end();

            }
            console.log("Created file successfully")
        })
    },
    name:"/readFile",
    func : function (request,response)
    {
        let file = request.url.split("/");
        readFile(file[2],function(error,body)
        {
            if(error)
            {
                console.log("error",error);
                response.writeHead(500);
                response.write("Read file error");
                response.end();
            }
            else
            {
                console.log("Read file successfully");
                response.writeHead(200);
                response.write(body);
                response.end();
            }
        });
    }
}]
function Responses(request,response){
    for (let i of controller){ 
        if (request.url.startsWith(controller[i].name)){
            controller[i].func(request , response)
            break;
        }
    }
}
let server = createServer(Responses);
server.listen(8081);
console.log('Server running at http://127.0.0.1:8081/');