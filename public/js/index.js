import '@babel/polyfill';
import { login, logout, signup } from './login';
import { bookTour } from './stripe';
import { updateNameAndEmail, updatePassword } from './updateSettings';
import { displayMap } from './mapbox';

// DOM ELEMENTS
const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const signupForm = document.querySelector('.form--signup');
const accountForm = document.querySelector('.form-user-data');
const accountFormPass = document.querySelector('.form-user-settings');
const logoutBtn = document.querySelector('.nav__el--logout');
const bookButton = document.getElementById('book-tour');

// DELEGATION
if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}

if (accountForm) {
  accountForm.addEventListener('submit', e => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);
    updateNameAndEmail(form);
  });
}

if (accountFormPass) {
  accountFormPass.addEventListener('submit', e => {
    e.preventDefault();
    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    updatePassword(passwordCurrent, password, passwordConfirm);
  });
}

if (loginForm) {
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

if (signupForm) {
  signupForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;
    signup({ name, email, password, passwordConfirm });
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener('click', e => {
    logout();
  });
}

if (bookButton) {
  bookButton.addEventListener('click', e => {
    e.target.textContent = 'Processing...';
    const { tourId } = e.target.dataset;
    bookTour(tourId);
  });
}
