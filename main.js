import './style.css'
import render from './js/render.js'
import date from './js/date.js'
import device from './js/device.js'
import perfChoice from './js/perfChoice'
import email from './js/email.js'
import userInterfaceController from './js/userInterface.js'

const deviceData = device();
let options = perfChoice(deviceData);

userInterfaceController();
email();
date();
render(options);