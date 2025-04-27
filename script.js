const currentdate = new Date();
const date_element = document.getElementById("date_time");

function refresh_window(){
    window.setTimeout(function(){
        window.location.reload();
    },10000)
}

function update_DateTime(){
date_element.innerHTML = "Date: " + currentdate.toLocaleDateString() + " Time: " + currentdate.toLocaleTimeString();
refresh_window();
}

update_DateTime();