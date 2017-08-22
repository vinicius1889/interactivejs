/**
 * Created by vinicius on 22/08/17.
 */
export class RestUtils{

    public static writeJson(response,json){
        response.write(200, {'Content-Type': 'application/json'})
        response.end(json)
    }
}