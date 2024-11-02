// Array di oggetti contenente le domande del quiz, le opzioni e la risposta corretta
const quizData = [
    {
        question: "Qual è il nome completo di Kakà?",
        options: ["Ricardo dos Santos", "Ricardo Santos da Silva", "Ricardo Leite da Silva", "Ricardo Izecson dos Santos Leite"],
        answer: "Ricardo Izecson dos Santos Leite"
    },
    {
        question: "Quale numero di maglia indossava Kakà all'AC Milan?",
        options: ["7", "22", "10", "12"],
        answer: "22"
    },
    {
      question: "Per quale di queste squadre non ha mai giocato Kakà?",
      options: ["Milan", "Real Madrid", "Juventus", "San Paolo"],
      answer: "Juventus"
    },
    {
      question: "In che anno Kakà ha vinto il Pallone d'Oro?",
      options: ["2006", "2007", "2008", "2010"],
      answer: "2007"
    },
    {
        question: "In quale competizione europea ha vinto Kakà il suo primo trofeo con l'AC Milan?",
        options: ["Coppa UEFA", "Supercoppa UEFA", "UEFA Champions League", "Coppa Italia"],
        answer: "UEFA Champions League"
    },
    {
        question: "Qual è il soprannome di Kakà?",
        options: ["O Rei", "Il Fenomeno", "Il Maestro", "Kakinha" ],
        answer: "Kakinha"
    },
    {
        question: "In quale anno Kakà ha lasciato l'AC Milan per trasferirsi al Real Madrid?",
        options: ["2008", "2010", "2012", "2014"],
        answer: "2008"
    },
    {
        question: "Quale squadra Kakà ha affrontato quando ha segnato il suo primo gol in Champions League con l'AC Milan?",
        options: ["Celtic", "Fenerbahçe", "Manchester United", "Anderlecht"],
        answer: "Fenerbahçe"
    },
    {
        question: "Contro quale squadra Kakà ha realizzato una doppietta nel 2007 durante la semifinale di Champions League?",
        options: ["Liverpool", "Bayern Monaco", "Manchester United", "Chelsea"],
        answer: "Manchester United"
    },
    {
        question: "Quanti gol ha segnato Kakà in totale con la nazionale brasiliana?",
        options: ["29", "35", "45", "50"],
        answer: "29"
      },
];

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const questionNumberElement = document.getElementById("question-number"); // Elemento per il numero della domanda
const feedbackElement = document.getElementById("feedback"); // Elemento per il feedback
const submitButton = document.getElementById("next"); // Bottone per passare alla prossima domanda


let answered = false; //variabile per controllare se l'utente ha risposto alla domanda corrente

let currentQuestion = 0;
let score = 0;

function showQuestion() {
    const question = quizData[currentQuestion];
    questionNumberElement.innerText = `Domanda ${currentQuestion + 1}`; // Aggiorna il numero della domanda
    questionElement.innerText = question.question;

    optionsElement.innerHTML = "";
    feedbackElement.innerText = ""; // Resetta il feedback

    question.options.forEach(option => {
        const button = document.createElement("button");
        button.innerText = option;
        optionsElement.appendChild(button);
        button.addEventListener("click", selectAnswer);
    });

    submitButton.addEventListener("click", nextQuestion);
}

function selectAnswer(e) {

    if (!answered) {
        const selectedButton = e.target;
    const answer = quizData[currentQuestion].answer;

    if (selectedButton.innerText === answer) {
        score++;
        feedbackElement.innerText = "Risposta corretta!"; // Feedback per la risposta corretta
        feedbackElement.style.color = "green";
    } else {
        feedbackElement.innerText = `SBAGLIATO! La risposta corretta era: "${answer}".`; // Feedback per la risposta sbagliata
        feedbackElement.style.color = "red";
    }
    answered = true;
    }

    /*currentQuestion++;

    setTimeout(() => {
        if (currentQuestion < quizData.length) {
            showQuestion();
        } else {
            showResult();
        }
    }, 2000); // Pausa prima di mostrare la prossima domanda o il risultato
    */
}

function nextQuestion() {
    if(answered) {
        currentQuestion++;
        if (currentQuestion < quizData.length) {
            showQuestion();
        } else {
            showResult();
        }
        answered = false;
    }else{
        alert("Devi rispondere alla domanda prima di passare alla successiva!");
    }
}


function showResult() {
    let message = "";

    // Imposta un messaggio in base al punteggio ottenuto
    if (score === quizData.length) {
        message = "Perfetto! Sei un vero esperto di Kakà! Passerai sicuramente l'esame di Reti di Calcolatori!";
    } else if (score >= quizData.length * 0.75) {
        message = "Ottimo lavoro! Hai risposto correttamente alla maggior parte delle domande.";
    } else if (score >= quizData.length * 0.5) {
        message = "Buon tentativo! Puoi migliorare studiando un po' di più su Kakà.";
    } else if (score >= 1) {
        message = "Non andiamo bene... Se lo scopre il prof Bartoli sono dolori, studia e ritenta!";
    } else {
        message = "BASTARDO BIANCONERO! Fuori da questo quiz, non sei degno di rispondere alle domande su Kakà!";
    }

    // Mostra il risultato e il messaggio
    quiz.innerHTML = `
      <h1>Quiz Completato!</h1>
      <p>Il tuo punteggio: ${score}/${quizData.length}</p>
      <p>${message}</p>
    `;
}


// Mostra la prima domanda quando la pagina viene caricata
showQuestion();
