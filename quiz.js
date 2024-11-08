// DICHIARAZIONE COSTANTI E VARIABILI

// Array di oggetti JSON contenente le domande del quiz, le opzioni e la risposta corretta
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
        answer: "Supercoppa UEFA"
    },
    {
        question: "Qual è il soprannome di Kakà?",
        options: ["Ricky", "Il Fenomeno", "Il Maestro", "Kakinha" ],
        answer: "Ricky"
    },
    {
        question: "In quale anno Kakà ha lasciato l'AC Milan per trasferirsi al Real Madrid?",
        options: ["2008", "2009", "2010", "2012"],
        answer: "2009"
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

const questionElement = document.getElementById("question");                // Elemento per la domanda
const optionsElement = document.getElementById("options");                  // Elemento per le opzioni di risposta
const questionNumberElement = document.getElementById("question-number");   // Elemento per il numero della domanda
const feedbackElement = document.getElementById("feedback");                // Elemento per il feedback
const submitButton = document.getElementById("next");                       // Bottone per passare alla prossima domanda
submitButton.addEventListener("click", nextQuestion);                       // EventListener per passare alla domanda successiva

let answered = false;       // Variabile per controllare se l'utente ha già risposto alla domanda corrente

let currentQuestion = 0;    // Indice della domanda corrente
let score = 0;              // Punteggio dell'utente

// DICHIARAZIONE FUNZIONI

// Funzione per mostrare la domanda corrente
function showQuestion() {
    const question = quizData[currentQuestion];                         // Ottiene la domanda corrente

    questionNumberElement.innerText = `Domanda ${currentQuestion + 1}`; // Inserisce il numero della domanda nell'elemento html
    questionElement.innerText = question.question;                      // Inserisce la domanda nell'elemento html

    optionsElement.innerHTML = "";      // Pulisce le opzioni di risposta
    feedbackElement.innerText = "";     // Pulisce il feedback

    question.options.forEach(option => {    // Ciclo per ogni opzione di risposta
        const button = document.createElement("button");    // Crea un bottone
        button.innerText = option;                          // Inserisce il testo nel bottone
        optionsElement.appendChild(button);                 // Aggiunge il bottone creato al DOM
        button.addEventListener("click", selectAnswer);     // Aggiunge un evento click al bottone
    });

}

// Funzione per verificare la risposta selezionata
function selectAnswer(e) {

    if (!answered) {    //procede solo se l'utente non ha già risposto, così facendo posso selezionare la risposta solo una volta
        const selectedButton = e.target;
        const answer = quizData[currentQuestion].answer;

        if (selectedButton.innerText === answer) {  // Controllo se la risposta selezionata è uguale a quella corretta
            score++;
            feedbackElement.innerText = "Risposta corretta!"; // Feedback per la risposta corretta
            feedbackElement.style.color = "green";
        } else {
            feedbackElement.innerText = `SBAGLIATO! La risposta corretta era: "${answer}".`; // Feedback per la risposta sbagliata
            feedbackElement.style.color = "red";
        }
        answered = true;    // Segno che l'utente ha risposto
    }
}

// Funzione per passare alla prossima domanda o al risultato finale
function nextQuestion() {
    if(answered) {  // Controllo se l'utente ha già risposto alla domanda, in caso non abbia risposto non procedo
        
        currentQuestion++;
        if (currentQuestion < quizData.length) { // Controllo se ho finito le domande
            showQuestion();
        } else {
            showResult();
        }
        answered = false; // Resetta la variabile per la risposta

    }else{
        alert("Devi rispondere alla domanda prima di passare alla successiva!");
    }
}

// Funzione per mostrare il risultato finale
function showResult() {
    let message = "";
    let image = "";

    // Imposta un messaggio e un'immagine in base al punteggio ottenuto
    if (score === quizData.length) {
        message = "Perfetto! Sei un vero esperto di Kakà! Complimenti!";
        image = "img/result1.jpg";
    } else if (score >= quizData.length * 0.75) {
        message = "Ottimo lavoro! Hai risposto correttamente alla maggior parte delle domande.";
        image = "img/result2.jpg";
    } else if (score >= quizData.length * 0.5) {
        message = "Buon tentativo! Puoi migliorare studiando un po' di più su Kakà.";
        image = "img/result3.jpg";
    } else if (score >= 1) {
        message = "Non andiamo bene... Se lo scopre il prof sono dolori, studia e ritenta!";
        image = "img/result4.jpg";
    } else {
        message = "BASTARDO BIANCONERO! Fuori da questo quiz, non sei degno di rispondere alle domande su Kakà!";
        image = "img/result5.jpg";
    }

    //Crea l'elemento html con il risultato, l'immagine e il messaggio
    quiz.innerHTML = `
      <h1>Quiz Completato!</h1>
        <img src="${image}" alt="Risultato" style="max-width:400px; max-height: 300px;"/>
      <p>Il tuo punteggio: ${score}/${quizData.length}</p>
      <p>${message}</p>
    `;
}

// ESECUZIONE DEL CODICE

// Mostra la prima domanda quando la pagina viene caricata
showQuestion();
