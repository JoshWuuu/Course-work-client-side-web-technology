var cards = ['1clubs.png', '1hearts.png', '2clubs.png', '2hearts.png', '3clubs.png', '3hearts.png']
var selected = [];

function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
    //   swap the cards
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

function restart() {
    shuffle(cards);
    initialPage = '';
    for (var i = 0; i< cards.length; i++) {
        initialPage += '<img id="' + cards[i] + '" src = "back.png" alt = "' + cards[i] + '" onclick = "flip(this)" \> ';
    }
    document.getElementById('cards').innerHTML = initialPage;
}


document.addEventListener("DOMContentLoaded", restart, false)
document.getElementById("restartButton").addEventListener('click', restart, false)


function flip(image) {
    if (selected.length == 2) {
        return ''
    }
    var selectedID = image.id;
    image.src = selectedID;
    if (selected.length == 0) {
        selected.push(selectedID);
    }
    else if (selected.length == 1) {
        // two cards same 
        selected.push(selectedID);
        if (selected[0].charAt(0) == selectedID.charAt(0)) {
            setTimeout(()=> {
                image.src = 'clear.png';
                document.getElementById(selected[0]).src = 'clear.png';
                selected = [];
            }, 1500)
        }
        if (selected[0].charAt(0) != selectedID.charAt(0)) {
            setTimeout(()=> {
                image.src = 'back.png';
                document.getElementById(selected[0]).src = 'back.png';
                selected = [];
            }, 1500)
        }
    }
}
