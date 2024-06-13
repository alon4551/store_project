
let products
const loadProducts = async (list) =>{
    document.querySelector('#name').innerText = `Hello ${JSON.parse(localStorage.getItem('customer')).name}`
    let gallery = document.querySelector('.gallery')
    gallery.innerHTML = ''
    list.map((item,index) => {
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
    if (itemNames) {
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
    
    reDisplay()
}
const reDisplay = ()=>{
    calcTotal()
    loadShopingCart()
}
const calcTotal= ()=>{
    let total =0
    const cart = JSON.parse(localStorage.getItem('cart'))
    cart.forEach(item => {
        total+=item.price*item.amount
    });
    console.log(total)
    document.querySelector('#total').innerHTML = `סה"כ לתשלום ${total} ש"ח`
    localStorage.setItem('total',total)
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
    let shopingCart = localStorage.getItem('cart')
    shopingCart = JSON.parse(shopingCart)
    shopingCart.forEach((item) => {
        document.querySelector('table').appendChild(getRow(item))
    });
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
    remove =Object.assign(document.createElement('button'),{innerText:"X"})
    remove.addEventListener('click',()=>{removeItem(item)})
    amount.appendChild(inc)
    amount.appendChild(dec)
    row.appendChild(name)
    row.appendChild(price)
    row.appendChild(amount)
    row.appendChild(sum)
    row.appendChild(remove)
    return row
}
const removeItem = (selecteditem)=>{
    const cart = JSON.parse(localStorage.getItem('cart'))
    const items = cart.filter((item)=>item.name!==selecteditem.name)
    localStorage.setItem('cart',JSON.stringify(items))
    reDisplay()
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
   window.location.href='/payment'
}
const sort = async ()=>{
    const sortType=document.querySelector('#sort')
    const dirType=document.querySelector('#diraction')
    loadProducts(await fetch('/sortProducts',{
        method:'post',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            type:sortType.value,
            diraction:dirType.value
        })
    }).then(response=>response.json()))
}
sort()
reDisplay()
