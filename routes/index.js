var express = require('express');
var router = express.Router();
var commandHelper = require('../helper/command');

// @TODO: Move to permanent storage
var devices = {
    'kitchen-radio': {
        name: 'Küchenradio',
        cmd: '433send -u 0 -i 13938970'
    },
    'tv-living': {
        name: 'TV Wohnzimmer',
        cmd: '433send -u 2 -i 13938970'
    },
    'tv-bedroom': {
        name: 'TV Schlafzimmer',
        cmd: '433send -u 1 -i 13938970'
    },
    'wlan' : {
        name: 'Garten-WLAN',
        cmd: 'wlan'
    },
    'gameframe': {
        name: 'Gameframe',
        cmd: 'gameframe-on'
    },
};

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'AutPi', devices: devices});
});

/* POST ajax socket command request */
router.post('/socket', function (req, res, next) {
    var command = devices[req.body.device].cmd + " -" + req.body.command;
    var error = commandHelper(command);

    if (!error) {
        // Things gone well
        console.log(req.body.device + " is no an state " + req.body.command);
    } else {
        // things failed :(
        console.log(req.body.device + " failed to set on state  " + req.body.command);
    }


    res.end();
});


router.get('/stream', function (req, res, next) {
    var hostname = ( req.headers.host.match(/:/g) ) ? req.headers.host.slice( 0, req.headers.host.indexOf(":") ) : req.headers.host

    res.render('stream', {
        title: 'AutPi - Stream',
        streamAddress: hostname + ':8080/?action=stream',
        audioAddress: hostname + ':8081/stream.mp3'
    });
});


router.get('/stream-start', function (req, res, next) {
    commandHelper('webcam start');

    res.end();
});

router.get('/stream-stop', function (req, res, next) {
    commandHelper('webcam stop');

    res.end();
});

module.exports = router;
