$(document).ready(function(){

let email = document.getElementById('login_email')
let password = document.getElementById('login_password')

$('#login').on('click',function(e){
   
        
    $.ajax({
        url:'/auth',
        type: 'POST',
        data: {
        email:email.value,
        password:password.value},
        success: function (response) {
        if (response.error){
            alert(response.error)
          
        }
        else {
        
        }
        }
    
    })
})

    $('#logout').on('click',function(e){
   
        
        $.ajax({
            url:'/logout',
            type: 'POST',
            success: function (response) {
              
            }
        
        })
    


})





    
})