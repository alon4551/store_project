const getCartRecord =(record)=>{
    let row,customer,total,items,itemsTable,orderId
    console.log(record)
    row = Object.assign(document.createElement('tr'),{className:'row'})
    customer = Object.assign(document.createElement('td'),{className:'name',innerText:`${record.customer.id}, ${record.customer.name}`})
    total = Object.assign(document.createElement('td'),{className:'total',innerText:`${record.total}ש"ח`})
    items=Object.assign(document.createElement('td'))
    itemsTable = Object.assign(document.createElement('table'))
    record.items.forEach(item => {
        itemsTable.appendChild(getShopingCartItem(item))
    });
    items.appendChild(itemsTable)
    row.appendChild(customer)
    row.appendChild(total)
    row.appendChild(items)
    return row
}
const getShopingCartItem = (item)=>{
    let row,name,price,amount,action
    row = Object.assign(document.createElement('tr'),{className:'subrow'})
    name = Object.assign(document.createElement('td'),{className:'name',innerText:item.name})
    price = Object.assign(document.createElement('td'),{className:'price',innerText:`ש"ח ליחידה ${item.price}`})
    amount = Object.assign(document.createElement('td'),{className:'amount',innerText:`${item.amount} יחידות`})
    row.appendChild(name)
    row.appendChild(price)
    row.appendChild(amount)
    return row
}
const loadRecords = async ()=>{
    let data = await fetch('/allCarts').then(response=>response.json())
    document.querySelectorAll('.row').forEach(item=>{
        item.remove()
    })
    let table  = document.querySelector('#list')
    data.forEach((item)=>{
        table.appendChild(getCartRecord(item))
    })
}
loadRecords()