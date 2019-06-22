var fs = require('fs');

exports.validate_file_exist = function (url) {
    return fs.access(url, fs.F_OK, (err) => {
        if(err) {
            console.error(err)
        }
        return
    })
}
