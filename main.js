//DOM Elements
const time=document.getElementById('time'),
    greeting=document.getElementById('greeting'),
    name=document.getElementById('name'),
    focus=document.getElementById('focus'),
    date=document.getElementById('date');

const button = document.querySelector('.button_picture_change');
let today=new Date(),
            hour =today.getHours();
let i=Number(hour)+1;

const   all_pics=["1.jpg","2.jpg","3.jpg", "4.jpg", "5.jpg","6.jpg","7.jpg","8.jpg","9.jpg", "10.jpg", "11.jpg","12.jpg",
                    "13.jpg","14.jpg","15.jpg", "16.jpg", "17.jpg","18.jpg","19.jpg","20.jpg","21.jpg", "22.jpg", "23.jpg","24.jpg"],
        morning_pictures=["url(assets/morning/1.jpg)","url(assets/morning/2.jpg)","url(assets/morning/3.jpg)",
                            "url(assets/morning/4.jpg)", "url(assets/morning/5.jpg)","url(assets/morning/6.jpg)"],
        afternoon_pictures=["1.jpg","2.jpg","3.jpg", "4.jpg", "5.jpg","6.jpg"],
        evening_pictures=["url(assets/evening/1.jpg)","url(assets/evening/2.jpg)","url(assets/evening/3.jpg)",
                            "url(assets/evening/4.jpg)", "url(assets/evening/5.jpg)","url(assets/evening/6.jpg)"],
        night_pictures=["url(assets/night/1.jpg)","url(assets/night/2.jpg)","url(assets/night/3.jpg)",
                        "url(assets/night/4.jpg)", "url(assets/night/5.jpg)","url(assets/night/6.jpg)"];


//Show Time
function showTime(){
    const days=['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            months=['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
                    'September', 'October', 'November', 'December'];

    let today=new Date(),
        hour=today.getHours(),
        min= today.getMinutes(),
        sec= today.getSeconds(),
        weekDay= today.getDay(),
        date_num= today.getDate(),
        month= today.getMonth();

    //Output Time
    time.innerHTML=`${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;
    date.innerHTML=days[`${weekDay}`]+`<span>, </span>${date_num}<span> </span>`+months[`${month}`];
    setTimeout(showTime, 1000);
}

//Add Zeros
function addZero(n){
    return (parseInt(n, 10)< 10 ? '0': '') +n;
}

//Set Background and Greeting
function setBG() {
    let today = new Date(),
        hour = today.getHours();
    let way = 'assets/allPics/' + all_pics[Number(hour)];
    document.body.style.backgroundImage = `url(${way})`;
    document.body.style.backgroundSize = "100% 100%";
    if (6 <= hour && hour < 12) {
        //Morning
        greeting.textContent = 'Good morning, ';
        document.body.style.color = 'black';
    } else if (12 <= hour && hour < 18) {
        //Afternoon
        greeting.textContent = 'Good afternoon, ';
        document.body.style.color = 'black';
    } else if (18 <= hour && hour < 24) {
        //Evening
        greeting.textContent = 'Good evening, ';
        document.body.style.color = 'white';
    } else {
        greeting.textContent = 'Good night, ';
        document.body.style.color = 'white';
    }
    setTimeout(setBG, 1000 * 3600);
}
//Image change with button
function viewBgImage(data) {
  const body = document.querySelector('body');
  const src = data;
  const img = document.createElement('img');
  img.src = src;
  img.onload = () => {
    body.style.backgroundImage =`url(${src})`;
    body.style.backgroundSize="100% 100%";
  };
}

function getImage() {
    let imageSrc ='';
        const index = i % all_pics.length;
          imageSrc ='assets/allPics/'+all_pics[index];
          viewBgImage(imageSrc);
          i++;
          button.disabled = true;
          setTimeout(function() { button.disabled = false }, 1000);

}


//Get Name
function getName(){
    if (localStorage.getItem('name')===null){
        name.textContent='[Enter name]';
    }else{
        name.textContent = localStorage.getItem('name')
    }
}

//SetName
function setName(e){
    if (e.type==='keypress'){
        if (e.which == 13 || e.keyCode ==13) {
            localStorage.setItem('name', e.target.innerText);
            name.blur();
            updateName();
        }
    }else{
        localStorage.setItem('name', e.target.innerText);
        updateName();
    }
}

function updateName() {
  if(name.textContent === "") {
    name.textContent = "[Enter Name]";
  }
}


//Get Focus
function getFocus(){
    if (localStorage.getItem('focus')===null){
        focus.textContent='[Enter focus]';
    }else{
        focus.textContent = localStorage.getItem('focus')
    }
}

//Set Focus
function setFocus(e){
    if (e.type==='keypress'){
        if (e.which == 13 || e.keyCode ==13) {
            localStorage.setItem('focus', e.target.innerText);
            focus.blur();
            updateFocus();
        }
    }else{
        localStorage.setItem('focus', e.target.innerText);
        updateFocus();
    }
}

function updateFocus() {
  if(focus.textContent === '') {
    focus.textContent = '[Enter Focus]';
  }
}

//Quote
const blockquote = document.querySelector('blockquote');
const figcaption = document.querySelector('figcaption');
const button_quote = document.querySelector('.button_quote_change');

async function getQuote() {
  const url = `https://favqs.com/api/qotd`;
  const res = await fetch(url);
  const data = await res.json();
  blockquote.textContent = data.quote.body;
  figcaption.textContent = data.quote.author;
}
document.addEventListener('DOMContentLoaded', getQuote);
button_quote.addEventListener('click', getQuote);

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);
button.addEventListener('click', getImage);

//Run
showTime();
setBG();
getName();
getFocus();