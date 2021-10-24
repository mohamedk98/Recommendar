$(document).ready(function(){

    let full_name = document.getElementById('full_name')
    let email = document.getElementById('email')
    let password = document.getElementById('password')
$('#register').on('click',function(e){
    if (full_name.value =='' || email.value == '' || password.value == ''){
        alert ('Please Enter your Information ')
        e.preventDefault()
    }
    else {
        e.preventDefault()
    $.ajax({
        url:'/register',
        type: 'POST',
        data: {
        full_name:full_name.value,
        email:email.value,
        password:password.value},
        success: function (response) {
            if (response.success){
                alert(response.success)
                window.location.replace('/')
            }
            else if (response.error){
                alert(response.error)
            }
        }
    
    })
    }

})



})