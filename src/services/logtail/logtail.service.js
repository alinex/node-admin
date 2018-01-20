const spawn = require('child_process').spawn;
const ansi2html = require('ansi-to-html');

const convert = new ansi2html({
  fg: '#000',
  bg: '#fff',
  newline: false,
  escapeXML: false,
  stream: false
});

module.exports = function (app) {

  app.get('/logtail', function(req, res) {
  	res.header('Content-Type','text/html;charset=utf-8');
    res.write(`<html>
      <head>
        <title>Logtail - Admin Panel</title>
        <link rel="stylesheet" type="text/css" href="/logtail.css" />
        <meta http-equiv="refresh content="5">
      </head>
      <body>
        <h1>Logtail</h1>
        <pre>\n`);
    tail = spawn('sh', ['-c', 'tail -n 15 -f ./logs/*']);
    tail.stdout.on('data', function(data) {
  		res.write(convert.toHtml(data.toString("utf8"))
        .replace(/(==> .*? <==)/g, '<h3>$1</h3>'));
      res.flush();
    });
  	tail.stderr.on('data', function(data) {
  		console.error('stderr: ' + convert.toHtml(data));
  	});
  	tail.on('exit', function(code) {
  		res.end();
  	});
  });

};
