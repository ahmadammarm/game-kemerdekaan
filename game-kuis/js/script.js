const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");

let currentQuestion = {}
let acceptingAnswer = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: "Kapan tanggal diumumkannya proklamasi kemerdekaan Indonesia?",
        choice1: "28 Oktober 1928",
        choice2: "1 Juni 1945",
        choice3: "10 November 1945",
        choice4: "17 Agustus 1945",
        answer: 4,
    },
    {
        question: "Siapakah yang mengumumkan proklamasi kemerdekaan Indonesia?",
        choice1: "Ir. Soekarno",
        choice2: "Mohammad Hatta",
        choice3: "Mohammad Yamin",
        choice4: "WR. Soepratman",
        answer: 1,
    },
    {
        question: "Siapakah yang mengetik teks proklamasi Kemerdekaan Indonesia?",
        choice1: "Fatmawati",
        choice2: "Sayuti Melik",
        choice3: "KH Agus Salim",
        choice4: "Laksamana Maeda",
        answer: 2,
    },
    {
        question: "Siapakah yang menciptakan lagu Indonesia Raya?",
        choice1: "WR. Soepratman",
        choice2: "Ir. Soekarno",
        choice3: "Fatmawati",
        choice4: "Laksamana Maeda",
        answer: 1,
    },
    {
        question: "Siapakah 3 tokoh yang menyusun naskah proklamasi?",
        choice1: "Ir. Soekarno, Mohammad Hatta, Ahmad Soebardjo",
        choice2: "Fatmawati, WR. Soepratman, Sayuti Melik",
        choice3: "Laksamana Maeda, Mohammad Hatta, Sayuti Melik",
        choice4: "KH Agus Salim, KH Ahmad Dahlan, KH Hasyim Asyari",
        answer: 1,
    },
    {
        question: "Pada pukul berapa teks proklamasi dibacakan?",
        choice1: "07.00 WIB",
        choice2: "06.00 WIB",
        choice3: "10.00 WIB",
        choice4: "12.00 WIB",
        answer: 3,
    },
    {
        question: "Pada tahun berapa Jepang datang ke Indonesia?",
        choice1: "1945",
        choice2: "1928",
        choice3: "1950",
        choice4: "1942",
        answer: 4,
    },
    {
        question: "Apa nama sistem kerja paksa pada pemerintahan penjajah Jepang?",
        choice1: "Rodi",
        choice2: "Romusha",
        choice3: "Kerja bakti",
        choice4: "Kerja kelompok",
        answer: 2,
    },
    {
        question: "Berapa lama Jepang menjajah Indonesia?",
        choice1: "10 tahun",
        choice2: "1 tahun",
        choice3: "3,5 tahun",
        choice4: "9 tahun",
        answer: 3,
    },
    {
        question: "Siapakah tokoh yang memimpin pertempuran Surabaya pada tanggal 10 November 1945?",
        choice1: "Mohammad Hatta",
        choice2: "Jendral Soedirman",
        choice3: "Jendral Ahmad Yani",
        choice4: "Bung Tomo",
        answer: 4,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0
    score=0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)
        return window.location.assign('https://ahmadammarm.github.io/game-kemerdekaan/game-kuis/end.html')
    }

    questionCounter++
    progressText.innerText = `Pertanyaan ${questionCounter} dari ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswer = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswer) return

        acceptingAnswer = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()
