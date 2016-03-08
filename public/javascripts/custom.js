/* 
 * The following jQuery function gets called when the HTML DOM is ready to be inspected and manipulated
 * by javascript.
 */
$(document).ready(function(){
   /*
    * The following is a click event listener for the button element with the id button-one
    */
    var socket = io();
    $('form').submit(function(){
      console.log("Sending a message")
      socket.emit('chat message', $('#message').val());
      $('#message').val('');
      return false;
    });

    socket.on('chat message', function(msg){
      console.log("Received a message");
      $('#messages').append($('<li>').text(msg));
    });

});