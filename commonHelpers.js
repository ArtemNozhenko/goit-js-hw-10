import"./assets/modulepreload-polyfill-3cfb730f.js";/* empty css                      */import{f as b,i as f}from"./assets/vendor-77e16229.js";const c=document.querySelector("#datetime-picker"),e=document.querySelector("[data-start]"),h=document.querySelector("[data-days]"),y=document.querySelector("[data-hours]"),S=document.querySelector("[data-minutes]"),D=document.querySelector("[data-seconds]");e.setAttribute("disabled",!0);let u=0;const p={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(t){u=t[0],u<new Date?(f.error({color:"red",message:"Please choose a date in the future.",position:"topRight"}),e.setAttribute("disabled",!0)):e.removeAttribute("disabled")}};b(c,p);e.addEventListener("click",q);function A(t){const o=Math.floor(t/864e5),i=Math.floor(t%864e5/36e5),l=Math.floor(t%864e5%36e5/6e4),m=Math.floor(t%864e5%36e5%6e4/1e3);return{days:o,hours:i,minutes:l,seconds:m}}function q(){e.setAttribute("disabled",!0),c.setAttribute("disabled",!0);let t=u-new Date;const n=setInterval(()=>{let{days:s,hours:a,minutes:d,seconds:o}=A(t);h.textContent=r(s),y.textContent=r(a),S.textContent=r(d),D.textContent=r(o),s===0&&a===0&&d===0&&o===0&&(clearInterval(n),e.removeAttribute("disabled"),c.removeAttribute("disabled")),t-=1e3},1e3)}function r(t){return t<10?"0"+t:t}
//# sourceMappingURL=commonHelpers.js.map
