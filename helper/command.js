module.exports = function (command) {
    var exec = require('child_process').exec;

    function puts(error, stdout, stderr) {
        sys.puts(stdout)
    }

    exec(command, function (error, stdout, stderr) {
        return error;
    });
    return undefined;
};