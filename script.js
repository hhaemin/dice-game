// 요소 가져오기
const player1TotalScore = document.getElementById("total-score");
const player2TotalScore = document.getElementById("total-score2");
const player1CurrentScore = document.getElementById("current-score");
const player2CurrentScore = document.getElementById("current-score2");

const btnNew = document.getElementById("btn--new");
const btnRoll = document.getElementById("btn--roll");
const btnHold = document.getElementById("btn--hold");

// 변수 초기화
let scores, currentScore, activePlayer, playing;

// New Game 상태
const start = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  player1TotalScore.value = 0;
  player2TotalScore.value = 0;
  player1CurrentScore.value = 0;
  player2CurrentScore.value = 0;

  document.querySelector(".player--1").style.backgroundColor = "#d9b0bf";
  document.querySelector(".player--2").style.backgroundColor = "#b77c9c";
};

// 게임 시작
start();

// 현재 플레이어 전환 및 CURRENT_SCORE 초기화
const switchPlayer = function () {
  if (activePlayer === 0) {
    document.getElementById("current-score").value = 0;
  } else {
    document.getElementById("current-score2").value = 0;
  }
  currentScore = 0;

  // 플레이어 전환
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }

  // 플레이어 배경색 설정
  if (activePlayer === 0) {
    document.querySelector(".player--1").style.backgroundColor = "#d9b0bf";
    document.querySelector(".player--2").style.backgroundColor = "#b77c9c";
  } else {
    document.querySelector(".player--1").style.backgroundColor = "#b77c9c";
    document.querySelector(".player--2").style.backgroundColor = "#d9b0bf";
  }

  document.querySelector(".player--1").classList.toggle("player--active");
  document.querySelector(".player--2").classList.toggle("player--active");
};

// 주사위 굴리고, 결과에 따라 현재 점수 업데이트 및 플레이어 전환
btnRoll.addEventListener("click", function () {
  if (playing) {
    // 주사위 굴리기
    const dice = Math.floor(Math.random() * 6) + 1;
    console.log(dice);

    // 이미지 업데이트
    // const diceImage = document.getElementById("dice-image");
    // diceImage.src = `Dice-${dice}.svg.png`;

    // 점수를 업데이트 할 것인가 플레이어를 전환할 것인가
    if (dice !== 1 && dice !== 2) {
      // 점수 업데이트
      currentScore += dice;
      if (activePlayer === 0) {
        document.getElementById("current-score").value = currentScore;
      } else {
        document.getElementById("current-score2").value = currentScore;
      }
    } else {
      // 플레이어 전환
      switchPlayer();
    }
  }
});

// 현재 점수를 총 점수에 추가하고, 50점 이상인지 확인, 50점이 아니라면 플레이어 전환
btnHold.addEventListener("click", function () {
  if (playing) {
    // CURRENT_SCORE를 activePlayer에 점수 더해주기
    scores[activePlayer] += currentScore;
    if (activePlayer === 0) {
      document.getElementById("total-score").value = scores[activePlayer];
    } else {
      document.getElementById("total-score2").value = scores[activePlayer];
    }

    // 점수가 50점 이상인지 확인하기
    if (scores[activePlayer] >= 50) {
      // 게임 끝
      playing = false;
    } else {
      switchPlayer();
    }
  }
});

// 게임 재시작
btnNew.addEventListener("click", start);
