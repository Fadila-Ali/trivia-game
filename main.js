//! GETTERS
const question = document.querySelector("#question");
const answers = document.querySelector("#answers");
const next = document.querySelector("#next");
const scoreSpan = document.querySelector(".score");
// console.log(question, answers, next);

const url = `https://opentdb.com/api.php?amount=10&type=multiple`;
let updatedResults;
let index = 0;
let score = 0;

const updatedQuestion = () => {
  question.innerHTML = updatedResults[index].question;

  for (let i = 0; i < 4; i++) {
    const div = document.createElement("div");
    const randomNum = Math.floor(
      Math.random() * updatedResults[index].incorrect_answers.length
    );

    div.innerHTML = updatedResults[index].incorrect_answers.splice(
      randomNum,
      1
    );
    answers.append(div);
  }
};
const getQuestions = async () => {
  const qs = await fetch(url);
  const qsJson = await qs.json();

  updatedResults = qsJson.results.map((q) => {
    q.incorrect_answers.push(q.correct_answer);
    return q;
  });
  updatedQuestion();
};

next.addEventListener("click", () => {
  index++;

  if (index >= updatedResults.length) {
    question.innerHTML = "GAME OVER";
    answers.innerHTML = "";
  } else {
    answers.innerHTML = "";
    updatedQuestion();
  }

  question.innerHTML = updatedResults[index].question;

  answers.style.pointerEvents = "auto";
});

answers.addEventListener("click", (event) => {
  if (event.target.innerHTML === updatedResults[index].correct_answer) {
    score += 10;
    scoreSpan.innerHTML = score;
    event.target.style.backgroundColor = "#00e35f";
    event.target.style.border = "2px solid green";
  } else {
    event.target.style.backgroundColor = "#e30049";
    event.target.border = "#880000";
  }

  answers.style.pointerEvents = "none";
});

getQuestions();
