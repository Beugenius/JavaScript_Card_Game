const express = require('express');
const app = express();
const PORT = 8000;
const cors = require('cors');

// app.use(cors());
app.use(express.static(__dirname + '/javascript_final.html'));
// app.get('/', (request, response) => {
//     response.sendFile(__dirname + '/javascript_final.html');
// });

// global variable for storing amount of guesses 
var guesses = 0;

// add event listener to start button 
document.getElementById("startButton").addEventListener("click", function () {
    // grabs value of number of symbols 
    var symbolNum = parseInt(document.getElementById('numSymbols').value);
    // if statement that sets max value to 8 
    if(symbolNum > 8) {
        symbolNum = 8;
    }
    // generate guess counter 
    var guessCounter = document.createElement("div");
    guessCounter.setAttribute("id", "guesses");
    guessCounter.innerHTML = "Amount of guesses: " + 0;
    document.body.insertBefore(guessCounter, document.getElementById("game"));
    // generate game board 
    generateGameBoard(symbolNum);
    // add event listeners 
    setupCards();
    // hides start form
    document.getElementById("startForm").setAttribute("style", "display: none;");
    
});

function generateGameBoard(symbolNum) {
    // symbols to be used 
    var symbols = ["!","@","#","$","%","^","&","*"];
    // amount of cards to be displayed 
    var cardNum = 2*symbolNum;
    // array to store cards in 
    var cards = [];
    // generate cards
    for(var i = 0; i < symbolNum; ++i) {
        cards[i] = symbols[i];
    } 
    // generate card pairs 
    for (var i = 0; i < symbolNum; ++i) {
        cards.push(cards[i]);
    }
    // shuffle cards 
    shuffleCards(cards);
    // create table 
    var table = document.createElement("table");
    table.setAttribute("id", "gameTable");
    // create table row 
    var tR = document.createElement("tr");
    // creates table if 2 x 2 square 
    if(symbolNum === 2) {
        for (var i = 0; i < cardNum; ++i) {
            if (i === 2) {
                // adds table row to table 
                table.appendChild(tR);
                // creates new table row 
                tR = document.createElement("tr");
            }
            // creates new table description element
            var tD = document.createElement("td");
            // sets inner html to card value 
            tD.innerHTML = "";
            tD.setAttribute("value", cards[i]);
            // adds table description to table row 
            tR.appendChild(tD);
        }
        // adds table row to table 
        table.appendChild(tR);
        // adds table to document 
        document.getElementById("game").appendChild(table);
    }
    // creates table if 4 x 4 square 
    else if (symbolNum === 8) {
        for (var i = 0; i < cardNum; ++i) {
            if (i === 4 || i === 8 || i === 12) {
                // adds table row to table 
                table.appendChild(tR);
                // creates new table row 
                tR = document.createElement("tr");
            }
            // creates new table description element
            var tD = document.createElement("td");
            // sets inner html to card value 
            tD.innerHTML = "";
            tD.setAttribute("value", cards[i]);
            // adds table description to table row 
            tR.appendChild(tD);
        }
        // adds table row to table 
        table.appendChild(tR);
        // adds table to document 
        document.getElementById("game").appendChild(table);
    }
    // creates table for everything else thats not a square 
    else {
        for (var i = 0; i < cardNum; ++i) {
            if (i === (cardNum / 2)) {
                // adds table row to table 
                table.appendChild(tR);
                // creates new table row 
                tR = document.createElement("tr");
            }
            // creates new table description element
            var tD = document.createElement("td");
            // sets inner html to card value 
            tD.innerHTML = "";
            tD.setAttribute("value", cards[i]);
            // adds table description to table row 
            tR.appendChild(tD);
        }
        // adds table row to table 
        table.appendChild(tR);
        // adds table to document 
        document.getElementById("game").appendChild(table);
    }
}
// shuffle cards 
function shuffleCards(cards) {
    for (var i = 0; i < cards.length; ++i) {
        var randomNum = Math.floor(Math.random() * (i + 1));
        // creates a temp card to replace other next card with 
        var tempCard = cards[i];
        // sets cards[i] to random index of cards 
        cards[i] = cards[randomNum];
        // sets random index of cards to the temp card, or card[i] before it was swapped 
        cards[randomNum] = tempCard;
    }
}

