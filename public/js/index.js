console.log("hej");
const section = document.querySelector("section"); 
const playerLivesCount = document.querySelector("span"); 
let playerLives = 8; //how many tries the player's got 
let myData = [];

const generateGetDate = () => {
    let xhr = new XMLHttpRequest()
    xhr.open("GET", "/js/data.json", false)
    xhr.send();
    let data = JSON.parse(xhr.response); 
    myData = []; 
    for ( i = 0; i<8; i++) {
        myData.push(data[i]);
        myData.push(data[i]);
    }
    console.log("AJAX run");
    console.log(myData);
}

//link text
playerLivesCount.textContent = playerLives;

//generate the data for the cards. [{}] = array of objects

function getData() { 
    return myData;
}

// => arrow function
const randomize = () => {
    const cardData = getData();
    cardData.sort(() => Math.random() - 0.5);
    //console.log(cardData); 
    return cardData;
};

const cardGenerator = () => { 
    const cardData = randomize(); 
    cardData.forEach((item) => { //loop så den fixar koden för alla kort
        //console.log(item);
        //console.log(cardData);
        const card = document.createElement("div"); 
        const face = document.createElement("img"); 
        const back = document.createElement("div"); 
        card.classList = "card"; 
        face.classList = "face"; 
        back.classList = "back"; 

        face.src = item.imgSrc;  
        card.setAttribute("name", item.name)

        section.appendChild(card); 
        card.appendChild(face); 
        card.appendChild(back);

        card.addEventListener('click', (e) => { 
            card.classList.toggle('toggleCard');
            checkCards(e);
        })
    });  
};

const checkCards = (e) => {
    console.log(e);
    const clickedCard = e.target; 
    clickedCard.classList.add("flipped");
    const flippedCards = document.querySelectorAll(".flipped");
    const toggleCard = document.querySelectorAll(".toggleCard");

    if(flippedCards.length === 2) {
        if(flippedCards[0].getAttribute("name") === flippedCards[1].getAttribute("name")) {
            console.log("match");
            flippedCards.forEach((card) => {
                card.classList.remove("flipped");
                card.style.pointerEvents = "none";
            });
        }
        else {
            console.log("no match");
            flippedCards.forEach((card) => {
                card.classList.remove("flipped");
                setTimeout(() => card.classList.remove("toggleCard"), 1000);
            });
            playerLives--; 
            playerLivesCount.textContent = playerLives;
            if(playerLives === 0) { 
                restart("No more lives, try again");
            }
        }
    }
    if(toggleCard.length === 16) {
        restart("Congratulations, you won!");
    }
};

const restart = (text) => { 
    let cardData = randomize(); 
    let faces = document.querySelectorAll(".face");
    let cards = document.querySelectorAll(".card");
    section.style.pointerEvents = "none";
    cardData.forEach((item, index) => {
        cards[index].classList.remove("toggleCard");
        setTimeout (() => {
            cards[index].style.pointerEvents = "all";
            faces[index].src = item.imgSrc;
            cards[index].setAttribute("name", item.name);
            section.style.pointerEvents = "all";
        }, 1000);
    });
    playerLives = 8;
    playerLivesCount.textContent = playerLives; 
    setTimeout(() => {
        window.alert(text, 100);
    });
};
generateGetDate();
cardGenerator();