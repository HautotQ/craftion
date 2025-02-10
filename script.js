document.addEventListener("DOMContentLoaded", function() {
    if (document.getElementById("questions-list")) {
        chargerQuestions();
    }
});

function chargerQuestions() {
    let questions = [
        "Quelle est la capitale de la France ?",
        "Combien de continents y a-t-il sur Terre ?"
    ];
    
    let list = document.getElementById("questions-list");
    questions.forEach(question => {
        let li = document.createElement("li");
        li.textContent = question;
        list.appendChild(li);
    });
}

function retourAccueil() {
    window.location.href = "../index.html";
}