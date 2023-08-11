const moves = document.getElementById("moves-count");
const timeValue = document.getElementById("time");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const gameContainer = document.querySelector(".game-container");
const result = document.getElementById("result");
const controls = document.querySelector(".controls-container");
let cards;
let interval;
let firstCard = false;
let secondCard = false;

const rulesButton = document.getElementById("rules");

rulesButton.addEventListener("click", () => {
  const rulesContent = `
    <p>- Klik "Mulai Game" untuk memulai permainan</p>
    <p>- Waktu yang Anda miliki untuk menyocokkan gambar adalah 2 menit</p>
    <p>- Apabila waktu melebihi 2 menit, Anda akan kalah otomatis</p>
    <p>- Anda bisa meng-klik "Berhenti" apabila ingin keluar dari game</p>
    <p>- Kutipan "Moves" adalah jumlah 2 gambar yang Anda Buka</p>
    <p>- Sedikit "Moves" maka akan lebih baik</p>
  `;

  Swal.fire({
    title: 'Peraturan Game Gambar',
    html: rulesContent,
    confirmButtonText: 'Oke',
  });
});


// Items Array
const items = [
  {
    name: "soekarno",
    image: "images/Soekarno.jpg",
  },
  {
    name: "hatta",
    image: "images/Hatta.jpg",
  },
  {
    name: "buya",
    image: "images/BuyaHamka.jpg",
  },
  {
    name: "cutnyak",
    image: "images/Cut-Nyak-Dhien.jpg",
  },
  {
    name: "dewi",
    image: "images/dewi-sartikaaaa.jpg",
  },
  {
    name: "drsoetomo",
    image: "images/dr_Sutomo.jpg",
  },
  {
    name: "soedirman",
    image: "images/Jendral_Soedirman.jpg",
  },
  {
    name: "khagussalim",
    image: "images/KHAgusSalim.jpg",
  },
  {
    name: "yamin",
    image: "images/Mohammad_Yamin.jpg",
  },
  {
    name: "pattimura",
    image: "images/Pattimura.jpg",
  },
  {
    name: "rakartini",
    image: "images/RAKartini.jpg",
  },
  {
    name: "wrsupratman",
    image: "images/Wage-Rudolf-Soepratman",
  },
];

//Initial Time
let seconds = 0,
  minutes = 2; // Mengubah menit menjadi 2 untuk hitung mundur 2 menit
//Initial moves and win count
let movesCount = 0,
  winCount = 0;

//For timer
const timeGenerator = () => {
    seconds += 1;
    if (seconds >= 60) {
      minutes += 1;
      seconds = 0;
    }
  
    // Jika waktu sudah melebihi 2 menit (120 detik), maka otomatis dianggap kalah
    if (minutes >= 2) {
      result.innerHTML = `<h2>Waktu Habis !</h2>`;
      stopGame();
      return;
    }
  
    let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
    let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
    timeValue.innerHTML = `<span>Waktu : </span>${minutesValue}:${secondsValue}`;
  };

//For calculating moves
const movesCounter = () => {
  movesCount += 1;
  moves.innerHTML = `<span>Moves : </span>${movesCount}`;
};

//Pick random objects from the items array
const generateRandom = (size = 4) => {
  //temporary array
  let tempArray = [...items];
  //initializes cardValues array
  let cardValues = [];
  //size should be double (4*4 matrix)/2 since pairs of objects would exist
  size = (size * size) / 2;
  //Random object selection
  for (let i = 0; i < size; i++) {
    const randomIndex = Math.floor(Math.random() * tempArray.length);
    cardValues.push(tempArray[randomIndex]);
    //once selected remove the object from temp array
    tempArray.splice(randomIndex, 1);
  }
  return cardValues;
};

const matrixGenerator = (cardValues, size = 4) => {
  gameContainer.innerHTML = "";
  cardValues = [...cardValues, ...cardValues];
  //simple shuffle
  cardValues.sort(() => Math.random() - 0.5);
  for (let i = 0; i < size * size; i++) {
    /*
        Create Cards
        before => front side (contains question mark)
        after => back side (contains actual image);
        data-card-values is a custom attribute which stores the names of the cards to match later
      */
    gameContainer.innerHTML += `
     <div class="card-container" data-card-value="${cardValues[i].name}">
        <div class="card-before">?</div>
        <div class="card-after">
        <img src="${cardValues[i].image}" class="image"/></div>
     </div>
     `;
  }
  //Grid
  gameContainer.style.gridTemplateColumns = `repeat(${size},auto)`;

  //Cards
  cards = document.querySelectorAll(".card-container");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      //If selected card is not matched yet then only run (i.e already matched card when clicked would be ignored)
      if (!card.classList.contains("matched")) {
        //flip the cliked card
        card.classList.add("flipped");
        //if it is the firstcard (!firstCard since firstCard is initially false)
        if (!firstCard) {
          //so current card will become firstCard
          firstCard = card;
          //current cards value becomes firstCardValue
          firstCardValue = card.getAttribute("data-card-value");
        } else {
          //increment moves since user selected second card
          movesCounter();
          //secondCard and value
          secondCard = card;
          let secondCardValue = card.getAttribute("data-card-value");
          if (firstCardValue == secondCardValue) {
            //if both cards match add matched class so these cards would beignored next time
            firstCard.classList.add("matched");
            secondCard.classList.add("matched");
            //set firstCard to false since next card would be first now
            firstCard = false;
            //winCount increment as user found a correct match
            winCount += 1;
            //check if winCount ==half of cardValues
            if (winCount == Math.floor(cardValues.length / 2)) {
              result.innerHTML = `<h2>You Won</h2>
            <h4>Moves: ${movesCount}</h4>`;
              stopGame();
            }
          } else {
            //if the cards dont match
            //flip the cards back to normal
            let [tempFirst, tempSecond] = [firstCard, secondCard];
            firstCard = false;
            secondCard = false;
            let delay = setTimeout(() => {
              tempFirst.classList.remove("flipped");
              tempSecond.classList.remove("flipped");
            }, 900);
          }
        }
      }
    });
  });
};

//Start game
startButton.addEventListener("click", () => {
  movesCount = 0;
  seconds = 0;
  minutes = 0;
  //controls amd buttons visibility
  controls.classList.add("hide");
  stopButton.classList.remove("hide");
  startButton.classList.add("hide");
  //Start timer
  interval = setInterval(timeGenerator, 1000);
  //initial moves
  moves.innerHTML = `<span>Moves:</span> ${movesCount}`;
  initializer();
});

//Stop game
stopButton.addEventListener(
  "click",
  (stopGame = () => {
    controls.classList.remove("hide");
    stopButton.classList.add("hide");
    startButton.classList.remove("hide");
    clearInterval(interval);
  })
);

//Initialize values and func calls
const initializer = () => {
  result.innerText = "";
  winCount = 0;
  let cardValues = generateRandom();
  console.log(cardValues);
  matrixGenerator(cardValues);
};
