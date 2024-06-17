const LoadInformation = ()=>{
    let customer = JSON.parse(localStorage.getItem('customer'))
    let fields = document.getElementsByClassName('fill')
    for(let i=0;i<fields.length;i++)
        fields[i].value = customer[fields[i].id]
}
const togglePasswordVisibility = (inputId, label)=> {
    var input = document.getElementById(inputId);
    if (input.type === "password") {
      input.type = "text";
      label.textContent = "☺"; //Change label text to smiling face with open mouth
    } else {
      input.type = "password";
      label.textContent = "☻"; // Change label text back to smiling face
    }
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
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,passwordRegax =/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
  const validation =()=>{
      let values = [...document.getElementsByClassName('fill')],result,status = true,warning=""
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
              if(!result){
                 warning+=item.value.trim()==''?`${item.id} field must not be emply \n`: HandleError(item)+'\n'
              }
              status=status && result
              console.log(status,warning)
      })
      if(!status)
          showPopup(warning)
      return status
  }
  const HandleError =(item)=>{
  
      switch (item.id){
          case "id":
              return "id field is not correct"
          case "email":
              return "email field is not correct"
          case "name":
              return "name field field must not be empty"
          case "password":
              return "password field must be at leat with 8 characters and must be letters and numbers"
          case "confirm":
              return "both password must be identical"
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
  const updateInformation = async ()=>{
      let fields = document.getElementsByClassName('fill')
      let customer = JSON.parse(localStorage.getItem('customer'))
      let oldId=customer.id
      if(!validation())return ;
    for(let i=0;i<fields.length;i++){
        customer[fields[i].id] = fields[i].value
    }
    let response = await fetch('/updateUser',{
        method:'post',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({...customer,oldId:oldId})
    }).then(res=>res.json())
    console.log(response)
    if(response.status == 200)
        {
            localStorage.setItem('customer',JSON.stringify(customer))
            window.location.href('/shop')
        }
        else{
            showPopup(`user with id ${customer.id} is allready exsit`)
        }
}
  LoadInformation()