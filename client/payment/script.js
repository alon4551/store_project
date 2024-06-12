
let shopingCart = {}
const loadShopingCart=async()=>{
   clearShopingCart()
   console.log('hello world')
    shopingCart = JSON.parse(await fetch('/getShopingTempCart').then(response => response.json()))
   shopingCart.items.forEach(item => {
    document.querySelector('table').appendChild(getRow(item))
    });
    document.querySelector('#total').innerText = `סה"כ לתשלום ${shopingCart.total} ש"ח`
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
loadShopingCart()