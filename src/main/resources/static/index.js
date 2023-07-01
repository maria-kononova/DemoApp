const daysTag = document.querySelector(".days"),
    weeksTag = document.querySelector(".weeks"),
    monthView = document.querySelector(".monthView"),

    prevNextIcon = document.querySelectorAll(".icons span");

// getting new date, current year and month
let date = new Date(),
    currYear = date.getFullYear(),
    currMonth = date.getMonth(),
    currDay  = date.getDate(),
    indexWeek = date.getDay(),
    dateList = new Map();

// storing full name of all months in array
const months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль",
    "Август", "Сентябрь", " Октябрь", "Ноябрь", "Декабрь"];

const weeks = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];

const renderCalendar = () => {
    dateList.clear();
    let firstDayofMonth = new Date(currYear, currMonth, currDay).getDay(), // getting first day of month
        lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month
        lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // getting last day of month
        lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
    let liTag = "";
    let liTag2 = "";

    let days = [];
    let count = 0;
    for(let i = currDay; i <= lastDateofMonth; i++)
    {
        if (count < 10)
        {
            days.push(i);
            count++;
        }
        else break;
    }
    dateList.set(currYear+"-"+currMonth, days);
    if (count < 10)
    {
        let overDays = [];
        for(let i = 1; i <= 10 - count; i++)
        {
            overDays.push(i);
        }
        if (currMonth+1==12)
        {
            dateList.set(currYear+1+"-0", overDays);
        }
        else dateList.set(currYear+"-"+ (currMonth+1), overDays);
    }
    let monthString = "";
    let state = true;
    for( let [yearMonth, Days] of dateList)
    {
        let month = yearMonth.split('-')[1];
        if (state)
        {
            monthString+= months[month] + " " + yearMonth.split('-')[0];
            state = false;
        }
        else {
            monthString+= " - " + months[month] + " " + yearMonth.split('-')[0];
        }
        for (let i = 0; i < Days.length; i++) {
            let isToday = Days[i] === date.getDate() && currMonth === new Date().getMonth()
            && currYear === new Date().getFullYear() ? "active" : "";
            liTag += `<li class="${isToday}">${Days[i]}</li>`;
            liTag2 += `<li class="inactive">${weeks[indexWeek]}</li>`;
            if (indexWeek === 6) indexWeek = 0;
            else indexWeek++;
        }
    }
    monthView.innerHTML = monthString;
    daysTag.innerHTML = liTag;
    weeksTag.innerHTML = liTag2;
}
renderCalendar();



prevNextIcon.forEach(icon => { // getting prev and next icons
    icon.addEventListener("click", () => { // adding click event on both icons
        // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
        if (icon.id === "prev")
        {
            if(currDay - 10 < 1)
            {
                currMonth = currMonth - 1;
                let lastDayOfMonth = new Date(currYear, currMonth + 1, 0).getDate();
                currDay = lastDayOfMonth  - (10 - currDay);
                if (currMonth < 0)
                {
                    currYear--;
                    currMonth=11;
                }
            }
            else
            {
                currDay-=10;
            }
        }
        else
        {
            let lastDayOfMonth = new Date(currYear, currMonth + 1, 0).getDate();
            if (currDay+10 > lastDayOfMonth){
                currMonth = currMonth +1;
                currDay = 10 - (lastDayOfMonth - currDay);
                if (currMonth > 11)
                {
                    currYear++;
                    currMonth=0;
                }
            }
            else
            {
                currDay +=10;
            }
        }
        renderCalendar(); // calling renderCalendar function
    });
});