
let express = require('express');
let router = express.Router();
let connection = require('../routes/connection')




/* GET places. */
router.get('/places', function(req, res, next) {
  res.render('places');
});





router.post('/entertainmentSearch', (req,res,next) => {
  
  searchQuery(req,res)
 

})
router.post('/tourismSearch', (req,res,next) => {

  searchQuery(req,res)
 
 
 })
 router.post('/medicalSearch', (req,res,next) => {

  searchQuery(req,res)
 
 
 })



function searchQuery(req,res){


  let category_range = [];

  dest=req.body.dest
  type=req.body.type

  if (req.url =='/entertainmentSearch'){
 category_range = [1,2,3,4,5,6,7,16]
  }
  else if (req.url == '/medicalSearch'){
    category_range = [8,9,10]
  }
  else if (req.url == '/tourismSearch') {
    category_range = [11,12,13,14,15]
  }
  

  if(dest == 'all' && type=='all'){

  
    connection.query(`SELECT * from service WHERE service.category_id IN (${category_range})`, function (error, results, fields) {
      if (error) throw error;
      res.send(results)
    });
 

  }
  else if (dest =='all' && type !=='all'){
   
    connection.query(`SELECT category_id from category WHERE category_name = '${type}'`, function (error, results, fields) {
      if (error) throw error;
      var category = results[0].category_id
      connection.query(`SELECT * from service WHERE category_id ='${category}'`, function (error, results, fields) {
        if (error) throw error;
        res.send(results)
      });
    });


    
  }
  else if (dest !='all' && type =='all'){

    connection.query(`SELECT * from service WHERE government = '${dest}'`, function (error, results, fields) {
      if (error) throw error;
      res.send(results)

    });
 
  }

  else {
  
    connection.query(`SELECT category_id from category WHERE category_name = '${type}'`, function (error, results, fields) {
      if (error) throw error;
      
      var category = results[0].category_id
      
      connection.query(`SELECT * from service WHERE category_id = '${category}' AND government = '${dest}' `, function (error, results, fields) {
        if (error) throw error;
        res.send(results)
      });
    });

   
  }
}





module.exports = router;
