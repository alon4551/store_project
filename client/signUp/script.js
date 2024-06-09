const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,passwordRegax =/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
const validation =()=>{
    let values = [...document.getElementsByClassName('field')],result,status = true
    values.map((item)=>{
            switch(item.id){
                case 'id':
                    result = validateId(item.value)
                    break
                case 'email':
                    result= emailRegex.test(item.value)
                case 'name':
                    result = item.value.trim()!=''
                    break
                case 'password':
                    result = passwordRegax.test(item.value)
                    break
                case 'confirm':
                    result = item.value == document.getElementById('password').value&&item.value.trim()!=''
                    break
            }
            if(!result)
                HandleError(item)
            status=status && result
    })
    return status
}
const HandleError =(item)=>{
    item.value = ""
    item.classList.add('error')
    item.placeholder = `error in ${item.id}`
    switch(item.id){
        case 'id':
            break
        case 'email':
            break
        case 'name':
            break
        case 'password':
            break
        case 'confirm':
            break
    }
}
const validateId= (id)=>{
    if(id.length!=9)return false;
    let value = id.split('').reduce((sum,number,index)=>{
        let n = Number(number)
        if(index%2==0)
            return sum+=n
        else{
            n*=2
            if(n>=10)
               return  sum+=Number(n%10)+Math.trunc(n/10)
            else
               return sum+=n
        }
    },0)
    return (value%10==0)
}
const reset = (id)=>{
    let item = document.getElementById(id)
    console.log(id,item)
    item.classList.remove('error')
    document.getElementById(id).placeholder(`Enter ${id}`)
    if(id=='confirm')
        document.getElementById(id).placeholder(`Confirm Password`)
}
console.log(validation())