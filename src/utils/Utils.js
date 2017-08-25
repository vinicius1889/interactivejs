
export var EnumCookie = {
    INTERNAUTA_ID:"ckinternautaid"
}

export var EnumCode = {
    OK: {   code:200    }

}

export class RestUtils{

    static writeJson(response,json){
        RestUtils.writeJsonWithCode(response,json,EnumCode.OK);
    }

    static writeJsonWithCode(response,json,enumCode){
        response.writeHead(enumCode.code, {'Content-Type': 'application/json'})
        response.end(JSON.stringify(json))
    }
}

export class CookieUtil{

    static getInternautaId(cookie){
        let aux = cookie.split(";").filter(s=>s.indexOf(EnumCookie.INTERNAUTA_ID)>-1);
        try{
            return aux[0].split("=")[1].trim(); }
        catch(e){ return null; }
    }

}

export class UserOnlineUtils{
    static key = "refIcarros"
    static getUniqueUsersFromDocuments(documents){
        let map = new Map();
        documents.forEach((s) => map.set(s.key,s));
        return map;
    }
}