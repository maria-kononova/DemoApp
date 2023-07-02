const chipsTag = document.querySelector("chips");

const category = ["Профориентаця", "Патриотика", "Культура и творчество", "Предпринимательство", "Наука", "Ещё"];

const renderTags = () => {
    let tags = "";
    for (let i = 0; i < category.length; i++)
    {
        tags += '<div className="chip">{category[i]}<span className="closebtn" onclick="notActive()">&times;</span></div>';
    }
    chipsTag.innerHTML = tags;
}
renderTags();

function notActive() {
    var categoryElement = document.getElementById(event.target.id);
    var isActive = categoryElement.classList.contains('active');
    if (isActive) {
        categoryElement.classList.remove('active');
        //categoryElement.style.backgroundColor = ''; // Удаление инлайн-стиля для фона
    } else {
        categoryElement.classList.add('active');
        //categoryElement.style.backgroundColor = 'yellow'; // Установка желтого фона
    }
}