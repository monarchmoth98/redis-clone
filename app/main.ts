import * as net from "net";
import {ParserService} from "./parserService";

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

export class RedisServer {

    server: net.Server;

    constructor(private readonly parserService: ParserService) {
        this.server = net.createServer((connection: net.Socket) => {
            console.log("Connected");
            connection.on('end', () => {
                console.log("Connection ended");
            });

            connection.on('data', (data) => {
                try{
                    connection.write(parserService.handleRequest(data));
                } catch (error) {
                    console.log(error);
                }
            });
        })
    }


}

const parserService = new ParserService();

const eddis = new RedisServer(parserService);
eddis.server.listen(6379);