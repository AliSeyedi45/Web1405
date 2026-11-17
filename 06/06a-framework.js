import { createServer } from 'node:http';

function framework(){
    let controllers = [];
    let app = {
        get: function(path, func){
            controllers.push({
                name: path,
                func: func
            })
        },
        listen: function(port, userCallback){
            function serverCallback(request, response){
                console.log("---------------------------------------------");
                console.log("(framework) url: ", request.url);

                let data = "";
                request.on("data", function(part){
                    data = data + part;
                });
                request.on("end", function(){
                    console.log("(framework) data:", data);

                    let found = false;
                    try {
                        request.data = JSON.parse(data);
                    } catch (error) {
                        request.data = data;
                    }

                    if (request.data === "" || request.data === null || typeof request.data !== 'object') {
                        request.data = {};
                    }

                    request.myKey = 'salam!';
                    for(let item of controllers){
                        let prefix = '/' + item.name;
                        if(request.url === prefix || request.url.startsWith(prefix + '/')){
                            console.log("(framework) controller: ", item.name);
                            found = true;
                            try {
                                item.func(request, response);
                            } catch (err) {
                                console.log("(framework) controller error:", err);
                                if (!response.headersSent) {
                                    response.writeHead(500);
                                    response.write("internal server error");
                                }
                                if (!response.writableEnded) {
                                    response.end();
                                }
                            }
                            break;
                        }
                    }
                    if(!found){
                        console.log("path not found.");
                        if (!response.headersSent) {
                            response.writeHead(404);
                            response.write("path not found");
                        }
                        if (!response.writableEnded) {
                            response.end();
                        }
                    }
                });
            }
            let server = createServer(serverCallback);
            server.listen(port, userCallback);
        }
    }
    return app;
}

export { 
    framework 
}