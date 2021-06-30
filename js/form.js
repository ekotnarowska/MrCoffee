const form = document.querySelector('form');
const nameField = document.querySelector('#name');
const surnameField = document.querySelector('#surname');
const telephoneField = document.querySelector('#telephone');
const emailField = document.querySelector('#email');
const messageField = document.querySelector('#message');
const closeModalButton = document.querySelector('.popup__btn');
const modal = document.querySelector('.contact__popup');
const overlay = document.querySelector('.overlay');

const showModal = () => {
  modal.classList.add('active');
  overlay.classList.add('active');
};

const closeModal = () => {
  modal.classList.remove('active');
  overlay.classList.remove('active');
};

closeModalButton.addEventListener('click', closeModal);

function testText(field, lng) {
  return field.value.length >= lng;
}

function testEmail(field) {
  const reg = /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*(\.\w{2,})+$/;
  return reg.test(field.value);
}

function removeFieldError(field) {
  const errorText = field.nextElementSibling;
  if (errorText !== null) {
    if (errorText.classList.contains('form__error-text')) {
      errorText.remove();
    }
  }
}

function createFieldError(field, text) {
  removeFieldError(field);

  const div = document.createElement('div');
  div.classList.add('form__error-text');
  div.innerText = text;

  if (field.nextElementSibling === null) {
    field.parentElement.appendChild(div);
  } else if (!field.nextElementSibling.classList.contains('form__error-text')) {
    field.parentElement.insertBefore(div, field.nextElementSibling);
  }
}

function markFieldAsError(field, show) {
  if (show) {
    field.classList.add('field-error');
  } else {
    field.classList.remove('field-error');
    removeFieldError(field);
  }
}

nameField.addEventListener('input', (e) => markFieldAsError(e.target, !testText(e.target, 3)));
surnameField.addEventListener('input', (e) => markFieldAsError(e.target, !testText(e.target, 3)));
emailField.addEventListener('input', (e) => markFieldAsError(e.target, !testEmail(e.target, 3)));
messageField.addEventListener('input', (e) => markFieldAsError(e.target, !testText(e.target, 3)));

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const contactForm = {
    name: nameField.value,
    surname: surnameField.value,
    telephone: telephoneField.value,
    email: emailField.value,
    message: messageField.value,
  };

  let formErrors = false;

  for (const field of [nameField, surnameField, emailField, messageField]) {
    markFieldAsError(field, false);
    removeFieldError(field);
  }

  if (!testText(nameField, 2)) {
    createFieldError(nameField, 'Veuillez remplir correctement le champ du prenom');
    formErrors = true;
  }

  if (!testText(surnameField, 3)) {
    createFieldError(surnameField, 'Veuillez remplir correctement le champ du nom');
    formErrors = true;
  }

  if (!testEmail(emailField)) {
    createFieldError(emailField, 'Veuillez remplir correctement le champ e-mail');
    formErrors = true;
  }

  if (!testText(messageField, 3)) {
    createFieldError(messageField, 'Veuillez saisir votre message');
    formErrors = true;
  }
  if (!formErrors) {
    // e.target.submit()
    showModal();
    console.log(JSON.stringify(contactForm, '\t', 2));
    form.reset();
  }
});
