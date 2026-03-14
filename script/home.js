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
const searchBtn=document.getElementById('search-btn')



function toggle(a){
  if(a=='all-btn'){
   
  allbtn.classList.remove('btn-outline');
   openbtn.classList.remove('btn-primary')
  openbtn.classList.add('btn-outline');
  closebtn.classList.add('btn-outline');
  closebtn.classList.remove('btn-primary')
  allbtn.classList.add('btn-primary');
  }else if(a=='open-btn'){
    allbtn.classList.remove('btn-primary')
    allbtn.classList.add('btn-outline');
  openbtn.classList.remove('btn-outline');
  closebtn.classList.remove('btn-primary')
  closebtn.classList.add('btn-outline');
  openbtn.classList.add('btn-primary');
  }else if(a=='closed-btn'){
    allbtn.classList.remove('btn-primary')
    allbtn.classList.add('btn-outline');
  openbtn.classList.add('btn-outline');
  openbtn.classList.remove('btn-primary')
  closebtn.classList.remove('btn-outline');
  closebtn.classList.add('btn-primary');
  }else if(a=='search-btn'){
    allbtn.classList.remove('btn-primary')
    allbtn.classList.add('btn-outline')
    openbtn.classList.remove('btn-primary')
    openbtn.classList.add('btn-outline')
    closebtn.classList.remove('btn-primary')
    closebtn.classList.add('btn-outline')
  }
  
  
}

const spinner=(status)=>{
  if(status==true){
    document.getElementById('spinner').classList.remove("hidden")
    allSection.classList.add("hidden")
  }else{
    document.getElementById('spinner').classList.add("hidden")
    allSection.classList.remove("hidden")
  }
}


async function loadAllIssues() {
  spinner(true)
  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );
  const data = await res.json();
  all=data.data
  open=all.filter((a)=>a.status==="open")
  Closed=all.filter((a)=>a.status==="closed")
  
 displayIssues(all)
}

function re(){
  if(current==="all-btn"){
    displayIssues(all)
  }else if(current==="open-btn"){
    displayIssues(open)
  }else{
    displayIssues(Closed)
  }
}


document.getElementById('open-btn').addEventListener('click',()=>{
                    
                    current='open-btn'
                    re()
                  })
  document.getElementById('closed-btn').addEventListener('click',()=>{
                    current='closed-btn'
                    re()
                  })
  document.getElementById('all-btn').addEventListener('click',()=>{
                    
  current='all-btn'
  re()
})

