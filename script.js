const questions = [
  {
    question: "ما هي عاصمة مصر؟",
    options: ["القاهرة", "الإسكندرية", "الأقصر", "أسوان"],
    answer: 0
  },
  {
    question: "في أي عام تأسست الولايات المتحدة الأمريكية؟",
    options: ["1776", "1876", "1492", "1789"],
    answer: 0
  },
  {
    question: "ما هو أكبر كوكب في نظامنا الشمسي؟",
    options: ["الأرض", "المشتري", "المريخ", "زحل"],
    answer: 1
  }
  // يمكنك إضافة المزيد من الأسئلة هنا
];

let currentQuestionIndex = 0;
let score = 0;

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const nextButton = document.getElementById('next-btn');
const resultContainer = document.getElementById('result');
const gameContainer = document.getElementById('game');
const scoreEl = document.getElementById('score');
const totalEl = document.getElementById('total');
const restartButton = document.getElementById('restart-btn');

function startGame() {
  currentQuestionIndex = 0;
  score = 0;
  gameContainer.classList.remove('hidden');
  resultContainer.classList.add('hidden');
  nextButton.classList.add('hidden');
  showQuestion();
}

function showQuestion() {
  nextButton.classList.add('hidden');
  const currentQuestion = questions[currentQuestionIndex];
  questionEl.textContent = currentQuestion.question;
  optionsEl.innerHTML = '';
  
  currentQuestion.options.forEach((option, index) => {
    const li = document.createElement('li');
    const button = document.createElement('button');
    button.textContent = option;
    button.addEventListener('click', () => selectAnswer(index));
    li.appendChild(button);
    optionsEl.appendChild(li);
  });
}

function selectAnswer(selectedIndex) {
  const currentQuestion = questions[currentQuestionIndex];
  // تعطيل أزرار الخيارات بعد الاختيار
  Array.from(optionsEl.children).forEach(li => {
    li.firstChild.disabled = true;
  });
  
  if (selectedIndex === currentQuestion.answer) {
    score++;
    optionsEl.children[selectedIndex].firstChild.style.backgroundColor = "green";
  } else {
    optionsEl.children[selectedIndex].firstChild.style.backgroundColor = "red";
    optionsEl.children[currentQuestion.answer].firstChild.style.backgroundColor = "green";
  }
  
  nextButton.classList.remove('hidden');
}

nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  gameContainer.classList.add('hidden');
  resultContainer.classList.remove('hidden');
  scoreEl.textContent = score;
  totalEl.textContent = questions.length;
}

restartButton.addEventListener('click', startGame);

startGame();
