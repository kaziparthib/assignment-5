let all=[]
let open=[]
let Closed=[]
let current="all-btn"
const count =document.getElementById('count')
const allSection =document.getElementById('all-section')
const allbtn =document.getElementById('all-btn')
const openbtn =document.getElementById('open-btn')
const closebtn =document.getElementById('closed-btn')
const btntabs =document.getElementById('btn-tabs')



function toggle(a){
  if(a=='all-btn'){
   
  allbtn.classList.remove('btn-outline');
  openbtn.classList.add('btn-outline');
  closebtn.classList.add('btn-outline');
  allbtn.classList.add('btn-primary');
  }else if(a=='open-btn'){
    allbtn.classList.remove('btn-primary')
    allbtn.classList.add('btn-outline');
  openbtn.classList.remove('btn-outline');
  closebtn.classList.add('btn-outline');
  openbtn.classList.add('btn-primary');
  }else if(a=='closed-btn'){
    allbtn.classList.remove('btn-primary')
    allbtn.classList.add('btn-outline');
  openbtn.classList.add('btn-outline');
  closebtn.classList.remove('btn-outline');
  closebtn.classList.add('btn-primary');
  }
  
  
}