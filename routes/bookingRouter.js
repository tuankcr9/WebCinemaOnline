var express = require('express');
var router = express.Router();
var bookingController = require('../controllers/bookingController');

router.post('/', bookingController.showBooking)

router.get('/eticket/:ticket', bookingController.getTicket)

router.post('/eticket', bookingController.postTicket)

router.get('/getSeat', bookingController.getSeat)

module.exports = router;