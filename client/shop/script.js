let store = [],shopingCart={
    customer:'',
    total:0,
    items:[]
}
const loadProducts = async () =>{
    let data = await fetch('/sortProductByName').then(response=>response.json())
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

            // Remove the class after 5 seconds to reset the state
            setTimeout(() => {
                cart.classList.remove('show');
            }, 5000);
}
const addToCart = (index)=>{
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
    calcTotal()
    loadShopingCart()
    showCart()
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
        addToCart(index)
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
    shopingCart.items.forEach(item => {
        document.querySelector('table').appendChild(getRow(item))
    });
}
const getRow = (item)=>{
    let row,name,price,amount,inc,dec,sum
    row = Object.assign(document.createElement('tr'),{className:'row'})
    name = Object.assign(document.createElement('td'),{className:'name',innerText:item.name})
    price = Object.assign(document.createElement('td'),{className:'price',innerText:item.price})
    inc = Object.assign(document.createElement('button'),{className:'inc',innerText:'+'})
    dec = Object.assign(document.createElement('button'),{className:'dec',innerText:'-'})
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
const changeAmount = (diraction,item)=>{
let row = shopingCart.items.filter(item =>item._id==item._id)[0]
console.log(row)
}
clearShopingCart()
loadProducts()