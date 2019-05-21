// let getUsers = document.getElementById('btnRead');
let table = document.getElementById('table');
let addUser = document.getElementById('addUser');
let userName = document.getElementById('newUser');


addUser.addEventListener('click', createUser);
window.addEventListener('load', onSubmit);


function clearTable () {
  let parent = table;
  let rows = document.getElementsByTagName('tr');

  for (let i = rows.length - 1; i >= 0; i--) {
    parent.removeChild(rows[i]);
  };
};

function addRow (data) {
  clearTable();

  data = JSON.parse(data);
  //create head rows
  let tr = document.createElement('tr');

  for(key in data[0]) {
    let th = document.createElement('th');
    th.innerHTML = key;

    tr.appendChild(th);
  };
  table.appendChild(tr);

  data.forEach(user => {
    let tr = document.createElement('tr');

    for(key in user) {
      let td = document.createElement('td');
      td.innerHTML = user[key];
      tr.appendChild(td);
    };

    table.appendChild(tr);
  });
};


function createUser(e) {
    let xhr = new XMLHttpRequest();
    let user ={
      name: userName.value
    };
    userName.value = '';
    e.preventDefault();
    user = JSON.stringify(user);

    xhr.open('POST', '/users', true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    xhr.send(user);
    xhr.onload = () => {
      console.log(xhr.responseText);
      onSubmit();
    };
};

function onSubmit(e) {
  let xhr = new XMLHttpRequest();
  // e.preventDefault();

    xhr.open('GET', '/users', true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    xhr.send('');
    xhr.onload = () => {
      addRow(xhr.responseText);
    };
}
