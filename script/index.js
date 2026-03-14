document.getElementById('login-btn').addEventListener("click",function(){
  const name=document.getElementById('name')
  const userName=name.value 
  const password=document.getElementById('password')
  const userPassword=password.value
  if(userName == "admin" && userPassword == "admin123"){
     alert('success')
     window.location.assign("home.html")
    console.log(userName,userPassword)
  }else{
    alert('failed')
  }
})
// Username: admin
// Password: admin123