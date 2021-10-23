const playerResult = document.getElementById('showPlayerResult');
const playerX = document.querySelector('playerX');
const playerO = document.querySelector('playerO');
const choose_player_page = document.querySelector('.choose_player');
const game_play_section_page = document.querySelector('.game_play_section');
const slider = document.querySelector('.slider')
const onlineXplayer = document.querySelector('.XplayerOnline');
const onlineOplayer = document.querySelector('.YplayerOnline');
let checkPlayer = false;
const players = document.querySelectorAll('.players button');
const result_container = document.querySelector('.myResults');
const wonPlayer = document.getElementById('won')
const reply_button = document.getElementById('reply_button')
let check = 0
let playerXicon = 'fas fa-times';
let playerOicon = 'far fa-circle';
let XplayerSign = 'X'
let OplayerSign = 'O'

window.addEventListener('load', () => {
    for (let i = 0; i < players.length; i++) {
        players[i].addEventListener('click', () => {
            choose_player_page.classList.add('page_hide')
            game_play_section_page.classList.add('show_page')
            if (i == 1) {
                checkPlayer = true;
                slider.classList.add('Xplayer');
                onlineXplayer.style.color = `#52baed`;
                onlineOplayer.style.color = `#fff`;
            }

        })

    }
})








let computerBot = true;

let boxes = document.querySelectorAll('.boxes');
for (let i = 0; i < boxes.length; i++) {

    boxes[i].addEventListener('click', () => {
        let time = Math.floor(Math.random() * 1000 + 200);
        let botPlayer = bot(i);
        if (checkPlayer == false) {
            boxes[i].id = XplayerSign;
            getBoxesData(botPlayer, playerXicon, '#52baed', '#fff', true, i);
            optionslider('add', 'Xplayer');
            selectWinner('X');


            setTimeout(() => {
                if (botPlayer != null) {
                    boxes[botPlayer].id = OplayerSign;
                }
                getBoxesData(botPlayer, playerOicon, '#fff', '#52baed', false);
                optionslider('remove', 'Xplayer');
                selectWinner('O');
            }, time)
            if (botPlayer >= 0) {
                boxes[botPlayer].style.pointerEvents = "none";
            }
        }
        else {
            boxes[i].id = OplayerSign;
            getBoxesData(botPlayer, playerOicon, '#fff', '#52baed', true, i);
            optionslider('add', 'Yplayer');
            selectWinner('O');
            setTimeout(() => {
                if (botPlayer != null) {
                    boxes[botPlayer].id = XplayerSign;
                }
                getBoxesData(botPlayer, playerXicon, '#52baed', '#fff', false);
                optionslider('remove', 'Yplayer');
                selectWinner('X');
            }, time)
            if (botPlayer >= 0) {
                boxes[botPlayer].style.pointerEvents = "none";
            }
        }
        boxes[i].style.pointerEvents = "none";
    })
}





function bot(c) {
    let boxes_array = [];
    for (let i = 0; i < boxes.length; i++) {
        if (boxes[i].childElementCount == 0 && c != i) {
            boxes_array.push(i);
        }
    }
    let random_box = boxes_array[Math.floor(Math.random() * boxes_array.length)]
    return random_box;
}


function getBoxesData(botPlayer, player, X_player, y_player, check, i) {
    if (check == true) {
        boxes[i].innerHTML = `<i class="${player}"></i>`;
    }
    else {
        if (botPlayer >= 0) {
            boxes[botPlayer].innerHTML = `<i class="${player}"></i>`;
        }
    }
    onlineXplayer.style.color = `${X_player}`;
    onlineOplayer.style.color = `${y_player}`;
}


function optionslider(option, player) {
    if (option == 'add') {
        slider.classList.add(player);
    } else {
        slider.classList.remove(player);
    }
}



function getClass(idName) {
    return document.querySelector('.box' + idName).id;
}

function checkThreeClasses(val1, val2, val3, sign) {
    if (getClass(val1) == sign && getClass(val2) == sign && getClass(val3) == sign) {
        return true;
    }
}

function selectWinner(playerSign) {
    if (checkThreeClasses(1, 2, 3, playerSign) || checkThreeClasses(4, 5, 6, playerSign) || checkThreeClasses(7, 8, 9, playerSign) || checkThreeClasses(1, 5, 9, playerSign) || checkThreeClasses(3, 5, 7, playerSign) || checkThreeClasses(1, 4, 7, playerSign) || checkThreeClasses(2, 5, 8, playerSign) || checkThreeClasses(3, 6, 9, playerSign)) {
        playerWonResult(playerSign, false);
    }
    else {
        if (check >= 9) {
            playerWonResult('.', true, 'match draw start play again');
        }
        check += 1;
    }

}




function playerWonResult(result, find, write) {
    if (find == true) {
        playerResult.textContent = write;
    }
    game_play_section_page.style.display = 'none';

    wonPlayer.innerHTML = result;
    result_container.classList.add('my_result');


}

reply_button.addEventListener('click', () => {
    window.location.reload();
})


