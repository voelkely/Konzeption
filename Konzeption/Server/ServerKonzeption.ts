import * as Url from "url";
import * as Http from "http";

export namespace Konzeption {


    let port: number | string | undefined = process.env.PORT;
    if (port == undefined)
        port = 5001;

    startServer(port);

    console.log("Hallo Server");

    //*starte Server*
    function startServer(_port: number | string): void {

        let server: Http.Server = Http.createServer();
        console.log("Server starting on port:" + _port);
    
        server.listen(_port);
        server.addListener("request", handleRequest);
     
    
    }//start server zu

    function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
        console.log("wie geht es uns heut?");

        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");

        if (_request.url) { 
            let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
           // for (let key in url.query) {
                   // _response.write(key + ":" + url.query[key] + "<br/>");
          //  }

            let jsonString: string = JSON.stringify(url.query);
            _response.write(jsonString);
           
        }   

        _response.end();

    }//handleRequest zu


   
    

   

}//namespace zu