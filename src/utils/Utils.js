
export var EnumCode = {
    OK: {   code:200    }

}

export class RestUtils{

    static writeJson(response,json){
        response.writeHead(EnumCode.OK.code, {'Content-Type': 'application/json'})
        response.end(JSON.stringify(json))
    }
}