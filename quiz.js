// Array di oggetti contenente le domande del quiz, le opzioni e la risposta corretta
const quizData = [
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
    // Aggiungi altre domande qui...
];

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const questionNumberElement = document.getElementById("question-number"); // Elemento per il numero della domanda
const feedbackElement = document.getElementById("feedback"); // Elemento per il feedback
const submitButton = document.getElementById("submit");

let currentQuestion = 0;
let score = 0;

function showQuestion() {
    const question = quizData[currentQuestion];
    questionNumberElement.innerText = `Domanda numero ${currentQuestion + 1}/${quizData.length}`; // Aggiorna il numero della domanda
    questionElement.innerText = question.question;

    optionsElement.innerHTML = "";
    feedbackElement.innerText = ""; // Resetta il feedback

    question.options.forEach(option => {
        const button = document.createElement("button");
        button.innerText = option;
        optionsElement.appendChild(button);
        button.addEventListener("click", selectAnswer);
    });
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const answer = quizData[currentQuestion].answer;

    if (selectedButton.innerText === answer) {
        score++;
        feedbackElement.innerText = "Risposta corretta!"; // Feedback per la risposta corretta
        feedbackElement.style.color = "green";
    } else {
        feedbackElement.innerText = `Risposta sbagliata! La risposta corretta era: "${answer}".`; // Feedback per la risposta sbagliata
        feedbackElement.style.color = "red";
    }

    currentQuestion++;

    setTimeout(() => {
        if (currentQuestion < quizData.length) {
            showQuestion();
        } else {
            showResult();
        }
    }, 2000); // Pausa prima di mostrare la prossima domanda o il risultato
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
        message = "BASTARDO BIANCONERO! Fuori da questo quiz, non sei degno di rispondere a domande su Kakà!";
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
