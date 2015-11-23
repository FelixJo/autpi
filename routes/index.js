var express = require('express');
var router = express.Router();

// @TODO: Move to permanent storage
var devices = {
    'kitchen-radio': {
        name: 'Küchenradio',
        cmd: '433send -u 0 -i 13938970'
    },
    'tv-bedroom': {
        name: 'TV Schlafzimmer',
        cmd: '433send -u 1 -i 13938970'
    },
    'nothing': {
        name: 'nothing',
        cmd: '433sendElro -u 1 -i 0'
    },
};

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'AutPi', devices: devices});
});

/* POST ajax socket command request */
router.post('/socket', function (req, res, next) {
    var command = devices[req.body.device].cmd + " -" + req.body.command;
    var exec = require('child_process').exec;

    function puts(error, stdout, stderr) {
        sys.puts(stdout)
    }

    // Repeat command 10 times, sometime 'sendElro' are not accurate
    for (var i = 0; i < 10; i++) {
        exec(command, function (error, stdout, stderr) {
            if (!error) {
                // Things gone well
                console.log(req.body.device + " is no an state " + req.body.command);
            } else {
                // things failed :(
                console.log(req.body.device + " failed to set on state  " + req.body.command);
            }
        });
    }

    res.end();
});

module.exports = router;
