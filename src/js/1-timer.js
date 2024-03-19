import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const selector = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('[data-start]');
btnStart.setAttribute('disabled', true);
let userSelectedDates = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDates = selectedDates[0];
    const currentDate = new Date();
    if (userSelectedDates < currentDate) {
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
  let msDifference = userSelectedDates - new Date();
  const intervalId = setInterval(() => {
    let { days, hours, minutes, seconds } = convertMs(msDifference);
    document.querySelector('[data-days]').textContent = addZeroOnStart(days);
    document.querySelector('[data-hours]').textContent = addZeroOnStart(hours);
    document.querySelector('[data-minutes]').textContent =
      addZeroOnStart(minutes);
    document.querySelector('[data-seconds]').textContent =
      addZeroOnStart(seconds);
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