function setupCards() {
    // get all table elements and add event listeners 
    var playCards = document.getElementById("gameTable");
    for(var i = 0; i < playCards.rows.length; ++i) {
        for(var j = 0; j < playCards.rows[i].cells.length; ++j) {
            playCards.rows[i].cells[j].addEventListener("click", function (e) {
                // as long as e.target does not have class value of matched 
                // the card value will be set to flipped 
                if(e.target.getAttribute("class")!== "matched") {
                    e.target.innerText = e.target.getAttribute("value");
                    // removes previous class 
                    e.target.removeAttribute("class");
                    // sets class to flipped 
                    e.target.setAttribute("class", "flipped");
                    // prevents default so accidentally dragging doesn't crash program 
                    e.preventDefault();
                    // call to check if there is a match 
                    checkMatch();
                }    
            });
            
        }
    }
    
    
}

function checkMatch() {
    // get all table elements and add event listeners 
    var playCards = document.getElementById("gameTable");
    // count cards flipped 
    var flipCount = 0;
    // variable for storing cards to be checked 
    var flippedCards = [];
    // checks for if two cards are flipped
    for(var i = 0; i < playCards.rows.length; ++i) {
        for(var j = 0; j < playCards.rows[i].cells.length; ++j) {
            if(playCards.rows[i].cells[j].getAttribute("class")==="flipped") {
                // increase amount of cards count with class value flipped 
                flipCount += 1;
                // add card to flippedCards array 
                flippedCards.push(playCards.rows[i].cells[j]);
            }
        }
    }
    // increases the amount of guesses every time there are 2 cards flipped 
    if (flipCount === 2) {
        // increases guesses by one 
        guesses += 1;
        // changes value of guesses displayed on screen 
        document.getElementById("guesses").innerHTML = "Amount of guesses: " + guesses;
    }
    // if two cards are flipped, check for match
    if(flipCount === 2 && flippedCards[0].innerText === flippedCards[1].innerText) {
        for(var i = 0; i < playCards.rows.length; ++i) {
            for(var j = 0; j < playCards.rows[i].cells.length; ++j) {
                if(playCards.rows[i].cells[j].getAttribute("class")==="flipped") {
                    playCards.rows[i].cells[j].className = "matched";
                    checkWin();
                }
            }
        }
    }
    // flip non-matched cards and leave time for the user to see the incorrect flipped cards 
    if(flipCount === 2) {
        setTimeout(function() {
            for(var i = 0; i < playCards.rows.length; ++i) {
                for(var j = 0; j < playCards.rows[i].cells.length; ++j) {
                    if(playCards.rows[i].cells[j].getAttribute("class")!=="matched") {
                        // iterates through rows and columns of table and sets 
                        // class to not flipped, and innerText to null
                        playCards.rows[i].cells[j].className = "not-flipped";
                        playCards.rows[i].cells[j].innerText = "";
                    }
                }
            }
        }, 500);     
    }   
}


function checkWin() {
    // bool to determine if won 
    var solved = true;
    // getting table elements 
    var playCards = document.getElementById("gameTable");
    // checks if any card class is not equal to "matched"
    for(var i = 0; i < playCards.rows.length; ++i) {
        for(var j = 0; j < playCards.rows[i].cells.length; ++j) {
            if(playCards.rows[i].cells[j].getAttribute("class")!=="matched") {
                // if any card has class value other than match, solved = false
                solved = false;
            }
        }
    }
    // if all card class values are "matched"
    if (solved === true) {
        // remove game board 
        playCards.remove();
        // create p element
        var winTitle = document.createElement("p");
        // set attribute of p element id 
        winTitle.setAttribute("id", "winTitle");
        // set innerHTML of p element 
        winTitle.innerHTML = "Congratulations! You Won In "+guesses+" guesses! Thanks For Playing!";
        // append element to where game board was 
        document.getElementById("game").appendChild(winTitle);
    }

}

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`The server is running on port ${PORT}! You better go catch it!`)
});
