window.onload = async () => {
  const advice = await getRandomAdvice();
  setAdvice(advice.id, advice.text);
};

document.getElementById("advice-random-dice-button").onclick = async () => {
  const advice = await getRandomAdvice();
  setAdvice(advice.id, advice.text);
};

async function getRandomAdvice() {
  const response = await fetch("https://ill-gray-centipede-wear.cyclic.app/advices");
  const advice = await response.json();
  const adviceId = advice.id;

  if (adviceId === getRandomAdvice.lastId) {
    return getRandomAdvice();
  }
  getRandomAdvice.lastId = adviceId;
  return advice;
}
getRandomAdvice.lastId = undefined;

function setAdvice(number, text) {
  const adviceNumberElement = document.getElementById("advice-number");
  const adviceTextElement = document.getElementById("advice-text");

  adviceNumberElement.innerHTML = `<span>Advice #${number}</span>`;
  adviceTextElement.innerHTML = `<span>${text}</span>`;
}
