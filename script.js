window.onload = async () => {
  changeState(STATE.DISPLAY_QUOTE);
  await displayNewAdvice();
};
window.onkeyup = (evt) => {
  if (evt.key === "a") {
    changeState(STATE.ADD_QUOTE);
  }
};
const STATE = {
  DISPLAY_QUOTE: 1,
  ADD_QUOTE: 2,
};
document.getElementById("advice-random-dice-button").onclick = async () => {
  await displayNewAdvice();
};

function changeState(newState) {
  if (newState === STATE.DISPLAY_QUOTE) {
    document.querySelector("#advice-add-quote").style.display = "none";
    document.querySelector("#advice-display-quote").style.display = "flex";
  } else if (newState === STATE.ADD_QUOTE) {
    document.querySelector("#advice-add-quote").style.display = "flex";
    document.querySelector("#advice-display-quote").style.display = "none";
  }
}

async function displayNewAdvice() {
  if (getRandomAdvice.running) return;
  const advice = await getRandomAdvice();
  setAdvice(advice.id, advice.text);
}

async function getRandomAdvice() {
  setLoading();
  const response = await fetch(
    "https://ill-gray-centipede-wear.cyclic.app/advices"
  );
  const advice = await response.json();
  const adviceId = advice.id;

  if (adviceId === getRandomAdvice.lastId) {
    return getRandomAdvice();
  }
  getRandomAdvice.lastId = adviceId;
  return advice;
}
getRandomAdvice.running = false;
getRandomAdvice.lastId = undefined;

function setLoading() {
  getRandomAdvice.running = true;

  const adviceNumberElement = document.getElementById("advice-number");
  const adviceTextElement = document.getElementById("advice-text");
  const adviceDelimiterElement = document.getElementById("advice-delimiter");

  adviceNumberElement.innerHTML = "";
  adviceTextElement.innerHTML = `<div class="loader"></div>`;
  adviceDelimiterElement.innerHTML = "";
}

function setAdvice(number, text) {
  getRandomAdvice.running = false;

  const adviceNumberElement = document.getElementById("advice-number");
  const adviceTextElement = document.getElementById("advice-text");
  const adviceDelimiterElement = document.getElementById("advice-delimiter");

  adviceNumberElement.innerHTML = `<span>Advice #${number}</span>`;
  adviceTextElement.innerHTML = `<span>${text}</span>`;
  adviceDelimiterElement.innerHTML = `
    <hr />
    <svg width="40px" height="40px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        clip-rule="evenodd"
        d="m10.75 9c0-.41421-.3358-.75-.75-.75-.41421 0-.75.33579-.75.75v6c0 .4142.33579.75.75.75.4142 0 .75-.3358.75-.75zm4 0c0-.41421-.3358-.75-.75-.75s-.75.33579-.75.75v6c0 .4142.3358.75.75.75s.75-.3358.75-.75z"
      />
    </svg>
    <hr />`;
}

// textarea script https://stackoverflow.com/a/25621277
const tx = document.getElementsByTagName("textarea");

for (let i = 0; i < tx.length; i++) {
  tx[i].setAttribute(
    "style",
    "height:" + tx[i].scrollHeight + "px;overflow-y:hidden;"
  );
  tx[i].addEventListener("input", OnInput, false);
}
function OnInput() {
  this.style.height = 0;
  this.style.height = this.scrollHeight + "px";
}
