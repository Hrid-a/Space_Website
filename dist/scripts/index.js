"use strict";

const navToggle = document.querySelector(".nav-mobile-toggle");
const navLinks = document.querySelector(".navbar__links");
const img = document.querySelector(".img-container img");
const tabsContainer = document.querySelector(".tabs-container");
const tabPanels = document.querySelector(".tab-panels");
const listItems = document.querySelectorAll(".tabs-container>ul li");
const slideItems = document.querySelectorAll(".crew__info__slide li");
const crewConetnt = document.querySelector(".crew");


navToggle.addEventListener("click", _  => {
    const visibility = navToggle.getAttribute("aria-hidden");
    if(visibility === "false"){
        navToggle.setAttribute("aria-hidden", "true");
    }else {
        navToggle.setAttribute("aria-hidden", "false");
    }
    navLinks.classList.toggle("d-none");
    
})

tabsContainer?.addEventListener("click", (e)=> {
    const targetElement = e.target.closest("a");
    if(!targetElement) return ;
    e.preventDefault();
    const targetId = targetElement.getAttribute("href").slice(1);
    getJsonData(targetId);
    
})

listItems.forEach(listItem => {
    listItem.addEventListener("click", (event)=> {
        listItems.forEach(item => {
            item.className = "";
        })
        // This the same 
        // event.target.closest("li").classList.add("active");
        event.currentTarget.classList.add("active");
        
    })
})

const data = [
    {
      "name": "Douglas Hurley",
      "images": {
        "png": "./assets/crew/image-douglas-hurley.png",
        "webp": "./assets/crew/image-douglas-hurley.webp"
      },
      "role": "Commander",
      "bio": "Douglas Gerald Hurley is an American engineer, former Marine Corps pilot and former NASA astronaut. He launched into space for the third time as commander of Crew Dragon Demo-2."
    },
    {
      "name": "Mark Shuttleworth",
      "images": {
        "png": "./assets/crew/image-mark-shuttleworth.png",
        "webp": "./assets/crew/image-mark-shuttleworth.webp"
      },
      "role": "Mission Specialist",
      "bio": "Mark Richard Shuttleworth is the founder and CEO of Canonical, the company behind the Linux-based Ubuntu operating system. Shuttleworth became the first South African to travel to space as a space tourist."
    },
    {
      "name": "Victor Glover",
      "images": {
        "png": "./assets/crew/image-victor-glover.png",
        "webp": "./assets/crew/image-victor-glover.webp"
      },
      "role": "Pilot",
      "bio": "Pilot on the first operational flight of the SpaceX Crew Dragon to the International Space Station. Glover is a commander in the U.S. Navy where he pilots an F/A-18.He was a crew member of Expedition 64, and served as a station systems flight engineer."
    },
    {
      "name": "Anousheh Ansari",
      "images": {
        "png": "./assets/crew/image-anousheh-ansari.png",
        "webp": "./assets/crew/image-anousheh-ansari.webp"
      },
      "role": "Flight Engineer",
      "bio": "Anousheh Ansari is an Iranian American engineer and co-founder of Prodea Systems. Ansari was the fourth self-funded space tourist, the first self-funded woman to fly to the ISS, and the first Iranian in space."
    }
]
let currentIndex = 0;
const lastIndex = data.length -1;

function handleCrewData(){
    const {images, name, role, bio} = data[currentIndex];
    const crewImage = crewConetnt?.querySelector(".crew__image--container img"),
        crewRole = crewConetnt?.querySelector(".crew__info__role"),
        crewName = crewConetnt?.querySelector(".crew__info__name"),
        crewBio = crewConetnt?.querySelector(".crew__info__bio");

    if(crewBio && crewImage && crewName){
        crewImage.src = images.png;
        crewImage.alt = name;
        crewRole.innerHTML = role;
        crewName.innerHTML = name;
        crewBio.innerHTML = bio;
    }
}

setInterval(slide, 2000);
function slide(){
    let idx = getNextIndex();
    slideItems.forEach((item, index)=> {
        item.className = "";
        if(index === idx){
            item.className = "active";
        }
    })
    handleCrewData(idx)
}

function getNextIndex(){
    currentIndex = currentIndex === lastIndex ? 0: currentIndex+1;
    return currentIndex;
}

async function getJsonData(id){
    const response = await fetch("scripts/data.json");
    const data = await response.json();
    handleData(id,data);
}

function handleData(id, data) {
    const currentPageURL = window.location.href;
    // Extract the name from the URL
    const urlParts = currentPageURL.split('.');
    const name = urlParts[0].split('/').at(-1);
    console.log(name); 
    if(name === "destination"){
        handleDestData(data.destinations,id);
    }else if(name === "technology"){
        handleTechData(data.technology,id);
    }
}

function handleDestData(data,id){
    const tabTitle = tabPanels.querySelector(".tab-panel__title"),
        discription = tabPanels.querySelector(".tab-panel__discription"),
        distance = tabPanels.querySelector(".tab-panel__info--distance"),
        travel = tabPanels.querySelector(".tab-panel__info--travel");
    const info = data.find(destination => destination.name === id);
    
    img.src = info.images.png;
    img.alt = info.name;
    tabTitle.innerHTML = info.name.toUpperCase();
    discription.innerHTML = info.description;
    distance.innerHTML =`<span>AVG. DISTANCE</span>
                        <span>${info.distance}</span>`;
    travel.innerHTML = `<span>Est. travel time</span>
                        <span>${info.travel}</span>`;
}

function handleTechData(data,id){
    const tabTitle = tabPanels.querySelector(".tab-panel__title"),
        discription = tabPanels.querySelector(".tab-panel__discription"),
        imgContainer = document.querySelector(".img-container ");
    const info = data.find(tech => tech.name === id);
    
    const portraitImageURL = info.images.portrait;
    const landscapeImageURL = info.images.landscape;
    const isLandscape = window.matchMedia("(orientation: landscape)").matches;
    const imageURL = isLandscape ? landscapeImageURL : portraitImageURL;

    imgContainer.style.backgroundImage =  `url(${imageURL})`;
    tabTitle.innerHTML = info.name.toUpperCase();
    discription.innerHTML = info.description;
    
}

