let original = document.querySelector('.original');
let translation = document.querySelector('.translation')
let sendButton = document.querySelector('.send')
let deleteButton = document.querySelector('.delete')
let words = document.querySelector('h2')
let error = document.querySelector('.error')
let startGame = document.querySelector('.start')
let close = document.querySelector('.close')
let game = document.querySelector('.game')
let gameTitle = document.querySelector('.gameTitle')
let btnproposer = document.querySelector('.proposer')
let txtAnswer = document.querySelector('.answer')
let result = document.querySelector('.result')
let game_score = document.querySelector('.game_score')
let score = 0
let tries = 0
let wordArray = []
let randomNumber
let thisWord

//amounts of words recorded

function recordedWords() {
    words.innerHTML = `Il y a ${wordArray.length} mot(s) enregistré(s)`
}

//check local storage

if (JSON.parse(localStorage.getItem('mots'))) {
    wordArray = JSON.parse(localStorage.getItem('mots'))
    recordedWords()
    startGame.style.display="inline-block"
  }

// add word event

sendButton.addEventListener('click', function() {
  if (original.value != "" && translation.value != "") {
    error.innerHTML = ""
    wordArray.push(
      {
        "Mot original" : original.value,
        "Mot traduit" : translation.value
      }
    )
    original.value = ""
    translation.value = ""
    localStorage.setItem('mots', JSON.stringify(wordArray))
    recordedWords()
    startGame.style.display="inline-block"
  } else {
    error.innerHTML = `Remplissez les deux champs`
  }
  console.log(wordArray);
});

//  delete button event

deleteButton.addEventListener('click', function(){
  localStorage.clear()
  wordArray = []
  recordedWords()
  startGame.style.display="none"
})

// remove active class

close.addEventListener('click', function() {
  game.classList.remove('active')
  score = 0
  tries = 0
  game_score.innerHTML  = ""
})

// add active class

startGame.addEventListener('click', function(){
  game.classList.add('active')
  presentWord()
})

function presentWord() {
  if (wordArray.length > 0) {
    randomNumber = Math.floor(Math.random() * (wordArray.length));
    thisWord = wordArray[randomNumber]
    gameTitle.innerHTML = `TRADUIS LE MOT ${thisWord["Mot original"]}`
  } else {
    game.classList.remove('active')
    words.innerHTML = "No More Words!"
    startGame.style.display="none"
  }
}
//right or wrong response

btnproposer.addEventListener('click', function() {
  tries++
  let userAnswer = txtAnswer.value;
  if (userAnswer.toLowerCase() == thisWord["Mot traduit"].toLowerCase()) {
    result.innerHTML = `Bravo!!!`;
    wordArray.splice(randomNumber, 1)
    console.log(wordArray)
    score++
  } else {
    result.innerHTML = `Try again`;
  }
  game_score.innerHTML = `${score}/${tries}`;
  setTimeout(() => {
    result.innerHTML = ""
  },2000)
  presentWord();
  txtAnswer.value = ""
})


