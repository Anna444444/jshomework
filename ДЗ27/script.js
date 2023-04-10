document.getElementById('submit').addEventListener('click', function () {
  let fileInput = document.getElementById('file-input');
  let files = fileInput.files;

  let votes = [];

  let readFiles = Array.from(files).map(file => {
    return new Promise((resolve) => {
      let reader = new FileReader();

      reader.onload = function (event) {
        votes.push({ content: event.target.result.trim() });
        resolve();
      };

      reader.readAsText(file);
    });
  });

  Promise.all(readFiles).then(() => {
    countVotesAndDeclareWinner(votes);
  });
});

function countVotesAndDeclareWinner(votes) {
  let candidates = {
    "страшила": 0,
    "лев": 0,
    "дровосек": 0
  };

  votes.forEach(vote => {
    let candidate = vote.content;
    if (candidates.hasOwnProperty(candidate)) {
      candidates[candidate]++;
    }
  });

  let winner = null;
  let maxVotes = 0;

  let resultsContainer = document.getElementById('results-container');
  resultsContainer.innerHTML = '';

  for (const candidate in candidates) {
    let votes = candidates[candidate];
    let resultLine = document.createElement('p');
    resultLine.textContent = `${votes} голосов получил ${candidate}`;
    resultsContainer.appendChild(resultLine);

    if (votes > maxVotes) {
      maxVotes = votes;
      winner = candidate;
    }
  }

  let winnerLine = document.createElement('p');
  winnerLine.textContent = `Победил ${winner}!`;
  winnerLine.style.fontWeight = 'bold';
  resultsContainer.appendChild(winnerLine);
}