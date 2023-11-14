"use strict";

// task 1
const fullName = document.getElementById("full-name");
const variant = document.getElementById("variant");
const phone = document.getElementById("phone");
const faculty = document.getElementById("faculty");
const address = document.getElementById("address");
const results = document.getElementById("results");

/**
 * Test if element pass regex, 
 * if so change element border and outline color to red and return false,
 * else change element border and outline color to default and return true
 * @param {element} element 
 * @param {string} regex 
 * @returns whether element passed
 */
function testElement(element, regex) {
    if (!regex.test(element.value)) {
        element.style.border = "1px solid red";
        element.style.outlineColor = "red";
        return false;
    } else {
        element.style.border = null;
        element.style.outlineColor = null;
        return true;
    }
}

document.getElementById("my-form").addEventListener("submit", function (event) {
    event.preventDefault();

    let isValid = true;

    isValid &= testElement(fullName, /^[А-ЯІЇЄЁA-Z][а-яіїєёa-z'-]+ [А-ЯІЇЄЁA-Z]\.[А-ЯІЇЄЁA-Z]\.$/);
    isValid &= testElement(variant, /^\d{1,2}$/);
    isValid &= testElement(phone, /^\(\d{3}\)-\d{3}-\d{2}-\d{2}$/);
    isValid &= testElement(faculty, /^[A-ZА-ЯІЇЄ]{2,4}$/);
    isValid &= testElement(address, /^м\.\s[А-ЯІЇЄЁA-Z][A-ЯІЇЄЁa-zа-яіїєё'-\s]+$/);

    if (isValid) {
        results.innerHTML = `<h3>Введені дані</h3>
        <p><b>ПІБ:</b> ${fullName.value}</p>
        <p><b>Варіант:</b> ${variant.value}</p>
        <p><b>Телефон:</b> ${phone.value}</p>
        <p><b>Факультет:</b> ${faculty.value}</p>
        <p><b>Адреса:</b> ${address.value}</p>`;
        fullName.value = "";
        variant.value = "";
        phone.value = "";
        faculty.value = "";
        address.value = "";
    }
    else {
        results.innerHTML = "";
    }
});


// task 2
/**
 * Get random color in hex
 * @returns random color in hex
 */
function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

/**
 * Set listener on a cell to change 
 * background and text color on mouseenter
 * @param {element} cell 
 */
function setHoverListener(cell) {
    cell.addEventListener("mouseenter", function() {
        cell.style.backgroundColor = getRandomColor();
        cell.style.color = getRandomColor();
    });
}

/**
 * Set listener on a cell to change background color 
 * the value of color picker on click
 * @param {element} cell 
 * @param {element} colorPicker 
 */
function setClickListener(cell, colorPicker) {
    cell.addEventListener("click", function() {
        cell.style.backgroundColor = colorPicker.value;
        cell.style.color = null;
    });
}

/**
 * Set background color of cells in a row to a color
 * @param {*} row 
 * @param {*} color 
 */
function setCellsBackgroundColor(row, color) {
    for (const cell of row.getElementsByTagName('td')) {
        cell.style.backgroundColor = color;
        cell.style.color = null;
    }
}

/**
 * Set listener on a row to change background color 
 * of the row and every other row to the value of color picker
 * on double click
 * @param {element} row 
 * @param {element} colorPicker 
 */
function setDblClickListener(row, colorPicker) {
    row.addEventListener("dblclick", function() {

        setCellsBackgroundColor(row, colorPicker.value);
        let nextSibling = row.nextSibling;

        while (nextSibling) {
            nextSibling = nextSibling.nextSibling;
            if (nextSibling) {
                setCellsBackgroundColor(nextSibling, colorPicker.value);
                nextSibling = nextSibling.nextSibling;
            }
        }
    });
}

(function createTable() {
    const table = document.createElement("table");
    const colorPicker = document.getElementById("color-picker")
    let count = 1;

    for (let i = 0; i < 6; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < 6; j++) {
            const cell = document.createElement("td");
            cell.textContent = count;
            row.appendChild(cell);
            count++;

            setHoverListener(cell);
            setClickListener(cell, colorPicker);
        }
        setDblClickListener(row, colorPicker);
        
        table.appendChild(row);
    }
    
    document.getElementById("second-task").appendChild(table);
})()
