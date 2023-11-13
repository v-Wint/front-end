"use strict";

// Task 1

const target = document.getElementById("target");
const next = document.querySelector("#next");

target.addEventListener("click", function() {
    target.classList.toggle('target-clicked');
});

next.addEventListener("click", function() {
    next.classList.toggle('next-clicked');
});


// Task 2

const IMAGE_SCOURCE = "Eindhoven.jpg";

const addButton = document.getElementById("add-btn");
const zoomInButton = document.getElementById("zoom-in-btn");
const zoomOutButton = document.getElementById("zoom-out-btn");
const deleteButton = document.getElementById("delete-btn");


addButton.addEventListener("click", function() {
    if (document.getElementById("add-img")) {
        return;
    }

    const image = document.createElement("img");
    image.src = IMAGE_SCOURCE;

    const container = document.createElement("div");
    container.id = "add-img";

    container.appendChild(image);
    
    document.body.insertBefore(container, document.getElementById("buttons"));

    // set container width and height to image size
    container.style.width = `${image.clientWidth}px`;
    container.style.height = `${image.clientHeight}px`;
});


zoomInButton.addEventListener("click", function() {
    const image = document.querySelector("#add-img img")
    if (!image) {
        return;
    }

    image.style.width = `${image.clientWidth * 1.1}px`;
    image.style.height = `${image.clientHeigh * 1.1}px`;
});


zoomOutButton.addEventListener("click", function() {
    const image = document.querySelector("#add-img img")
    if (!image) {
        return;
    }

    image.style.width = `${image.clientWidth * 0.90909}px`;
    image.style.height = `${image.clientHeigh * 0.90909}px`;
});


deleteButton.addEventListener("click", function() {
    const container = document.getElementById("add-img")
    if (!container) {
        return;
    }

    container.remove();
});
