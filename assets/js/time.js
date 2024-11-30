jQuery(document).ready(function ($) {
  let timer_id = 0;
  const conft = document.getElementById("__confetti");
  const LetsCelebImage = document.getElementById("__LetsCelebrate");
  const timerContainer = document.querySelector(".timer__container");
  const _Day = document.querySelector(".day");
  const _Hour = document.querySelector(".hour");
  const _Min = document.querySelector(".min");
  const _Sec = document.querySelector(".sec");

  // custom code
  const countDown = () => {
    const countDate = new Date("December 19, 2024 09:00:00").getTime();
    // const countDate = new Date("February 07, 2023 15:13:00").getTime();
    const currentTime = new Date().getTime();
    const gap = countDate - currentTime;

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    if (currentTime >= countDate) {
      clearInterval(timer_id);
      LetsCelebImage.style.display = "block";
      timerContainer.style.display = "none";

      if (currentTime - countDate <= 5 * 60 * 1000) {
        console.log(conft);
        conft.style.display = "block";

        setTimeout(() => {
          conft.style.height = "0px";
        }, 5000);
      }
      return;
    }

    // since we are using the same timer for multiple elements, we are using the id of the element to get the element and set the value
    // if the element is not present, we are returning from the function
    if (!_Day || !_Hour || !_Min || !_Sec) return;

    //calculating the values for days, hours, minutes and seconds
    let textDay = Math.floor(gap / day);
    let textHour = Math.floor((gap % day) / hour);
    let textMinute = Math.floor((gap % hour) / minute);
    let textSecond = Math.floor((gap % minute) / second);

    textDay = textDay < 10 ? "0" + textDay : textDay;
    textHour = textHour < 10 ? "0" + textHour : textHour;
    textMinute = textMinute < 10 ? "0" + textMinute : textMinute;
    textSecond = textSecond < 10 ? "0" + textSecond : textSecond;

    //setting the values to the timer per second
    _Day.innerText = textDay;
    _Hour.innerText = textHour;
    _Min.innerText = textMinute;
    _Sec.innerText = textSecond;
  };

  timer_id = setInterval(countDown, 1000);
});
