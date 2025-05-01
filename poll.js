document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("pollForm");
    const resultSection = document.getElementById("resultSection");
    const resultsList = document.getElementById("resultsList");
    const pollKey = "colorPollVotes";

    const options = ["Red", "Blue", "Green"];

    // Initialize localStorage if not already set
    function initVotes() {
        if (!localStorage.getItem(pollKey)) {
            const initialVotes = {};
            options.forEach(opt => initialVotes[opt] = 0);
            localStorage.setItem(pollKey, JSON.stringify(initialVotes));
        }
    }

    function getVotes() {
        return JSON.parse(localStorage.getItem(pollKey));
    }

    function saveVotes(votes) {
        localStorage.setItem(pollKey, JSON.stringify(votes));
    }

    function hasVoted() {
        return localStorage.getItem("hasVoted_colorPoll") === "true";
    }

    function setVoted() {
        localStorage.setItem("hasVoted_colorPoll", "true");
    }

    function displayResults() {
        const votes = getVotes();
        const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0) || 1;
        resultsList.innerHTML = "";

        for (const [option, count] of Object.entries(votes)) {
            const percent = ((count / totalVotes) * 100).toFixed(1);
            const li = document.createElement("li");
            li.textContent = `${option}: ${count} vote(s) (${percent}%)`;
            resultsList.appendChild(li);
        }

        resultSection.style.display = "block";
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        if (hasVoted()) {
            alert("You have already voted!");
            return;
        }

        const selected = form.color.value;

        if (!selected) {
            alert("Please select an option.");
            return;
        }

        const votes = getVotes();
        votes[selected]++;
        saveVotes(votes);
        setVoted();
        displayResults();
    });

    // Setup
    initVotes();
    if (hasVoted()) {
        displayResults();
    }
});
