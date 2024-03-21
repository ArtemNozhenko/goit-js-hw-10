import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const selector = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('[data-start]');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');
btnStart.setAttribute('disabled', true);
let userSelectedDate = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    const currentDate = new Date();
    if (userSelectedDate < currentDate) {
      iziToast.error({
        color: 'red',
        message: 'Please choose a date in the future.',
        position: 'topRight',
      });
      btnStart.setAttribute('disabled', true);
    } else {
      btnStart.removeAttribute('disabled');
    }
  },
};
flatpickr(selector, options);

btnStart.addEventListener('click', startTimer);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function startTimer() {
  btnStart.setAttribute('disabled', true);
  selector.setAttribute('disabled', true);
  let msDifference = userSelectedDate - new Date();
  const intervalId = setInterval(() => {
    let { days, hours, minutes, seconds } = convertMs(msDifference);
    dataDays.textContent = addZeroOnStart(days);
    dataHours.textContent = addZeroOnStart(hours);
    dataMinutes.textContent = addZeroOnStart(minutes);
    dataSeconds.textContent = addZeroOnStart(seconds);
    if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
      clearInterval(intervalId);
      btnStart.removeAttribute('disabled');
      selector.removeAttribute('disabled');
    }
    msDifference -= 1000;
  }, 1000);
}
function addZeroOnStart(value) {
  return value < 10 ? '0' + value : value;
}
