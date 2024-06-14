// username: alon password: 
const experss = require('express')
const bp = require('body-parser')
const db = require('mongoose')
const app = experss()
const clientPath = __dirname +'/client'
app.use(experss.static('client'))
app.use(bp.json())
db.connect('mongodb+srv://alon:bHd1tdVjiFyX5ZMh@svproject.xdtqtan.mongodb.net/classDb')

const userSchema = db.Schema({
    id:String,
    name: String,
    email:String,
    password: String
})
const productSchema = db.Schema({
    name: String,
    price:Number
})
const itemSchema = db.Schema({
    name:String,
    price:Number,
    amount:Number
})
const cartSchema = db.Schema({
    customer: userSchema,
    total:Number,
    items: [itemSchema]
})

const usersModel = db.model('users',userSchema);
const productModel = db.model('products',productSchema);
const cartModel = db.model('cart',cartSchema);
const itemsModel = db.model('items',itemSchema);

app.use((req,res,next)=> {
    console.log('Hello from middleware')
    next() 
})
app.get('/',(req,res)=>{
    res.sendFile(clientPath+'/homepage/index.html')
})

app.get('/signUp',(req,res)=>{
    res.sendFile(clientPath+'/signUp/')
})
app.get('/shop',(req,res)=>{
    res.sendFile(clientPath+'/shop/')
})
app.get('/allCarts',async(req,res)=>{
    res.json(await cartModel.find({}))
})
   
app.get('/payment',(req,res)=>{
    return res.sendFile(clientPath+'/payment/',)
})

app.get('/getUsers',async (req,res)=>{
    try{
        res.json(await usersModel.find({}))
    }
    catch(err){
        throw Error({message:err.message})
    }
})
app.get('/getProduct',async(req,res)=>{
    let {name} =req.body
    try{
        res.json(await usersModel.findOne({name:name}))
    }
    catch(err){
        throw Error({message:err.message})
    }
})
app.get('/getProducts',async(req,res)=>{
    try{
        res.json(await productModel.find({}))
    }
    catch(err){
        throw Error({message:err.message})
    }
})
app.post('/sortProducts',async(req,res)=>{
    let {type,diraction}= req.body
    try{
    if(type =='price' &&diraction =='up'){
        res.json(await productModel.find({}).sort({price:1}))
    }
    else if(type =='price' && diraction =='down'){
        res.json(await productModel.find({}).sort({price:-1}))
    }
    else if(type =='name' &&diraction =='up'){
        res.json(await productModel.find({}).sort({name:1}))
    }
    else{
        res.json(await productModel.find({}).sort({name:-1}))
    }
    }
    catch(err){
        console.log(err)
        throw Error(err)
    }
})
app.get('/reverseSortProductByName',async (req,res)=>{
    try{
        res.json(await productModel.find({}).sort({name:-1}))
    }
    catch(err){
        throw Error({message:err.message})
    }
})
app.get('/reveseSortProductByPrice',async (req,res)=>{
    try{
        res.json(await productModel.find({}.sort({price:-1})))
    }
    catch(err){
        throw Error({message:err.message})
    }
})
app.get('/sortProductByName',async (req,res)=>{
    try{
        res.json(await productModel.find({}).sort({name:1}))
    }
    catch(err){
        throw Error({message:err})
    }
})
app.get('/sortProductByPrice',async (req,res)=>{
    try{
        res.json(await usersModel.find({}.sort({price:1})))
    }
    catch(err){
        throw Error({message:err.message})
    }
})
app.get('/getUserCart',async (req,res)=>{
    let {customer} =req.body
    try{
        res.json(await cartModel.find({customer:customer}))
    }
    catch(err){
        throw Error({message:err.message})
    }
})

app.post('/addNewUser',async(req,res)=>{
    let {name,id,password,email} = req.body;
    let temp ={
        id:id,
        name:name,
        email:email,
        password:password
    }
    try{
         if(JSON.stringify(await usersModel.findOne({id:id}))!=null)
            res.sendStatus(400)
        else{
        await usersModel.insertMany(temp)
        res.sendStatus(200)
        }
    }
    catch{
        res.sendStatus(400)
    }
}
)
app.post('/addNewProduct',async(req,res)=>{
    let {name,price} = req.body;
    let temp ={
        name:name,
        price:price
    }
    try{
        await productModel.insertMany(temp)
        res.json({message: `cart is add to db`})
    }
    catch{
        throw new Error('error')
    }
})
app.post('/confirmPayment',async(req,res)=>{
    let {customer,total,items} = req.body;
    let temp ={
        customer:customer,
        total:total,
        items:items
    }
    console.log(temp)
    try{
        await cartModel.insertMany(temp)
        res.sendStatus(200,{message:'record add to DB'})
    }
    catch(err){
        console.log(err)
        throw new Error(err)
    }
})
app.post('/updateProduct',async (req,res)=>{
    let {name,price,oldName} = req.body
    let product = {
        name:name,
        price:price
    }
    try{
        await productModel.findOneAndUpdate({name:oldName},product,{new:true})
        res.json({message:`product ${name} has been updated`})
    }
    catch{
        throw new Error('error')
    }
})
app.post('/getUser',async(req,res)=>{
    let {email,password} = req.body
    let info = await usersModel.findOne({email:email,password:password})
    res.json(info)
})
app.post('/login',async (req,res)=>{
    let {email,password} = req.body
    let info = await usersModel.findOne({email:email,password:password})
    console.log(info)
    if(info!=null){
        res.sendStatus(200)
    }
    else
        res.sendStatus(404)
})
app.get('/payment',(req,res)=>{
    res.sendFile(clientPath+'/payment/')
})
app.post('/updateUser',async (req,res)=>{
    let {name,oldId,email,password,newId} = req.body
    let item = {
        id:newId,
        name:name,
        email,email,
        password:password
    }
    try{
        await user.findOneAndUpdate({id:oldId},item,{new:true})
        res.sendStatus(200,{message:'record add to DB'})
    }
    catch{
        throw new Error('error')
    }

})
app.delete('/deleteShopingCart',async(req,res)=>{
    let{_id}=req.body
    try{
        await cartModel.deleteOne({_id:_id})
    }
    catch(err){
        throw new Error('error')
    }
})
app.delete('/deleteUser',async(req,res)=>{
    let{id}=req.body
    try{
        await usersModel.deleteOne({id:id})
    }
    catch(err){
        throw new Error('error')
    }
})
app.delete('/deleteProduct',async (req,res)=>{
    let {name} = req.body
    try{
        await productModel.deleteOne({name:name})
    }catch(err){

    }
})


app.get('/all',(req,res,next)=>{
        res.sendFile(clientPath+'/all/')
})


app.listen(3000,()=>{console.log('hello world, server is on port http://localhost:3000')});