import './style.css'
import render from './js/render.js'
import date from './js/date.js'
import device from './js/device.js'

const deviceData = device();

let options = {};
options.performance = "low";

date();
render(options);