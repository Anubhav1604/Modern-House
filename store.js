let checkout_data = document.getElementById('checkout_data');
let checkout = document.getElementById('checkout');
let checkin_data = document.getElementById('checkin_data');
let checkin = document.getElementById('checkin');

checkin.addEventListener('change', () => {
    let checkin_value = checkin.value;
    // console.log(checkin_value);

    let dates = new Date(checkin_value);
    let dates2 = new Date();

    const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let day = week[dates.getDay()];

    let date = dates.getDate();

    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    let month = months[dates.getMonth()];

    if (dates < dates2) {
        console.log('No Date');

    }
    else {
        checkin_data.innerText = day + ', ' + date + ' ' + month;
    }
})
checkout.addEventListener('change', () => {
    let checkout_value = checkout.value;
    let checkin_value = checkin.value;
    // console.log(checkin_value);

    let dates = new Date(checkout_value);
    let dates2 = new Date(checkin_value);


    const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let day = week[dates.getDay()];

    let date = dates.getDate();

    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    let month = months[dates.getMonth()];

    if (dates < dates2) {
        console.log('No Date');

    }
    else {
        console.log(day + ', ' + date + ' ' + month)
        
        checkout_data.innerText = day + ', ' + date + ' ' + month;
    }
})

let checkin_more = document.getElementById('checkin_more');
let checkin_less = document.getElementById('checkin_less');

checkin.more.addEventListener('click', ()=>
{
    const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var  months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    let today = new Date();
    
})
