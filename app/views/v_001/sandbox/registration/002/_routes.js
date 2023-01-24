// External dependencies
const express = require('express');

const router = express.Router();

// Add your routes here - above the module.exports line 

// Clear all data in session when starting a new registration
router.post('/create-new-account', function (req, res) {
  req.session.data = {}
  res.redirect('identification-details')
})

// Error handling - registration

// Identification details //
router.post([/identification-details-check/, /identification-details-check-error/], function (req,res) {

  if(req.body.registrationCode.length !== 6 || req.body.pin.length !== 8) {
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

  if(req.body.username.length > 15 || req.body.password.length < 12 || req.body.passwordConfirm === '' || req.body.email === '') {
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

// 2fa - app verification code //
router.post('/2fa-setup-app-check', function (req,res) {

  if(req.body.appCode === '' ) {
    res.redirect('2fa-setup-app-error');
  } else {
    res.redirect('2fa-setup-recovery-codes');
  }
})

// Sign in //
router.post('/sign-in-check', function (req,res) {

  if(req.body.username.length > 15 || req.body.password.length < 12) {
    res.redirect('sign-in-error');
  } else {
    res.redirect('registration/2fa-setup');
  }
})
 

// How would you like to setup two-factor authentication? - 2fa-setup.html
router.post('/2fa', function (req, res) {
    var authenticationType = req.session.data['2fa']
    if (authenticationType == "sms" && req.body.mobile !== '' ) {
      res.redirect('2fa-setup-sms')
    }
    else if (authenticationType == "sms" && req.body.mobile === '' ) {
      res.redirect('2fa-setup-error-mobile')
    }
    else if (authenticationType == "app") {
      res.redirect('2fa-setup-app')
    }
    else {
      res.redirect('2fa-setup-error')
    }
  })

module.exports = router;