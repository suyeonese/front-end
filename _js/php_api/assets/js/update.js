async function deleteItemOfServer(ino){
    try {
      const url ='http://littlemore.dothome.co.kr/api/items/delete';
      const config = {
        method: 'POST',
        Headers: {
          'Accept':'application/json', 
          'Content-Type':'application/x-www-form-urlencoded'
        },
        body: JSON.stringify({id:ino})
      };
      const resp = await fetch(url, config);
      const result = await resp.json();
      return await result;
  } catch (error) {
    console.log(error);
  }
}

document.getElementById('delBtn').addEventListener('click', (e) => {
  e.preventDefault();
  // ino 구하는 방법 
  // let ino = e.target.dataset.ino;  
  // document.getElementById('delBtn').dataset.ino = ino;, let ino = document.getElementById('id').value; 
  // let queryString = location.search;, let ino = queryString.substring(queryString.indexOf('=')+1);
  
  deleteItemOfServer(e.target.dataset.ino).then(result => {
    console.log(result);
    alert(result.message);
    debugger;
    location.replace('index.html');
  }); 
});

document.addEventListener('DOMContentLoaded', () => {
    // console.log(location.search); // queryString 값이 나옴 (약속 된 언어임)
    let queryString = location.search;
    let ino = queryString.substring(queryString.indexOf('=')+1);
    document.getElementById('delBtn').dataset.ino = ino;

    getItemViewFromServer(ino).then(result => { // 실행
      // console.log(result.items[0]); 
      const item = result.items[0];
      
      const inputs = document.querySelectorAll('.needs-validation input');
      inputs.forEach(input => {
        input.value = item[input.id];
      });
      
      // document.getElementById('id').value = item.id;
      // document.getElementById('name').value = item.name;
      // document.getElementById('price').value = item.price;
      // document.getElementById('description').value = item.description;

      
      // 카테고리 옵션은 어떻게?
      let optionList = document.querySelectorAll('#category option');
      optionList.forEach(option => { // 배열 => forEach
        if(option.value == item.category_id){
          option.setAttribute('selected', true);
        }
      });
    });    
});

  async function getItemViewFromServer(ino){ // 선언
  try {
    const resp = await fetch("http://littlemore.dothome.co.kr/api/items/read/"+ino);
    const respText = await resp.text();
    const itemObj = await JSON.parse(respText);
    return await itemObj;
  } catch (error) {
    console.log(error);
  }
}

async function updateItemToServer(itemObj) {
  try {
    const url ='http://littlemore.dothome.co.kr/api/items/update';
    const config = {
      method: 'POST',
      Headers: {
        'Accept':'application/json', 
        'Content-Type':'application/x-www-form-urlencoded'
      },
      body: JSON.stringify(itemObj)
    };
    const resp = await fetch(url, config);
    const result = await resp.json();
    return await result;
  } catch (error) {
    console.log(error);
  }
}

document.querySelector('button.w-100').addEventListener('click', (e) => {
  e.preventDefault();
  const inputs = document.querySelectorAll('.needs-validation input');

  let itemObj = {};
  // itemObj.id = ino; // 아래 처럼 html에서 가져오게 수정하겠음. update.html의 100라인 <input type="hidden" id="id" value="">  => 9번, document.getElementById('id').value = ino; => ino는 item.id로

  inputs.forEach(elem => {
    itemObj[elem.id] = elem.value; //  html에서 가져온 값
  });

  // let cateSelect = document.getElementById('category');
  // let selectedValue = cateSelect.options[cateSelect.options.selectedIndex].value;
  // itemObj.category = selectedValue;

  itemObj.category_id = document.querySelector('#category option:checked').value;

  console.log(itemObj);
  // debugger;

  const now = new Date();
  let createNow = `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
  itemObj.modifed = createNow;

  console.log(itemObj);

  updateItemToServer(itemObj).then(result => {
    console.log(result);
    alert(result.message);
    // location.replace('index.html');
  }  
  );
});
