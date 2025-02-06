function openModal(element) { 
    element.classList.add("popup_is-opened"); 
    element.addEventListener("click", handleOverlayClose); 
    document.addEventListener("keydown", handleEscClose); 
  } 
   
  function closeModal(element) { 
    element.classList.remove("popup_is-opened"); 
    element.removeEventListener("click", handleOverlayClose); 
    document.removeEventListener("keydown", handleEscClose); 
  } 
   
  function handleEscClose(evt) { 
    if (evt.key === "Escape") { 
      const modalWindow = document.querySelector(".popup_is-opened"); 
      closeModal(modalWindow); 
    } 
  } 
   
  export function handleOverlayClose(evt) { 
    if (evt.target === evt.currentTarget) { 
      closeModal(evt.currentTarget); 
    } 
  } 
   
  export { openModal, closeModal }; 
  