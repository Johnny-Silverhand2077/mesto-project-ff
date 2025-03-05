(()=>{"use strict";function e(e){e.classList.add("popup_is-opened"),e.addEventListener("click",r),document.addEventListener("keydown",n)}function t(e){e.classList.remove("popup_is-opened"),e.removeEventListener("click",r),document.removeEventListener("keydown",n)}function n(e){"Escape"===e.key&&t(document.querySelector(".popup_is-opened"))}function r(e){e.target===e.currentTarget&&t(e.currentTarget)}var o={baseUrl:"https://nomoreparties.co/v1/wff-cohort-33",headers:{authorization:"8e006fda-5d15-4d58-9886-d6a87150c44c","Content-Type":"application/json"}};function c(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}var a=document.querySelector("#card-template").content;function u(e,t,n,r,o){var c=a.cloneNode(!0).querySelector(".card"),u=c.querySelector(".card__image"),i=c.querySelector(".card__title"),s=c.querySelector(".card__delete-button"),l=c.querySelector(".card__like-button");return c.querySelector(".card__like-counter").textContent=e.likes.length,i.textContent=e.name,u.src=e.link,u.alt=e.name,u.addEventListener("click",(function(){return r(u.src,i.textContent)})),e.owner._id===o?s.addEventListener("click",(function(n){t(n,e._id)})):s.remove(),e.likes.some((function(e){return e._id===o}))&&l.classList.add("card__like-button_is-active"),l.addEventListener("click",(function(t){return n(t,e._id)})),c}function i(e,t){var n,r=e.target.closest(".card");(n=t,fetch("".concat(o.baseUrl,"/cards/").concat(n),{method:"DELETE",headers:o.headers}).then((function(e){return c(e)}))).then((function(){r.remove()})).catch((function(e){return console.log(e)}))}function s(e,t){var n,r=e.target.closest(".card").querySelector(".card__like-counter");e.target.classList.contains("card__like-button_is-active")?(n=t,fetch("".concat(o.baseUrl,"/cards/likes/").concat(n),{method:"DELETE",headers:o.headers}).then((function(e){return c(e)}))).then((function(t){e.target.classList.remove("card__like-button_is-active"),r.textContent=t.likes.length})):function(e){return fetch("".concat(o.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:o.headers}).then((function(e){return c(e)}))}(t).then((function(t){e.target.classList.add("card__like-button_is-active"),r.textContent=t.likes.length}))}var l={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};function d(e,t,n){var r=e.querySelector(".".concat(t.name,"-input-error"));t.classList.remove(n.inputErrorClass),r.classList.remove(n.errorClass),r.textContent=""}function p(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?t.classList.remove(n.inactiveButtonClass):t.classList.add(n.inactiveButtonClass)}function f(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(n){d(e,n,t)})),p(n,r,t)}var _,m=document.querySelector(".places").querySelector(".places__list"),v=document.querySelector(".popup_type_new-card"),h=document.querySelector(".profile__add-button"),y=document.querySelector(".popup_type_edit"),S=document.querySelector(".profile__edit-button"),b=document.querySelector(".profile__title"),q=document.querySelector(".profile__description"),k=document.querySelector(".profile__image"),E=document.forms["edit-profile"],g=E.elements.name,C=E.elements.description,L=E.querySelector(".popup__button"),x=document.forms["new-place"],A=x.elements["place-name"],U=x.elements.link,T=x.querySelector(".popup__button"),w=document.querySelectorAll(".popup__close"),B=document.querySelector(".popup_type_image"),P=document.querySelector(".popup__image"),D=document.querySelector(".popup__caption"),N=document.forms["edit-avatar"],O=N.querySelector(".popup__button"),j=document.querySelector(".popup_type_edit-avatar"),J=document.querySelector(".popup__input_type_url");function M(e,t){e.textContent=t?"Сохранение...":"Сохранить"}function H(t,n){P.src=t,P.alt=n,D.textContent=n,e(B)}!function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){return function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);p(n,r,t),n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMistmach?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?d(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.name,"-input-error"));t.classList.add(r.inputErrorClass),o.textContent=n,o.classList.add(r.errorClass)}(e,t,t.validationMessage,n)}(e,o,t),p(n,r,t)}))}))}(t,e)}))}(l),E.addEventListener("submit",(function(e){var n,r;e.preventDefault(),M(L,!0),(n=g.value,r=C.value,fetch("".concat(o.baseUrl,"/users/me"),{method:"PATCH",headers:o.headers,body:JSON.stringify({name:n,about:r})}).then((function(e){return c(e)}))).then((function(e){b.textContent=g.value,q.textContent=C.value,t(y)})).catch((function(e){return console.log(e)})).finally((function(){M(L,!1)}))})),x.addEventListener("submit",(function(e){var n,r;e.preventDefault(),M(T,!0),(n=A.value,r=U.value,fetch("".concat(o.baseUrl,"/cards"),{method:"POST",headers:o.headers,body:JSON.stringify({name:n,link:r})}).then((function(e){return c(e)}))).then((function(e){m.prepend(u(e,i,s,H,_)),x.reset(),t(v)})).catch((function(e){return console.log(e)})).finally((function(){M(T,!1)}))})),N.addEventListener("submit",(function(e){var n;e.preventDefault(),M(O,!0),(n=J.value,fetch("".concat(o.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:o.headers,body:JSON.stringify({avatar:n})}).then((function(e){return c(e)}))).then((function(e){k.setAttribute("style","background-image: url('".concat(e.avatar,"')")),N.reset(),t(j)})).catch((function(e){return console.log(e)})).finally((function(){M(O,!1)}))})),h.addEventListener("click",(function(){f(v,l),e(v)})),S.addEventListener("click",(function(){e(y),g.value=b.textContent,C.value=q.textContent})),w.forEach((function(e){e.addEventListener("click",(function(){t(e.closest(".popup"))}))})),k.addEventListener("click",(function(){f(j,l),e(j)})),Promise.all([fetch("".concat(o.baseUrl,"/users/me"),{headers:o.headers}).then((function(e){return c(e)})),fetch("".concat(o.baseUrl,"/cards"),{headers:o.headers}).then((function(e){return c(e)}))]).then((function(e){k.setAttribute("style","background-image: url('".concat(e[0].avatar,"')")),b.textContent=e[0].name,q.textContent=e[0].about,_=e[0]._id,e[1].forEach((function(e){m.append(u(e,i,s,H,_))}))})).catch((function(e){console.log(e)}))})();