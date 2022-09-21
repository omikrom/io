const date = function() {
    const dateContainer = document.getElementById('date');
    const date = new Date();
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var weekday = days[date.getDay()];
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var monthName = months[date.getMonth()];
    var ordinal = ['th', 'st', 'nd', 'rd'];
    const day = date.getDate();
    var currentDay = day
    if (currentDay == 1 || currentDay == 21 || currentDay == 31) {
        currentDay = day + ordinal[1];
    } else if (currentDay == 2 || day == 22) {
        currentDay = day + ordinal[2];
    } else if (currentDay == 3 || day == 23) {
        currentDay = day + ordinal[3];
    } else {
        currentDay = day + ordinal[0];
    }
    const year = date.getFullYear();
    dateContainer.innerHTML = `${weekday}, ${currentDay} ${monthName}, ${year}`;
}


export default date;