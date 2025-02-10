document.addEventListener("DOMContentLoaded", function() {
    if (document.getElementById("questions-list")) {
        chargerQuestions();
    }
    if (document.getElementById("add-question-form")) {
        document.getElementById("add-question-form").addEventListener("submit", ajouterQuestion);
    }
    if (document.getElementById("toggle-sound")) {
        document.getElementById("toggle-sound").checked = localStorage.getItem("sound") === "on";
    }
});

function chargerQuestions() {
    let questions = JSON.parse(localStorage.getItem("questions")) || [];
    let list = document.getElementById("questions-list");
    list.innerHTML = ""; 

    questions.forEach(question => {
        let li = document.createElement("li");
        li.textContent = question.query;
        list.appendChild(li);
    });
}

function ajouterQuestion(event) {
    event.preventDefault();
    
    let questionInput = document.getElementById("question").value;
    let answerInput = document.getElementById("answer").value;
    
    if (questionInput.trim() === "" || answerInput.trim() === "") return;

    let questions = JSON.parse(localStorage.getItem("questions")) || [];
    questions.push({ query: questionInput, answer: answerInput });
    localStorage.setItem("questions", JSON.stringify(questions));

    window.location.href = "ViewQuestionsView.html";
}

function retourAccueil() {
    window.location.href = "../index.html";
}

function toggleSound() {
    let isSoundOn = document.getElementById("toggle-sound").checked;
    localStorage.setItem("sound", isSoundOn ? "on" : "off");
}

function partagerQuestions() {
    let questions = JSON.parse(localStorage.getItem("questions")) || [];
    let formattedQuestions = questions.map(q => `${q.query}\n${q.answer}`).join("\n\n");

    if (navigator.share) {
        navigator.share({
            title: "Mes Questions",
            text: formattedQuestions
        }).catch(err => console.log("Erreur de partage :", err));
    } else {
        alert("Le partage n'est pas supporté sur ce navigateur.");
    }
}

function importerQuestions(event) {
    let file = event.target.files[0];
    if (!file) return;

    let reader = new FileReader();
    reader.onload = function(e) {
        let contenu = e.target.result;
        let lignes = contenu.split("\n\n");
        let questions = lignes.map(ligne => {
            let parts = ligne.split("\n");
            return { query: parts[0], answer: parts[1] || "" };
        });

        localStorage.setItem("questions", JSON.stringify(questions));
        alert("Importation réussie !");
        location.reload();
    };
    reader.readAsText(file);
}