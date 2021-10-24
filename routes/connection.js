var express = require('express');
let mysql = require('mysql')

let connection = mysql.createPool({
    connectionLimit : 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'recomendar',
    port:3307,
    insecureAuth:true,
  })


  module.exports = connection