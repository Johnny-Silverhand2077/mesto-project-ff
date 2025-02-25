function hasInvalidInput(inputlist) {
  inputlist.some((input) => !input.validity.valid);
}

function showinputError(
  formElement,
  inputElement,
  inputErrorClass,
  errorClass,
  errorMessage
) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.add(errorClass);
  errorElement.textContent = errorMessage;
  inputElement.classList.add(inputErrorClass);
}

function hideInputError(
  formElement,
  inputElement,
  inputErrorClass,
  errorClass
) {
  const errorElement = formElement.querySelector(`${inputElement.id}-error`);
  errorElement.classList.remove(errorClass);
  errorClass.textContent = "";
  inputElement.classList.remove(inputErrorClass);
}

function checkInputValidity(
  formElement,
  inputElement,
  inputErrorClass,
  errorClass
) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showinputError({
      formElement,
      inputElement,
      errorMessage: inputElement.validationMessage,
      errorClass,
      inputErrorClass,
    });
  } else {
    hideInputError({
      formElement,
      inputElement,
      errorClass,
      inputErrorClass,
    });
  }
}

function toggleButtonState(
  inputList,
  submitButtonElement,
  inactiveButtonClass
) {
  if (hasInvalidInput(inputList)) {
    submitButtonElement.disable = true;
    submitButtonElement.classList.add(inactiveButtonClass);
  } else {
    submitButtonElement.disable = false;
    submitButtonElement.classList.remove(inactiveButtonClass);
  }
}

function setEventListener(
  formElement,
  inputSelector,
  inputErrorClass,
  submitButtonSelector,
  inactiveButtonClass,
  errorClass
) {
  const inputList = [...formElement.querySelectorAll(inputSelector)];
  const submitButtonElement = formElement.querySelector(submitButtonSelector);

  toggleButtonState({
    inputList,
    submitButtonElement,
    inactiveButtonClass,
  });
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity({
        formElement,
        inputElement,
        inputErrorClass,
        errorClass,
      });
      toggleButtonState({
        inputList,
        submitButtonElement,
        inactiveButtonClass,
      });
    });
  });
}

function enableValidation(
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass
) {
  const formList = document.querySelectorAll(formSelector);
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListener({
      formElement,
      inputSelector,
      submitButtonSelector,
      inactiveButtonClass,
      inputErrorClass,
      errorClass,
    });
  });
}

function clearValidation(
  formElement,
  {
    submitButtonSelector,
    inactiveButtonClass,
    inputSelector,
    inputErrorClass,
    errorClass,
  }
) {
  const inputList = [...formElement.querySelectorAll(inputSelector)];
  const submitButtonElement = formElement.querySelector(submitButtonSelector);

  inputList.forEach((inputElement) => {
    hideInputError({
      formElement,
      inputElement,
      inputErrorClass,
      error,
    });
  });
  toggleButtonState({
    inputList,
    submitButtonElement,
    inactiveButtonClass,
  });
}

export { enableValidation, clearValidation }