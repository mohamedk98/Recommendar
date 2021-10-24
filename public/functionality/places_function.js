$(document).ready(function(){
    let new_data=''
    import ('../js/ejs.min.js')

    let entertainmentDest =document.getElementById('entertainmentDest')
    let entertainmentType = document.getElementById('entertainmentType')



    let medicalDest = document.getElementById('medicalDest')
    let medicalType = document.getElementById('medicalType')

    let tourismDest = document.getElementById('tourismDest')
    let tourismType = document.getElementById('tourismType')


    $('#entertainment_submit').click(function(){

  
        $.ajax({
           
            url: '/entertainmentSearch' ,
            method: 'post',
          data:{

            dest:entertainmentDest.options[entertainmentDest.selectedIndex].value,
            type:entertainmentType.options[entertainmentType.selectedIndex].value,
          },
            
            success: function (response) {

                  searchQuery(response)

            }
          })
         });


           $('#medical_submit').click(function(){

  
            $.ajax({
               
                url: '/medicalSearch' ,
                method: 'post',
              data:{
    
                dest:medicalDest.options[medicalDest.selectedIndex].value,
                type:medicalType.options[medicalType.selectedIndex].value,
              },
                
                success: function (response) {
               
                      searchQuery(response)
    
                }
              })
             });

   


             $('#tourism_submit').click(function(){

  
              $.ajax({
                 
                  url: '/tourismSearch' ,
                  method: 'post',
                data:{
      
                  dest:tourismDest.options[tourismDest.selectedIndex].value,
                  type:tourismType.options[tourismType.selectedIndex].value,
                },
                  
                  success: function (response) {
      
                        searchQuery(response)
      
                  }
                })
               });







         function searchQuery(response){
          if (response =='' || response == null){
            alert("No Result Found")
        }
        else{
          $('#searchResults').css('display','block')
          $('#testemonial').empty()
            response.forEach(data => {
            let search_results_html =  `
            <div class="row">
            <div class="col-lg-12 col-lg-offset-1  home1-testm item home1-testm-single text-center">
  <div class="home1-testm-img">
    <img src="places_images/restaurant.jpg" height="50%" width="50%" alt="img"/>
  </div>
  <div class="home1-testm-txt">
    <h3>${data.name}</h3>
    <p>${data.description}</p>
    <h4>${data.phone}</h4>
    <h4>${data.street_no},${data.street},${data.government},${data.zip_code} </h4>
    <h4></h4>
  </div>
</div>
</div>
            `
            $('#testemonial').append(search_results_html)
           
            });
         }
        }
        

})


