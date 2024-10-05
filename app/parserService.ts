export class ParserService {

    public handleRequest(input: Buffer): string {
        const request: string = input.toString();
        // split the request into tokens
        const tokens: string[] = request.split("\r\n");
        console.log(tokens);

        if (!tokens[0].startsWith("*")) {
            throw new Error("Invalid request. Request must be an array.");
        }

        const sizeOfArray: number = this.getSizeOfArrayFromFirstToken(tokens[0]);

        const requestArray = [];
        for (let i = 1; i <= sizeOfArray; i++) {
            requestArray.push(tokens.at(2*i));
        }
        console.log(requestArray);
        let result: string;
        switch (requestArray[0].toUpperCase()) {
            case "PING":
                result = "+PONG\r\n";
                break;
            case "ECHO":
                result = ParserService.toBulkString(requestArray[1]);
        }

        return result;
    }

    public getSizeOfArrayFromFirstToken(token: string): number {
        return Number(token.slice(1));
    }

    public static toBulkString(text: string): string {
        const len: number = text.length;
        return `$${len}\r\n${text}\r\n`;
    }
}