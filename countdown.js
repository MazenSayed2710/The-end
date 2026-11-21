const countdownContainer = document.querySelector(".container");

if (countdownContainer) {
  const targetDateString = countdownContainer.dataset.target;
  const finishedMessage = countdownContainer.dataset.finished || "Countdown complete!";

  // Parse as local midnight to avoid UTC date-only parsing shifting the day.
  const [year, month, day] = targetDateString.split("-").map(Number);
  const targetDate = new Date(year, month - 1, day).getTime();

  const daysElement = document.getElementById("days");
  const hoursElement = document.getElementById("hours");
  const minutesElement = document.getElementById("minutes");
  const secondsElement = document.getElementById("seconds");
  const countdownElement = document.querySelector(".countdown");

  function updateCountdown() {
    const difference = targetDate - Date.now();

    if (difference <= 0) {
      countdownElement.innerHTML = `
        <div class="unit finished">
          <span class="number">🎉</span>
          <span class="label">${finishedMessage}</span>
        </div>
      `;
      clearInterval(timer);
      return;
    }

    const days = Math.floor(difference / 86400000);
    const hours = Math.floor((difference / 3600000) % 24);
    const minutes = Math.floor((difference / 60000) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    daysElement.textContent = days;
    hoursElement.textContent = String(hours).padStart(2, "0");
    minutesElement.textContent = String(minutes).padStart(2, "0");
    secondsElement.textContent = String(seconds).padStart(2, "0");
  }

  updateCountdown();
  const timer = setInterval(updateCountdown, 1000);
}
