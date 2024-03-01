let original = document.querySelector('.original')
let translation = document.querySelector('.translation')
let sendButton = document.querySelector('.send')
let deleteButton = document.querySelector('.delete')
let words = document.querySelector('h2')
let error = document.querySelector('.error')
let startGame = document.querySelector('.start')
let close = document.querySelector('.close')
let game = document.querySelector('.game')
let wordArray = []


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
          "Mot traduit" : translation.value,
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
    })

//  delete button event

deleteButton.addEventListener('click', function(){
    localStorage.clear()
    wordArray = []
    recordedWords()
    startGame.style.display="none"
})
// close button

close.addEventListener('click', function() {
    game.classList.remove('active')
  })

// add active class

startGame.addEventListener('click', function(){
    game.classList.add('active')
  })