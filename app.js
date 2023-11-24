import express from 'express'
import bodyParser from 'body-parser'
import { addUser,fetchUserData } from './db.js'

const port = 3000
const app = express()

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    res.render('index.ejs')
})

app.get('/login',(req,res)=>{
    res.locals.isExist = false
    res.render('login.ejs')

})

app.post('/',async(req,res)=>{
    let fName = req.body.firstName
    let lName = req.body.lastName
    let email = req.body.email 
    let password = req.body.password 

    try{

        await addUser(fName,lName,email,password)
        res.render('index.ejs')
    }catch(err){
        console.log(err)
    }
})


app.post('/login',async (req,res)=>{
     let email = req.body.email 
     let password = req.body.password
     let data = await fetchUserData(email,password)
     console.log(data)
     if(data===null)
        res.locals.isExist = false 
     else
        res.locals.isExist = true
     res.render('login.ejs',data)
})

app.listen(port,()=>{
    console.log(`server is running on ${port}`)
})