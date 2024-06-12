require('jquery')
let store = [],shopingCart={
    customer:'',
    total:0,
    items:[]
}
const loadProducts = async () =>{
    let data = await fetch('/sortProductByName').then(response=>response.json())
    document.querySelector('#name').innerText = `Hello ${shopingCart.customer}`
    store = data
    let gallery = document.querySelector('.gallery')
    gallery.innerHTML = ''
    data.map((item,index) => {
        gallery.appendChild(getCard(item,index))
    });
}
const showCart = ()=>{
    const cart = document.getElementById('cart');
            cart.classList.add('show');
            setTimeout(() => {
                cart.classList.remove('show');
            }, 5000);
}
const addToCart = (index, item)=>{
    
    if (!localStorage.getItem('cart')) localStorage.setItem('cart',JSON.stringify([]))
    const cart = JSON.parse (localStorage.getItem('cart'))
    
    const itemNames = cart.find(cartItem => cartItem.name === item.name)
    if (itemNames.length != 0) {
        itemNames['amount'] += 1
    }
    else {
        cart.push({
            name: item.name,
            amount: 1,
            price: item.price,
            _id: item._id
        })
    }
    localStorage.setItem('cart',JSON.stringify(cart))
    // console.log(cart)

    return 
    let found =false
    shopingCart.items.forEach(item => {
        if(item._id==store[index]._id&&found==false){
            item.amount++
            found = true
        }
    });
    if(!found){
        shopingCart.items.push({
            ...store[index],
            amount:1
        })
    }
   
    reDisplay()
    showCart()
}
const reDisplay = ()=>{
    loadShopingCart()
}
const calcTotal= ()=>{
    let total =0
    shopingCart.items.forEach(item => {
        total+=(item.price*item.amount)
    });
    shopingCart.total=total
}
const getCard = (item,index)=>{
    let card,name,price,buyBtn;
    card = Object.assign(document.createElement('div'),{className:'card'})
    name = Object.assign(document.createElement('label'),{innerText:item.name,className:'name'})
    price = Object.assign(document.createElement('label'),{innerText:item.price,className:'price'})
    buyBtn = Object.assign(document.createElement('button'),{
        innerText:'buy'
    })
    buyBtn.addEventListener('click',()=>{
        addToCart(index, item)
    })
    card.appendChild(name)
    card.appendChild(price)
    card.appendChild(buyBtn)
    return card
}
const clearShopingCart = ()=>{
 document.querySelectorAll('.row').forEach(item=>{
        item.remove()
    })
}
const loadShopingCart = ()=>{
    
    clearShopingCart()
    shopingCart = JSON.parse(localStorage.getItem('cart'))
    shopingCart.forEach(item => {
        document.querySelector('table').appendChild(getRow(item))
    });
    document.querySelector('#total').innerText = `סה"כ לתשלום ${shopingCart.total} ש"ח`
}
const getRow = (item)=>{
    let row,name,price,amount,inc,dec,sum,remove

    row = Object.assign(document.createElement('tr'),{className:'row'})
    name = Object.assign(document.createElement('td'),{className:'name',innerText:item.name})
    price = Object.assign(document.createElement('td'),{className:'price',innerText:item.price})
    inc = Object.assign(document.createElement('button'),{className:'inc',innerText:'+'})
    inc.addEventListener('click',()=>{changeAmount(1,item)})
    dec = Object.assign(document.createElement('button'),{className:'dec',innerText:'-'})
    dec.addEventListener('click',()=>{changeAmount(-1,item)})
    amount = Object.assign(document.createElement('td'),{className:'amount',innerText:item.amount})
    sum = Object.assign(document.createElement('td'),{className:'sum',innerText:item.price*item.amount})
    amount.appendChild(inc)
    amount.appendChild(dec)
    row.appendChild(name)
    row.appendChild(price)
    row.appendChild(amount)
    row.appendChild(sum)
    return row
}
const changeAmount = (amount,selected)=>{
    const cart = JSON.parse(localStorage.getItem('cart'))
    const selecteditem = cart.find((item)=>item.name===selected.name)
    selecteditem['amount']+=amount
    if(selecteditem['amount']<1) return
    localStorage.setItem('cart',JSON.stringify(cart))
    reDisplay()
}
const payment =async()=>{
    await fetch ('/payment',{
        headers:{
            "Content-Type":"application/json"
        },
        method:'post',
        body:JSON.stringify(shopingCart)
    })
}
localStorage.setItem('shopingCart',JSON.stringify(shopingCart))
clearShopingCart()
loadProducts()
loadShopingCart()
