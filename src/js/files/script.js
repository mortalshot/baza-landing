// Подключение функционала 
import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";

// Добавляем заливку шапке, если страница проскроллена
window.scroll(0, 1);

// Обработка инпутов со счетчиком
const counter = document.querySelectorAll('.counter');
if (counter.length > 0) {
    counter.forEach(element => {
        const counterRequired = element.querySelector('.counter__required').innerHTML;
        const counterCurrent = element.querySelector('.counter__current');
        const elementParent = element.closest('.form__input-wrapper');
        const input = elementParent.querySelector('.form__input');

        input.addEventListener('input', function () {
            const value = input.value.trim();
            const valueLength = value.length;
            counterCurrent.innerHTML = valueLength;

            if (valueLength == counterRequired) {
                input.classList.remove('_error');
                input.classList.add('_success');
            } else {
                input.classList.add('_error');
                input.classList.remove('_success');
            }
        })
    });
}

// Валидация инпутов на пустые значения
const inputs = document.querySelectorAll('.form__input');
if (inputs.length > 0) {
    inputs.forEach(element => {
        element.addEventListener('input', function () {
            if (!element.classList.contains('form__input_mail') && !element.classList.contains('form__input_phone') && !element.classList.contains('form__input_counter')) {
                const value = element.value.trim();

                if (value != '') {
                    element.classList.remove('_error');
                    element.classList.add('_success');
                } else {
                    element.classList.add('_error');
                    element.classList.remove('_success');
                }
            }
        })
    });
}

// Валидация инпутов с типом "почта"
const mails = document.querySelectorAll('.form__input_mail');
if (mails.length > 0) {
    mails.forEach(element => {
        element.addEventListener('input', function () {
            const value = element.value;

            if (!validateEmail(value)) {
                element.classList.add('_error');
                element.classList.remove('_success');
            } else {
                element.classList.remove('_error');
                element.classList.add('_success');
            }
        })
    });
}

// Валидация инпутов с типом "телефон", простая проверка на цифры
const phones = document.querySelectorAll('.form__input_phone');
if (phones.length > 0) {
    phones.forEach(element => {
        element.addEventListener('input', function () {
            const value = element.value;

            if (!validatePhone(value)) {
                element.classList.add('_error');
                element.classList.remove('_success');
            } else {
                element.classList.remove('_error');
                element.classList.add('_success');
            }
        })
    });
}

// Добавляем класс "_disabled" кнопке отправки, если одно из полей формы не прошло валидацию
const forms = document.querySelectorAll('.form');
if (forms.length > 0) {
    forms.forEach(element => {
        const elementInput = element.querySelectorAll('.form__input');
        let error = 0;

        elementInput.forEach(input => {
            const inputForm = input.closest('.form');
            const submit = inputForm.querySelector('.form__submit');

            input.addEventListener('change', function () {
                if (input.classList.contains('_error')) {
                    error = 1;
                } else {
                    error = 0;
                }

                const errorInputs = document.querySelectorAll('._error');
                console.log(errorInputs.length);
                console.log(error);

                if (error == 0 && errorInputs.length == 0) {
                    submit.classList.remove('_disabled');
                } else {
                    submit.classList.add('_disabled');
                }
            })
        });
    });
}

// Валидация почты
function validateEmail(email) {
    var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return re.test(String(email).toLowerCase());
}
// Валидация телефона
function validatePhone(phone) {
    var re = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;
    return re.test(phone);
}

// Добавление дополнительных адресов
const formAdd = document.querySelectorAll('.form__add');
if (formAdd.length > 0) {
    formAdd.forEach(element => {
        let clickCount = 1;

        element.addEventListener('click', function () {
            const newElement = document.createElement('div');
            newElement.classList.add('form__input-wrapper', 'address');

            clickCount++;

            newElement.innerHTML = `
                <label for="partner-address${clickCount}" class="form__label">Адрес (${clickCount}) торговой точки</label>
                <input id="partner-address${clickCount}" autocomplete="off" type="text" name="partner-address${clickCount}" placeholder="366918 г. Москва ул.Тверская д. 29" class="form__input">
            `;
            element.before(newElement);

            console.log(clickCount);
        })
    });
}

document.addEventListener("selectCallback", function (e) {
    // Селект
    const currentSelect = e.detail.select;

    if (currentSelect.classList.contains('form__city')) {
        const selectValue = currentSelect.value;
        const parent = currentSelect.closest('.form');
        const items = parent.querySelectorAll('.form__item_select');

        if (items.length > 0) {
            items.forEach(element => {
                element.classList.remove('_active');
            });
        }
        const element = parent.querySelector(`[data-select="${selectValue}"]`);
        if (element) {
            element.classList.add('_active');
        }
    }
});


// Закрываем окно уведомления
const notificationClose = document.querySelector('.notification__btn');
if (notificationClose) {
    notificationClose.addEventListener('click', function () {
        document.querySelector('.notification').classList.remove('_active');
    })
}