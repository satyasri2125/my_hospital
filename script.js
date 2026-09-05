let patients = JSON.parse(localStorage.getItem("patients")) || [];
let doctors = JSON.parse(localStorage.getItem("doctors")) || [];
let apps = JSON.parse(localStorage.getItem("apps")) || [];
let bills = JSON.parse(localStorage.getItem("bills")) || [];
let meds = JSON.parse(localStorage.getItem("meds")) || [];
let tests = JSON.parse(localStorage.getItem("tests")) || [];
let rooms = JSON.parse(localStorage.getItem("rooms")) || [];

let editP = null;
let editD = null;

// NAV
function show(id){
document.querySelectorAll(".page").forEach(p=>p.classList.add("d-none"));
document.getElementById(id).classList.remove("d-none");
updateDashboard();
}

// DARK MODE
function toggleDarkMode(){
document.body.classList.toggle("dark");
}

// ================= PATIENT CRUD =================
function addPatient(){
let name=document.getElementById("pname").value;
let age=document.getElementById("page").value;

if(editP){
patients = patients.map(p=>p.id===editP?{...p,name,age}:p);
editP=null;
}else{
patients.push({id:Date.now(),name,age});
}

save();
renderPatients();
}

function renderPatients(){
document.getElementById("ptbl").innerHTML =
patients.map(p=>
`<tr>
<td>${p.name}</td>
<td>${p.age}</td>
<td>
<button onclick="editPatient(${p.id})" class="btn btn-primary">Edit</button>
<button onclick="delPatient(${p.id})" class="btn btn-danger">Del</button>
</td>
</tr>`).join("");
}

function editPatient(id){
let p=patients.find(x=>x.id===id);
document.getElementById("pname").value=p.name;
document.getElementById("page").value=p.age;
editP=id;
}

function delPatient(id){
patients=patients.filter(p=>p.id!==id);
save();renderPatients();
}

// ================= DOCTOR CRUD =================
function addDoctor(){
let name=document.getElementById("dname").value;
let spec=document.getElementById("dspec").value;

if(editD){
doctors = doctors.map(d=>d.id===editD?{...d,name,spec}:d);
editD=null;
}else{
doctors.push({id:Date.now(),name,spec});
}

save();
renderDoctors();
}

function renderDoctors(){
document.getElementById("dtbl").innerHTML =
doctors.map(d=>
`<tr>
<td>${d.name}</td>
<td>${d.spec}</td>
<td>
<button onclick="editDoctor(${d.id})" class="btn btn-primary">Edit</button>
<button onclick="delDoctor(${d.id})" class="btn btn-danger">Del</button>
</td>
</tr>`).join("");
}

function editDoctor(id){
let d=doctors.find(x=>x.id===id);
document.getElementById("dname").value=d.name;
document.getElementById("dspec").value=d.spec;
editD=id;
}

function delDoctor(id){
doctors=doctors.filter(d=>d.id!==id);
save();renderDoctors();
}

// ================= APPOINTMENTS =================
function addApp(){
apps.push({id:Date.now(),name:document.getElementById("app").value});
save();
renderApps();
}

function renderApps(){
document.getElementById("atbl").innerHTML =
apps.map(a=>`<tr><td>${a.name}</td></tr>`).join("");
}

// ================= BILLING =================
function addBill(){
bills.push({amount:+document.getElementById("bill").value});
save();
updateDashboard();
}

function downloadPDF(){
const {jsPDF}=window.jspdf;
let doc=new jsPDF();
doc.text("Hospital Bill",10,10);
doc.text("Total Bills: "+bills.length,10,20);
doc.save("bill.pdf");
}

// ================= MODULES =================
function addMed(){
meds.push(document.getElementById("med").value);
save();
document.getElementById("medlist").innerHTML=meds.map(m=>`<li>${m}</li>`).join("");
}

function addTest(){
tests.push(document.getElementById("test").value);
save();
document.getElementById("testlist").innerHTML=tests.map(t=>`<li>${t}</li>`).join("");
}

function addRoom(){
rooms.push(document.getElementById("room").value);
save();
document.getElementById("roomlist").innerHTML=rooms.map(r=>`<li>${r}</li>`).join("");
}

// ================= LOGIN =================
function login(){
if(user.value==="admin" && pass.value==="1234"){
msg.innerText="Login Success";
}else{
msg.innerText="Invalid";
}
}

// ================= SAVE =================
function save(){
localStorage.setItem("patients",JSON.stringify(patients));
localStorage.setItem("doctors",JSON.stringify(doctors));
localStorage.setItem("apps",JSON.stringify(apps));
localStorage.setItem("bills",JSON.stringify(bills));
localStorage.setItem("meds",JSON.stringify(meds));
localStorage.setItem("tests",JSON.stringify(tests));
localStorage.setItem("rooms",JSON.stringify(rooms));
}

// ================= DASHBOARD =================
function updateDashboard(){

pCount.innerText=patients.length;
dCount.innerText=doctors.length;
aCount.innerText=apps.length;

let total=bills.reduce((a,b)=>a+b.amount,0);
rCount.innerText=total;

new Chart(chart,{
type:"bar",
data:{
labels:["Patients","Doctors","Appointments"],
datasets:[{data:[patients.length,doctors.length,apps.length]}]
}
});

new Chart(reportChart,{
type:"pie",
data:{
labels:["Revenue","Other"],
datasets:[{data:[total,100]}]
}
});
}

// INIT
renderPatients();
renderDoctors();
renderApps();
updateDashboard();