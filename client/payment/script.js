
let shopingCart = {}
const loadShopingCart=async()=>{
   clearShopingCart()
   shopingCart = JSON.parse(localStorage.getItem('cart'))
   console.log(shopingCart)
   shopingCart.forEach(item => {
    document.querySelector('table').appendChild(getRow(item))
    });
    document.querySelector('#total').innerText = `סה"כ לתשלום ${localStorage.getItem('total')} ש"ח`
    document.querySelector('#customer').innerText = `${JSON.parse(localStorage.getItem('customer')).name} בבקשה תאשר`
}
const getRow = (item)=>{
    let row,name,price,amount,sum
    row = Object.assign(document.createElement('tr'),{className:'row'})
    name = Object.assign(document.createElement('td'),{className:'name',innerText:item.name})
    price = Object.assign(document.createElement('td'),{className:'price',innerText:item.price})
    amount = Object.assign(document.createElement('td'),{className:'amount',innerText:item.amount})
    sum = Object.assign(document.createElement('td'),{className:'sum',innerText:item.price*item.amount})
    row.appendChild(name)
    row.appendChild(price)
    row.appendChild(amount)
    row.appendChild(sum)
    return row
}
const clearShopingCart= ()=>{
    document.querySelectorAll('.row').forEach(item=>{
        item.remove()
    })
}
const confirmPayment = async     ()=>{
    const customer = JSON.parse(localStorage.getItem('customer'))
    const cart = JSON.parse(localStorage.getItem('cart'))
    const data = {
        customer:customer,
        total:JSON.parse(localStorage.getItem('total')),
        items:cart
    }
    let response = await fetch('/confirmPayment',{
        method:'post',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    })
    if(response.status ==200){
        localStorage.setItem('customer',"")
        localStorage.setItem('cart',"")
        localStorage.setItem('total',0)
        alert('payment confirm')
        window.location.href='/'
    }
    else{
        console.log('error')
    }
}
loadShopingCart()