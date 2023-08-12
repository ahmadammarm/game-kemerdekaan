const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");

let currentQuestion = {}
let acceptingAnswer = true
let score = 0
let questionCounter = 0
let availableQuestion = []

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
        choice1: "28 Oktober 1928",
        choice2: "1 Juni 1945",
        choice3: "10 November 1945",
        choice4: "17 Agustus 1945",
        answer: 2,
    },
    {
        question: "Kapan tanggal diumumkannya proklamasi kemerdekaan Indonesia?",
        choice1: "28 Oktober 1928",
        choice2: "1 Juni 1945",
        choice3: "10 November 1945",
        choice4: "17 Agustus 1945",
        answer: 2,
    },
    {
        question: "Kapan tanggal diumumkannya proklamasi kemerdekaan Indonesia?",
        choice1: "28 Oktober 1928",
        choice2: "1 Juni 1945",
        choice3: "10 November 1945",
        choice4: "17 Agustus 1945",
        answer: 2,
    },
    {
        question: "Kapan tanggal diumumkannya proklamasi kemerdekaan Indonesia?",
        choice1: "28 Oktober 1928",
        choice2: "1 Juni 1945",
        choice3: "10 November 1945",
        choice4: "17 Agustus 1945",
        answer: 2,
    },
    {
        question: "Kapan tanggal diumumkannya proklamasi kemerdekaan Indonesia?",
        choice1: "28 Oktober 1928",
        choice2: "1 Juni 1945",
        choice3: "10 November 1945",
        choice4: "17 Agustus 1945",
        answer: 2,
    },
    {
        question: "Kapan tanggal diumumkannya proklamasi kemerdekaan Indonesia?",
        choice1: "28 Oktober 1928",
        choice2: "1 Juni 1945",
        choice3: "10 November 1945",
        choice4: "17 Agustus 1945",
        answer: 2,
    },
    {
        question: "Kapan tanggal diumumkannya proklamasi kemerdekaan Indonesia?",
        choice1: "28 Oktober 1928",
        choice2: "1 Juni 1945",
        choice3: "10 November 1945",
        choice4: "17 Agustus 1945",
        answer: 2,
    }

]

