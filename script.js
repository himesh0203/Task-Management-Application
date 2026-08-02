async function login(){

const r=await fetch("/login",{

method:"POST",

headers:{"Content-Type":"application/json"},

body:JSON.stringify({

username:user.value,

password:pass.value

})

});

const d=await r.json();

if(d.success){

login.style.display="none";

app.style.display="block";

load();

}

else{

alert("Wrong Login");

}

}

async function load(){

const res=await fetch("/tasks");

const tasks=await res.json();

list.innerHTML="";

tasks.forEach(t=>{

list.innerHTML+=`

<li class="${t.completed?"done":""}">

${t.title}

<div>

<button onclick="toggle(${t.id})">✔</button>

<button onclick="del(${t.id})">❌</button>

</div>

</li>`;

});

}

async function addTask(){

await fetch("/tasks",{

method:"POST",

headers:{"Content-Type":"application/json"},

body:JSON.stringify({

title:task.value

})

});

task.value="";

load();

}

async function toggle(id){

await fetch("/tasks/"+id,{

method:"PUT"

});

load();

}

async function del(id){

await fetch("/tasks/"+id,{

method:"DELETE"

});

load();

}
