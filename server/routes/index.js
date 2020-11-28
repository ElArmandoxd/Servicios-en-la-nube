var express = require('express');
var mysql = require('mysql');
var axios = require('axios');
var router = express.Router();
var ruta_service = "";

var connection = mysql.createConnection({
  host     : '35.193.171.144',
  database : 'cloud_service',
  user     : 'root',
  password : '1q2w3e4r',
});

connection.connect();

// GET home page.
router.get('/',(req, res) => {
  res.status(200).json('Success message!')
});

// POST user into the database.
router.post('/post/contacto', (req,res)=>{
  let data = req.body;
  create_table = "CREATE TABLE IF NOT EXISTS contactos(id int not null auto_increment,nombre varchar(100),telefono varchar(14),primary key(id));";
  connection.query(create_table);
  sql = "INSERT INTO contactos(nombre,telefono) values ("+mysql.escape(data.nombre)+","+mysql.escape(data.telefono)+");";
  connection.query(sql, (err,rows)=>{
    if(err){
      res.status(500).json(err);
    } 
    res.status(200).json("Datos guardados!");
  });
});

// GET all the contacts from de database
router.get('/get/contactos', (req,res)=>{
  sql = "SELECT * FROM contactos;";
  connection.query(sql, (err,rows)=>{
    if(err) throw err;
    res.status(200).json(rows);
  });
});

router.get('/get/contacto/:id', (req,res)=>{
  let data = req.params;
  sql = "SELECT * FROM contactos where id="+mysql.escape(data.id)+";";
  connection.query(sql, (err,row) =>{
    if(err) throw err;
    res.status(200).json(row);
  });
});

// GET an XLSX file with all the contacts so far.
router.get('/create/xlsx', (req,res)=>{
  let data = []
  sql = "SELECT * FROM contactos;";
  connection.query(sql, (err,rows)=>{
    if(err) throw err;
    for(let i = 0; i < rows.length; i++){
      let r = rows[i];
      let phone = r.telefono.split('');
      let lada = "("+ phone[0] + phone[1] + phone[2] +")";
      console.log(lada);
      let nums = phone[3] + phone[4] + phone[5]+"-"+ phone[6] + phone[7] + phone[8] + phone[9];
      let aux = lada +"-"+ nums;
      data.push({
        name: r.nombre,
        phone: aux,
      });
    }

    axios.post(ruta_service, data).then(
      response =>{
        res.status(200).json(response.data);
      }).catch(err=>{
        res.status(500).json(err);
      });
  });
});

router.post('/update', (req,res)=>{
  let data = req.body;
  sql = "UPDATE contactos SET nombre = " +mysql.escape(data.nuevo_nombre) + ", telefono = "+ mysql.escape(data.nuevo_telefono)+" WHERE id = " +mysql.escape(data.id)+";";
  connection.query(sql, (err,rows)=>{
    if(err) throw err;
    res.status(200).json({message: "¡Contacto actualizado!"});
  });
});

router.post('/delete', (req, res) =>{
  let data = req.body;
  sql = "DELETE from contactos where id = "+mysql.escape(data.id)+";";
  connection.query(sql, (err,rows)=>{
    if(err) throw err;
    res.status(200).json({message:"¡Contacto eliminado!"});
  });
});

module.exports = router;
