let displayTimeOne = document.getElementById("displayTimeOne");
let displayTimeTwo = document.getElementById("displayTimeTwo");
let displayTimeThree = document.getElementById("displayTimeThree");
let selectTimeOne = document.getElementById("selectTimeOne");
let selectTimeTwo = document.getElementById("selectTimeTwo");
let displayAlarm = document.getElementById("displayAlarm");
let alarmSound =  document.getElementById("alarmSound");

setInterval(() => {
    let time = new Date()
    displayTimeOne.innerHTML = time.getHours();
    displayTimeTwo.innerHTML = time.getMinutes();
    displayTimeThree.innerHTML = time.getSeconds();

    checkAlarm(time);
});

display = () => {
    if(localStorage.getItem("Time") === null) {
        localStorage.setItem("Time", "[]");
    };

    let Time = JSON.parse(localStorage.getItem("Time"));

    displayAlarm.innerHTML = '';
    Time.forEach((item, index) => {
        displayAlarm.innerHTML += `
            <div id="alarmDiv">
                <div style="margin: 10px 0;">
                    <span>${item.alarmHour} :</span>
                    <span>${item.alarmMinute}</span>
                </div>
                <button onclick="deleteAlarm(${index})">Delete</button>
                <button onclick="editAlarm(${index})">Edit</button>
            </div>
        `;
    });

}
display();

setAlarm = () => {
    let alarmHour = selectTimeOne.value;
    let alarmMinute = selectTimeTwo.value;
    let Alarm = {alarmHour, alarmMinute};
    let Time = JSON.parse(localStorage.getItem("Time"));
    Time.push(Alarm);
    localStorage.setItem("Time", JSON.stringify(Time));

    selectTimeOne.value = "00";
    selectTimeTwo.value = "00";

    display();
};

deleteAlarm = (index) => {
    let Time = JSON.parse(localStorage.getItem("Time"));
    let confirmation = confirm(`Are you sure you want to delete alarm?`);
    if (confirmation) {
        Time.splice(index, 1);
        localStorage.setItem("Time", JSON.stringify(Time));
    } else {
        return;
    };
    
    display();
};

editAlarm = (index) => {
    let Time = JSON.parse(localStorage.getItem("Time"));
    let newHour = prompt("Edit hour", Time[index].alarmHour);
    let newMinute = prompt("Edit minute", Time[index].alarmMinute);
    if(newHour !== null && newMinute !== null){
        Time[index].alarmHour = newHour;
        Time[index].alarmMinute = newMinute;
    };

    localStorage.setItem("Time", JSON.stringify(Time));
    
    display();
};

checkAlarm = (currentTime) => {
    let Time = JSON.parse(localStorage.getItem("Time"));
    Time.forEach((item) => {
        if(currentTime.getHours() == item.alarmHour && currentTime.getMinutes() == item.alarmMinute && currentTime.getSeconds() == 0){
            alarmSound.currentTime = 0;
            alarmSound.play();
        }
    });
};


stopAlarm = () => {
    alarmSound.pause()
}
