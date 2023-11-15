"use strict";

/**
 * Create one block with fetched data about a person
 * @returns created block if success
 */
async function fetchPerson() {
    
    const response = await fetch('https://randomuser.me/api');

    if (!response.ok) {
        return false;
    }

    const data = await response.json();

    const block = document.createElement('div');
    block.className = 'block';

    const image = document.createElement('img');
    image.src = data.results[0].picture.large;
    block.appendChild(image);

    const textBlock = document.createElement('div');
    textBlock.className = 'text-block';

    const cell = document.createElement('p');
    cell.textContent = `Cell: ${data.results[0].cell}`;
    textBlock.appendChild(cell);

    const city = document.createElement('p');
    city.textContent = `City: ${data.results[0].location.city}`;
    textBlock.appendChild(city);

    const postcode = document.createElement('p');
    postcode.textContent = `Postcode: ${data.results[0].location.postcode}`;
    textBlock.appendChild(postcode);

    const email = document.createElement('p');
    email.textContent = `Email: ${data.results[0].email}`;
    textBlock.appendChild(email);

    block.appendChild(textBlock);
    return block;
}

/**
 * Fetch data about people and add to website
 */
async function fetchData () {
    const container = document.getElementById("results");

    const status = document.getElementById("status");
    status.textContent = "loading..";

    let blocks = await Promise.all(Array(5).fill(fetchPerson).map((f) => f()));

    if (blocks.includes(false)) {
        status.textContent = "error";
        return;
    }

    status.textContent = "success!"
    container.innerHTML = "";
    blocks.map((block) => {container.appendChild(block)})
}

document.getElementById("my-button").addEventListener("click", fetchData);