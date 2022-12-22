// ES6 or Vanilla JavaScript

//Security question /live/registration/step-3
function showHide() {
    let securityqu1 = document.getElementById('security1')
    if (securityqu1.value != "") {
        document.getElementById('answer1').style.display = 'block'
    } else {
        document.getElementById('answer1').style.display = 'none'
    }
}
