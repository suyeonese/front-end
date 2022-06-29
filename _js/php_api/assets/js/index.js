async function getItemViewFromServer(ino){
  try {
    const resp = await fetch("http://littlemore.dothome.co.kr/api/items/read/"+ino); // read/ 뒤에 숫자를 넣어놓으면 서버에서 번호에 해당하는 것만 불러오도록 선생님이 서버를 만들어 놓은 것
    const respText = await resp.text();
    const itemObj = await JSON.parse(respText);
    return await itemObj;
  } catch (error) {
    console.log(error);
  }
}

async function getItemListFromServer() {
  try {
    const url = "http://littlemore.dothome.co.kr/api/items/read";
    const resp = await fetch(url);
    const respText = await resp.text();
    const itemsObj = await JSON.parse(respText);
    return await itemsObj;
  } catch (error) {
    console.log(error);

  }
}
function printItemList(itemArray) {
  let str = ``;
  itemArray.forEach(itemObj => {
    str += `<div class="col">
    <div class="card shadow-sm">
      <div class="card-body">
        <p class="card-text">${itemObj.name}</p>
        <div class="d-flex justify-content-between align-items-center">
          <div class="btn-group">
            <button type="button" data-ino="${itemObj.id}" class="btn btn-sm btn-outline-info viewBtn">View</button>
            <button type="button" data-ino="${itemObj.id}" class="btn btn-sm btn-outline-warning editBtn">Edit</button>
          </div>
          <small class="text-muted">${itemObj.price}</small>
        </div>
      </div>
    </div>
  </div>`;
  });
  document.getElementById('itemListArea').innerHTML = str;
}

function printItemObject(item) {
  let str = `<h2 class="pb-2 border-bottom">Item Details</h2>

  <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 py-5">
    <div class="col d-flex align-items-start">
      <svg class="bi text-muted flex-shrink-0 me-3" width="1.75em" height="1.75em"><use xlink:href="#bootstrap"/></svg>
      <div>
        <h4 class="fw-bold mb-0">ID</h4>
        <p>${item.id}</p>
      </div>
    </div>
    <div class="col d-flex align-items-start">
      <svg class="bi text-muted flex-shrink-0 me-3" width="1.75em" height="1.75em"><use xlink:href="#cpu-fill"/></svg>
      <div>
        <h4 class="fw-bold mb-0">Name</h4>
        <p>${item.name}</p>
      </div>
    </div>
    <div class="col d-flex align-items-start">
      <svg class="bi text-muted flex-shrink-0 me-3" width="1.75em" height="1.75em"><use xlink:href="#calendar3"/></svg>
      <div>
        <h4 class="fw-bold mb-0">Description</h4>
        <p>${item.description}</p>
      </div>
    </div>
    <div class="col d-flex align-items-start">
      <svg class="bi text-muted flex-shrink-0 me-3" width="1.75em" height="1.75em"><use xlink:href="#home"/></svg>
      <div>
        <h4 class="fw-bold mb-0">Price</h4>
        <p>${item.price}</p>
      </div>
    </div>
    <div class="col d-flex align-items-start">
      <svg class="bi text-muted flex-shrink-0 me-3" width="1.75em" height="1.75em"><use xlink:href="#speedometer2"/></svg>
      <div>
        <h4 class="fw-bold mb-0">Category</h4>
        <p>${item.category_id}</p>
      </div>
    </div>
    <div class="col d-flex align-items-start">
      <svg class="bi text-muted flex-shrink-0 me-3" width="1.75em" height="1.75em"><use xlink:href="#toggles2"/></svg>
      <div>
        <h4 class="fw-bold mb-0">Created Date</h4>
        <p>${item.created}</p>
      </div>
    </div>
    <div class="col d-flex align-items-start">
      <svg class="bi text-muted flex-shrink-0 me-3" width="1.75em" height="1.75em"><use xlink:href="#geo-fill"/></svg>
      <div>
        <h4 class="fw-bold mb-0">Modified Date</h4>
        <p>${item.modified}</p>
      </div>
    </div>     
  </div>`;
  document.getElementById('icon-grid').innerHTML = str;

}

// item details 불러오기 (동적으로 생기니까 이벤트리스너로 해보쟝)
document.addEventListener('click', (e) => {
  if(e.target.classList.contains('viewBtn')){
    // let ino = e.target.dataset.ino;
    // console.log(ino); // 몇번 정보값을 가져오는지 확인
    getItemViewFromServer(e.target.dataset.ino).then(result=>{
      // console.log(result.items[0]);
      printItemObject(result.items[0]); // item object
    });
  } else if (e.target.classList.contains('editBtn')) { 
     location.href = 'update.html?ino='+e.target.dataset.ino; // 클릭하면 페이지 이동 (새창), get 방식
  }
});

// list 불러오기
document.getElementById('listBtn').addEventListener('click', (e) => {
  e.preventDefault();
  getItemListFromServer().then(result => {
    // console.log(result);
    console.log(result.items);
    // const itemList = result.items; // item List = Array
    printItemList(result.items); // function printItemList(items) => items = result.items
  });
});
