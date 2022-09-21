export const clock = function() {
    const hoursContainer = document.getElementById('hours');
    const minutesContainer = document.getElementById('minutes');
    const secondsContainer = document.getElementById('seconds');
    const date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    if (hours < 10) {
        hours = '0' + hours;
    }
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    if (seconds < 10) {
        seconds = '0' + seconds;
    }

    hoursContainer.innerHTML = hours;
    minutesContainer.innerHTML = minutes;
    secondsContainer.innerHTML = seconds;

    //time.innerHTML = `${hours}:${minutes}:${seconds}`;
}



export default clock;