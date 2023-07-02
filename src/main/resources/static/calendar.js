const daysTag = document.querySelector(".days"),
    weeksTag = document.querySelector(".weeks"),
    monthView = document.querySelector(".monthView"),
    prevNextIcon = document.querySelectorAll(".icons span");

// получение текущей даты, месяца, числа и дня недели
let date = new Date(),
    currYear = date.getFullYear(),
    currMonth = date.getMonth(),
    currDay = date.getDate(),
    indexWeek = date.getDay(),
    dateList = new Map();

// массив месяцев
const months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль",
    "Август", "Сентябрь", " Октябрь", "Ноябрь", "Декабрь"];
//массив дней недели
const weeks = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];

//функия отрисовки календаря
const renderCalendar = () => {
    dateList.clear(); //отчистка карты с предыдущими значениями
    let lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(); //получение последнего дня текущего месяца
    //строки для добавления вёрстки html элементов
    let liTag = "";
    let liTag2 = "";
    //список дней текущего месяца
    let days = [];
    let count = 0;
    //заполнение списка до 10 значения или до последней даты месяца
    for (let i = currDay; i <= lastDateofMonth; i++) {
        if (count < 10) {
            days.push(i);
            count++;
        } else break;
    }
    dateList.set(currYear + "-" + currMonth, days); //добавление в словарь ключ:значени -  'год-месяц':[числа]
    //добавление следующего месяца
    if (count < 10) {
        let overDays = []; //список дней следующего месяца
        for (let i = 1; i <= 10 - count; i++) {
            overDays.push(i);
        }
        //проверка перехода на следующий год
        if (currMonth + 1 == 12) {
            dateList.set(currYear + 1 + "-0", overDays);
        } else dateList.set(currYear + "-" + (currMonth + 1), overDays);
    }
    let monthString = "";
    let state = true;
    //формирование html вёрстки
    for (let [yearMonth, Days] of dateList) {
        let month = yearMonth.split('-')[1];
        //проверка перехода на следующий месяц
        if (state) {
            monthString += months[month] + " " + yearMonth.split('-')[0];
            state = false;
        } else {
            monthString += " - " + months[month] + " " + yearMonth.split('-')[0];
        }
        for (let i = 0; i < Days.length; i++) {
            //проверка на текущую (активную) дату
            let isToday = Days[i] === date.getDate() && currMonth === new Date().getMonth()
            && currYear === new Date().getFullYear() ? "active" : "";
            //добавление вёрстки в результирующие строки
            liTag += `<li class="${isToday}"  onclick="getDate()">${Days[i]}</li>`;
            liTag2 += `<li class="inactive">${weeks[indexWeek]}</li>`;
            if (indexWeek === 6) indexWeek = 0;
            else indexWeek++;
        }
    }
    //включение вёрстки в страницу
    monthView.innerHTML = monthString;
    daysTag.innerHTML = liTag;
    weeksTag.innerHTML = liTag2;
}

renderCalendar();

//функция получения сообщением выбора даты в календаре
function getDate() {
    let result = "";
    let liContent = event.target.textContent;
    for (let [yearMonth, Days] of dateList) {
        for (let i = 0; i < Days.length; i++) {
            //поиск совпадения в текущей карте и выбранной дате в календаре
            if (Days[i] == liContent) {
                let month = Number(yearMonth.split('-')[1]) + 1;
                //формирование результирующей строки в формате гггг-мм-дд
                result += yearMonth.split('-')[0] + '-' + month + '-' + Days[i];
                break;
            }
        }
    }
    alert(result); //вывод сообщения
}

//функция перехода по калегндарю
prevNextIcon.forEach(icon => {
    icon.addEventListener("click", () => {
        if (icon.id === "prev") //переход назад
        {
            if (currDay - 10 < 1) { //если есть переход на прошлый месяц
                currMonth = currMonth - 1;
                let lastDayOfMonth = new Date(currYear, currMonth + 1, 0).getDate(); //получение последнего дня предыдущего месяца
                currDay = lastDayOfMonth - (10 - currDay);
                if (currMonth < 0) { //если есть переход на прошлый год
                    currYear--;
                    currMonth = 11;
                }
            } else {
                currDay -= 10;
            }
        } else if (icon.id === "next") // переход вперёд
        {
            let lastDayOfMonth = new Date(currYear, currMonth + 1, 0).getDate();
            if (currDay + 10 > lastDayOfMonth) { //если есть переход на следующий месяц
                currMonth = currMonth + 1;
                currDay = 10 - (lastDayOfMonth - currDay);
                if (currMonth > 11) { //если есть переход на следующий год
                    currYear++;
                    currMonth = 0;
                }
            } else {
                currDay += 10;
            }
        } else { //переход к текущей дате
            currYear = date.getFullYear();
            currMonth = date.getMonth();
            currDay = date.getDate();
            indexWeek = date.getDay();
        }
        renderCalendar();
    });
});