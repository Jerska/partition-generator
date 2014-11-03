window.score = new JellyScore.ScoreInterface();
window.score.resetScore();
window.score.draw($('article'));
window.score.addNote(0, 65, 7)

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

for (var i = 0; i < 500;) {
  var j = getRandomInt(1, 12);
  window.score.addNote(i, getRandomInt(45,90), j);
  i += j;
}
