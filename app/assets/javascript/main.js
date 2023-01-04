// ES6 or Vanilla JavaScript
const disableSubmitUntilInput = (form) => {
    const formInputs = [...form.querySelectorAll('input')];
    const submitButton = form.querySelectorAll('[type=submit]');

    const checkForm = () => {
        let checkInputs = formInputs.some(function(input) {
            return input.value.trim() == '';
        });
            
        if(checkInputs) {
            submitButton.forEach(element => {
                element.setAttribute('disabled', true)
            });
        } else {
            submitButton.forEach(element => {
                element.removeAttribute('disabled')
            });
        }
    }

    window.addEventListener('load',  (event) => {
        checkForm();
    })
    form.addEventListener('keyup', (event) => {
        checkForm();
    });
}

if(document.getElementsByTagName('form').length > 0) {
    let forms = [...document.getElementsByTagName('form')];
    forms.forEach(form => {
        disableSubmitUntilInput(form);
    })
}

//Security question /live/registration/step-3
function showHide(dropdown) {
    let dropdownList = dropdown;
    let target = document.getElementById('answer1');

    if (dropdownList.value != "") {
        target.style.display = 'block';
    } else {
        target.style.display = 'none';
    }
}
