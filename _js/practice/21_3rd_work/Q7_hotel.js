// w2 start
const hotel = [];
hotelInitialize(5, 10);
// w2 end

// w7 start
document.getElementById('reset').addEventListener('click', ()=>{
  for (let i = 0; i < hotel.length; i++) {
    for (let j = 0; j < hotel[i].length; j++) {
      let room = hotel[i][j];
      room.checkIn = "";
      room.checkOut = "";
      room.occupied = false;      
    }
  }
  document.getElementById('roomStatus').innerHTML
    = '<h1>모든 방 초기화 완료!</h1>';
  // console.log(hotel);
});
// w7 end

//w6 start
document.getElementById('checkOut').addEventListener('click', ()=>{
  
  //w6-mid
  let roomNum = document.getElementById('roomInput').value; //string
  // let floorIdx = parseInt(roomNum[0])-1;
  // let roomIdx = parseInt(roomNum.substring(1))-1;
  // const room = hotel[floorIdx][roomIdx];

  const room = getRoomObject(roomNum);

  if(room.occupied) { // 사용중
    room.occupied = false;
    room.checkIn = "";
    room.checkOut = new Date();
    document.getElementById('roomStatus').innerHTML
    = `<h1>${roomNum}호 퇴실을 완료 하였습니다!</h1>`;
  }else{ // 빈 방
    document.getElementById('roomStatus').innerHTML
    = '<h1>빈 방입니다!</h1>';
  }
});
//w6 end

//w5 start
document.getElementById('checkIn').addEventListener('click', ()=>{
  
  //w5-mid
  let roomNum = document.getElementById('roomInput').value; //string
  // let floorIdx = parseInt(roomNum[0])-1;
  // let roomIdx = parseInt(roomNum.substring(1))-1;
  // const room = hotel[floorIdx][roomIdx];

  const room = getRoomObject(roomNum);

  if(room.occupied) { // 사용중
    document.getElementById('roomStatus').innerHTML
    = '<h1>사용 중인 방입니다!</h1>';
  }else{ // 빈 방
    room.occupied = true;
    room.checkIn = new Date();
    room.checkOut = '';
    document.getElementById('roomStatus').innerHTML
    = `<h1>${roomNum}호 입실을 완료 하였습니다!</h1>`;
  }
});
//w5 end

//w4 start
document.getElementById('status').addEventListener('click', ()=>{
  let table = '<table border="1">';
  // console.log(hotel.length, hotel[0]);
  for (let i = hotel.length-1; i >= 0; i--) {
    table += '<tr>';
    for (let j = 0; j < hotel[i].length; j++) {
      table += `<td>`;
      table += `<ul>`;
      table += `<li>방번호:${hotel[i][j].rn}</li>`;
      table += `<li>입실시간:${hotel[i][j].checkIn}</li>`;
      table += `<li>퇴실시간:${hotel[i][j].checkOut}</li>`;
      table += `<li>${hotel[i][j].occupied ? "사용중" : "빈 방"}</li>`;
      table += `</ul>`;
      table += `</td>`;
    }
    table += '</tr>';
  }
  table += '</table>';
  document.getElementById('roomStatus').innerHTML = table;
});
//w4 end

//w5,6:mid - start
function getRoomObject(roomNum) {
  let floorIdx = parseInt(roomNum[0])-1;
  let roomIdx = parseInt(roomNum.substring(1))-1;
  return hotel[floorIdx][roomIdx];
}
//w4,5:mid - end

// w3 start
function hotelInitialize(floor, rooms) {
  for (let i = 0; i < floor; i++) {
    let floors = [];
    for (let j = 0; j < rooms; j++) {
      let room = {};
      room.rn = `${i+1}${j < 9 ? "0" : ""}${j+1}`;
      room.checkIn = "";
      room.checkOut = "";
      room.occupied = false;      
      floors[floor.length-1] = room;
    }
    hotel[hotel.length-1] = floors;
  }
  // console.log(hotel);
}
// w3 end