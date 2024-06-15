const getCartRecord =(record,index)=>{
    let row,customer,total,items,itemsTable,orderId
    console.log(record)
    row = Object.assign(document.createElement('tr'),{className:'row '+ index%2==0?'even':'odd'})
    customer = Object.assign(document.createElement('td'),{className:'name',innerText:`${record.customer.id}, ${record.customer.name}`})
    total = Object.assign(document.createElement('td'),{className:'total',innerText:`${record.total} NIS`})
    items=Object.assign(document.createElement('td'))
    itemsTable = Object.assign(document.createElement('table'),{className:'customerCart'})
    itemsTable.appendChild(getShopingCartItem({name:'Product name',price:'price',amount:'Units'}))
    record.items.forEach((item,index) => {
        itemsTable.appendChild(getShopingCartItem(item))
    });
    items.appendChild(itemsTable)
    row.appendChild(customer)
    row.appendChild(items)
    row.appendChild(total)
    return row
}
const getShopingCartItem = (item)=>{
    let row,name,price,amount,action
    row = Object.assign(document.createElement('tr'),{className:'subrow'})
    name = Object.assign(document.createElement('td'),{className:'name',innerText:item.name})
    price = Object.assign(document.createElement('td'),{className:'price',innerText:`${item.price}`})
    amount = Object.assign(document.createElement('td'),{className:'amount',innerText:`${item.amount} `})
    row.appendChild(name)
    row.appendChild(price)
    row.appendChild(amount)
    return row
}
const loadRecords = async ()=>{
    let data = await fetch('/getCarts').then(response=>response.json())
    document.querySelectorAll('.row').forEach(item=>{
        item.remove()
    })
    let table  = document.querySelector('#list')
    data.forEach((item,index)=>{
        table.appendChild(getCartRecord(item,index))
    })
}

loadRecords()