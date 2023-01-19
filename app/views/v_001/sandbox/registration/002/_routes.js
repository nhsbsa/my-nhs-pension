// External dependencies
const express = require('express');

const router = express.Router();

// Add your routes here - above the module.exports line 

// Clear all data in session
router.post('clear-data', function (req, res) {
  req.session.data = {}
  res.render('prototype-admin/clear-data-success')
})

// Error handling - registration

// Identification details //
router.post([/identification-details-check/, /identification-details-check-error/], function (req,res) {

  if(req.body.registrationCode === '' || req.body.pin === '') {
    res.redirect('identification-details-error');
  } else {
    res.redirect('personal-details');
  }
})

// Personal details //
router.post([/personal-details-check/, /personal-details-check-error/], function (req,res) {

  if(req.body.firstname === '' || req.body.dobDD === '' || req.body.dobMM === '' || req.body.dobYYYY === '' || req.body.memberNo === ''  || req.body.nino === '') {
    res.redirect('personal-details-error');
  } else {
    res.redirect('account-details');
  }
})

// Account details //
router.post([/account-details-check/, /account-details-check-error/], function (req,res) {

  if(req.body.username === '' || req.body.password === '' || req.body.passwordConfirm === '' || req.body.email === '') {
    res.redirect('account-details-error');
  } else {
    res.redirect('security-details');
  }
})

// Security details //
router.post('/security-details-check', function (req,res) {

  if(req.body.securityQu1 === '' || req.body.securityAnswer1 === '' || req.body.securityQu2 === '' || req.body.securityAnswer2 === '' || req.body.securityQu3 === '' || req.body.securityAnswer3 === '') {
    res.redirect('security-details-error');
  } else {
    res.redirect('cya');
  }
})

// 2fa - SMS verification code //
router.post('/2fa-setup-sms-check', function (req,res) {

  if(req.body.smsCode === '' ) {
    res.redirect('2fa-setup-sms-error');
  } else {
    res.redirect('2fa-setup-recovery-codes');
  }
})


// How would you like to setup two-factor authentication? - 2fa-setup.html
router.post('/2fa', function (req, res) {
    var authenticationType = req.session.data['2fa']
    if (authenticationType == "sms" && req.body.mobile !== '' ) {
      res.redirect('2fa-setup-sms')
    }
    else if (authenticationType == "sms" && req.body.mobile === '' ) {
      res.redirect('2fa-setup-error')
    }
    else if (authenticationType == "app") {
      res.redirect('2fa-setup-app')
    }
    else {
      res.redirect('2fa-setup')
    }
  })

module.exports = router;