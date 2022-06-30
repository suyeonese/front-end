let sbmBtn = document.getElementById('sbmBtn');
let printBtn = document.getElementById('printBtn');

const dataobj = {};

function getDatas() {
    let uname = document.getElementById('uname').value;
    let addr = document.getElementById('addr').value;
    let favor1 = document.getElementById('favor1').value;
    let favor2 = document.getElementById('favor2').value;
    let favor3 = document.getElementById('favor3').value;
    let email = document.getElementById('email').value;
    let pet = document.getElementById('pet').value;
    let wanna = document.getElementById('wanna').value;
    
    dataobj.uname = uname;
    dataobj.addr = addr;
    dataobj.favors= {}; // {} 초기화
    dataobj.favors.favor1 = favor1;
    dataobj.favors.favor2 = favor2;
    dataobj.favors.favor3 = favor3;
    dataobj.email = email;
    dataobj.pet = pet;
    dataobj.wanna = wanna;
    console.log(dataobj);
}
function printDatas() {
    document.getElementById('unameVal').innerText = dataobj.uname;
    document.getElementById('addrVal').innerText = dataobj.addr;
    document.getElementById('emailVal').innerText = dataobj.email;
    document.getElementById('petVal').innerText = dataobj.pet;
    document.getElementById('wannaVal').innerText = dataobj.wanna;
    let str = `<li>${dataobj.favors.favor1}</li>`;
    str += `<li>${dataobj.favors.favor2}</li>`;
    str += `<li>${dataobj.favors.favor3}</li>`;
    document.getElementById('favors').innerHTML = str;
}