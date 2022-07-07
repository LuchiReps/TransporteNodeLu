var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

router.get("/", function(req,res,next){
 res.render('contacto', {
    isContacto: true
 }) ;// view/nosotros.hbs
})

 router.post('/', async function(req,res,next){
//console.log(req.body)
var nombre = req.body.nombre;
var email = req.body.email;
var telefono = req.body.telefono;
var comentario = req.body.comentario;

//console.log(req.body.nombre)

var obj = {
   to:'luchieukene@gmail.com', 
   subject: 'Contacto pagina web',
   html:nombre + "se contacto a traves de la web y quiere saber mas info a este correo:" + email + "<br> Su tel es:" + telefono +
   ". Su comentario es:" + comentario + "."
}

var transport = nodemailer.createTransport({
   host: process.env.SMTP_HOST,
   port:  process.env.SMTP_PORT,
   auth: {
     user:  process.env.SMTP_USER,
     pass:  process.env.SMTP_PASS,
   }
   

}) 

var info =  await transport.sendMail(obj);
 
res.render('contacto',{
   message: 'Mensaje enviado correctamente'
})

 })


 
 
module.exports = router;
