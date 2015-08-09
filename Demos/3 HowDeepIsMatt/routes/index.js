
/*
 * GET home page.
 */
exports.where = function (req, res) {
    res.render('where', { title: 'Where Is Matt?', year: new Date().getFullYear(), message: 'Where is Matt?' });
};

exports.hereiam = function (req, res) {
    res.render('hereiam', { title: 'Here I Am', year: new Date().getFullYear(), message: 'Here I Am' });
};
