const daysTag = document.querySelector(".days"),
    weeksTag = document.querySelector(".weeks"),
    currentDate = document.querySelector(".current-date"),
    prevNextIcon = document.querySelectorAll(".icons span");

// getting new date, current year and month
let date = new Date(),
    currYear = date.getFullYear(),
    currMonth = date.getMonth();
    currDay  = date.getDay();

// storing full name of all months in array
const months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль",
    "Август", "Сентябрь", " Октябрь", "Ноябрь", "Декабрь"];

const weeks = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

const renderCalendar = () => {
    let firstDayofMonth = new Date(currYear, currMonth, currDay).getDay(), // getting first day of month
        lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month
        lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // getting last day of month
        lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
    let liTag = "";
    let liTag2 = "";
    let indexWeek = 3;

    //for (let i = firstDayofMonth; i > 0; i--) { // creating li of previous month last days
        //liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
        //liTag2 += `<li class="inactive">${weeks[indexWeek]}</li>`;
        //indexWeek++;
    //}

    for (let i = 1; i <= lastDateofMonth; i++) { // creating li of all days of current month
        // adding active class to li if the current day, month, and year matched
        let isToday = i === date.getDate() && currMonth === new Date().getMonth()
        && currYear === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="${isToday}">${i}</li>`;

        liTag2 += `<li class="inactive">${weeks[indexWeek]}</li>`;
        if (indexWeek == 6) indexWeek = 0;
        else indexWeek++;
    }

    //for (let i = lastDayofMonth; i < 6; i++) { // creating li of next month first days
        //liTag += `<li class="inactive">${i - 20 + 1}</li>`
    //}
    currentDate.innerText = `${months[currMonth]} ${currYear}`; // passing current mon and yr as currentDate text
    daysTag.innerHTML = liTag;
    weeksTag.innerHTML = liTag2;
}
renderCalendar();

prevNextIcon.forEach(icon => { // getting prev and next icons
    icon.addEventListener("click", () => { // adding click event on both icons
        // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

        if(currMonth < 0 || currMonth > 11) { // if current month is less than 0 or greater than 11
            // creating a new date of current year & month and pass it as date value
            date = new Date(currYear, currMonth);
            currYear = date.getFullYear(); // updating current year with new date year
            currMonth = date.getMonth(); // updating current month with new date month
        } else {
            date = new Date(); // pass the current date as date value
        }
        renderCalendar(); // calling renderCalendar function
    });
});