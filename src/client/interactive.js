/**
 * Created by vinicius on 24/08/17.
 */

    //names = anuncio_id e anunciante_id
var socket = io('http://localhost:8765');

socket.on('connect', function(){

});

socket.on('doRegistration',function(){
    socket.emit('register',document.cookie);
});

socket.on('online-users',function(data){
    document.getElementById("onlineusers").innerText=data.length
});

function createRoom(socket,name,key){
    var data = {room:name,key:key}
    socket.emit("new-room",data);
}