async function singleIssues(id) {
  spinner(true)
  const res = await fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`,
  );
  const data = await res.json();
  modal(data.data);
  
}
// 
async function modal(a) {
  const modal = document.getElementById("box");
  modal.innerHTML = "";
  const modalCard = document.createElement("div");
  modalCard.innerHTML = `
  <div class="modal-box ">
  <h3 class="text-xl font-bold">${a.title}</h3>
  <div class=" flex items-center gap-1  mb-2">
  <div><p class=" text-center text-white  rounded-full px-1 text-sm  ${a.status === "open" ? "bg-green-500" : "bg-purple-500"}"> ${a.status}</p></div>
  <div class="flex flex-wrap items-center">
  <p class="flex text-sm ">Opened by  <span>${a.author}.</span></p>
                <p class="flex text-sm "><span>${new Date(a.createdAt).toLocaleDateString("en-GB")}</span></p>
                </div>
                </div>
                
                <div class="flex gap-2 my-1">
                <div class="text-sm ">
                ${
                  a.labels[0]
                  ? ` <p class="bg-red-100 rounded-full border border-red-500 text-red-500  px-1 font-bold uppercase ">${a.labels[0].toLowerCase() === "bug" ? '<i class="fa-solid fa-bug"></i>' : '<i class="fa-solid fa-wand-magic-sparkles"></i>'}
                  <span>${a.labels[0]}</span>
                  </p>`
                  : ""
                }
                </div>
                <div class="text-sm ">
                ${
                  a.labels[1]
                  ? ` <p class="bg-yellow-100 rounded-full  border border-yellow-500 text-yellow-500 px-1">
                  <span><i class="fa-regular fa-life-ring"></i>${a.labels[1]}</span>
                  </p>`
                  : ""
                }
                </div>
                </div>
                
                <p class="">${a.description}</p>
                <div class="flex justify-between my-2 bg-gray-100 rounded-lg p-2">
                <div>
                ${
                  a.assignee
                  ? `<p>assignee:</p>
                  <p class="text-xl font-bold">${a.assignee}</p>`
                  : ""
                }
                
                    </div>
                    <div class="flex flex-col items-center ">
                    <p>Priority</p>
                    <h1 class="${a.priority === "high" ? "bg-red-100 text-red-500" : a.priority === "medium" ? "bg-yellow-100 text-yellow-500" : "bg-gray-200 text-gray-500"}  px-2  rounded-full">${a.priority}</h1>
                    </div>
                    </div>
                    <div class="modal-action">
                    <form method="dialog">
                    <!-- if there is a button in form, it will close the modal -->
                    <button class="btn">Close</button>
                    </form>
                    </div>
                    `;
                    modal.append(modalCard);
                    spinner(false)
                    my_modal_5.showModal()
                  }
                  // 


const displayIssues=(issues)=>{
  allSection.innerHTML=""
  count.innerText=issues.length
  for(let issue of issues )
    { const img=issue.status === "open" ? "assets/Open-Status.png" : "assets/Closed-Status .png"  
      const div=document.createElement("div")
      div.className="space-y-2 shadow-2xs p-1 rounded-lg"
      div.style.borderTop=issue.status === "open" ? "3px solid #00A96E" : "3px solid #A855F7";
      div.style.borderRadius='8px'
      div.innerHTML=`
      <div onclick=" singleIssues(${issue.id})">  
      <div class="pt-1 flex  justify-between items-center">
      <div>
      <img width="25px" src="${img}" alt="">
      </div
      <p class="font-extrabold">${issue.priority}</p>  
      </div>  
      <div class="space-y-1">
      <h2 class="font-bold">${issue.title}</h2>
      <p class="text-[#64748B]">${issue.description}</p>
      </div>  
      <div class="flex gap-1 mt-1 mb-1">
      <div>
      ${
        issue.labels[0]
        ? ` <p class="flex items-center text-sm bg-red-50 rounded-full border-1 border-red-500 text-red-500  p-0.5  uppercase ">${issue.labels[0].toLowerCase() === "bug" ? '<i class="fa-solid fa-bug"></i>' : '<i class="fa-solid fa-wand-magic-sparkles"></i>'}
        <span>${issue.labels[0]}</span>
        </p>`
        : ""
      }
      </div>
      <div>
      ${
        issue.labels[1]
        ? ` <p class="flex items-center text-sm bg-yellow-50 rounded-full  border-1 border-yellow-500 text-yellow-500 p-0.5">
        <span><i class="fa-regular fa-life-ring"></i>${issue.labels[1]}</span>
        </p>`
        : ""
      }
      </div>
      </div>   
      <div class="date py-2 border-t border-[#64748B]">
      <p class="">#${issue.id} by ${issue.author}</p>
      <p class="">${new Date(issue.createdAt).toLocaleDateString()}</p>
      </div>     
      </div> 
      `  
      allSection.append(div)  
      
    }
    spinner(false)
  }
  
  
  loadAllIssues()


  
  document.getElementById("search-btn").addEventListener("click", () => {
    
  const input = document.getElementById("input-search");
  const searchValue = input.value.trim().toLowerCase();
  console.log(searchValue);

  fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`)
    .then((res) => res.json())
    .then((data) => {
      const searchIssues = data.data;
      
      const filterIssues = searchIssues.filter((a) =>
        a.title.toLowerCase().includes(searchValue)
      );

      displayIssues(filterIssues);
    });
});
