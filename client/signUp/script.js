const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,passwordRegax =/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
const validation =()=>{
    let values = [...document.getElementsByClassName('field')],result,status = true,warning=""
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
               warning+=HandleError(item)+'\n'
            status=status && result
    })
    console.log(status,warning,)
    if(!status)
        showPopup(warning)
    return status
}
const HandleError =(item)=>{
    switch (item.id){
        case "id":
            return "id is not correct"
        case "email":
            return "email is not correct"
        case "name":
            return "name field must not be empty"
        case "password":
            return "password must be at leat with 8 characters and must be letters and numbers"
        case "confirm":
            return "2 password must be identical"
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
    if(item.value!='' ){
        item.classList.remove('error')
        item.placeholder = `enter ${id}`
    }
}
const addNewUser= async()=>{
    let fields = [...document.getElementsByClassName("field")]
    let user ={}
    fields.forEach(item=>{
        if(item.id!='confirm')
        user[item.id] = item.value
    })
    let res = await fetch ('/addNewUser',{
        method:'post',
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            id:document.querySelector()
        })
    })
    if(res.status(200))
        window.location.href='/'
    
}
const showPopup = (message)=> {
    document.getElementById('errorMessage').innerText = message;
    document.getElementById('popupOverlay').style.display = 'block';
    document.getElementById('errorPopup').style.display = 'block';
  }

  const  closePopup = ()=> {
    document.getElementById('popupOverlay').style.display = 'none';
    document.getElementById('errorPopup').style.display = 'none';
  }