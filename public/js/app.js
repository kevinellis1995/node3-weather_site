console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form');
const searchItem = document.querySelector('input');
const message1 = document.getElementById('p1');
const message2 = document.getElementById('p2');

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    const location = searchItem.value;

    message1.textContent = 'Loading';
    message2.textContent = '';

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                message1.textContent = data.error;
            } else {
                message1.textContent = data.location;
                message2.textContent = data.title + ', ' + data.temp + ', ' + data.precip
            }
        })
    });

});