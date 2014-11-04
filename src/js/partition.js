window.score = new JellyScore.ScoreInterface();
window.score.resetScore();
window.score.draw($('article'));
window.score.addNote(0, 65, 7)

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

var i = 0;
function customAddNote() {
  var j = getRandomInt(1, 12);
  window.score.addNote(i, getRandomInt(50,80), j);
  i += j;
  setTimeout(function() {customAddNote();}, 200);
}

customAddNote();
