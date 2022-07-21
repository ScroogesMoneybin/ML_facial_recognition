const express = require('express');
const app = express();
const bcrypt=require("bcrypt-nodejs");
const cors=require("cors");
const knex = require('knex')
const register=require("./controllers/register.js");
const signin=require("./controllers/signin.js");
const getprofile=require("./controllers/getprofile.js");
const image=require("./controllers/image.js");

const pg_db=knex({
    client: 'pg',
    connection: {
      host : 'postgresql-encircled-33154',
      user : 'postgres',
      password : 'Test123',
      database : 'ml_face_db'
    }
});


app.use(express.json());
app.use(cors());

app.get('/',(request,response)=>{
	response.send("Welcome");
})

app.post('/signin',(request,response)=>{signin.SigningIn(request,response,pg_db,bcrypt)});

app.post('/register',(request,response)=>{register.Registration(request,response,pg_db,bcrypt)});

app.get("/profile/:id",(request,response)=>{getprofile.GetProfile(request,response,pg_db)});

app.put("/image",(request,response)=>{image.submitImage(request,response,pg_db)});

app.post("/imageurl",(request,response)=>{image.ClarifaiCall(request,response)});

 app.listen(process.env.PORT || 8080, ()=>{
  console.log(`app is running on ${process.env.PORT}`);
})