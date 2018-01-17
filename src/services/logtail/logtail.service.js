const spawn = require('child_process').spawn;

module.exports = function (app) {

  app.get('/logtail', function(req, res) {
  	res.header('Content-Type','text/html;charset=utf-8');
    res.write('<html><head><title>Logtail - Admin Panel</title></head><body><h1>Logtail</h1><pre>\n')

    tail = spawn('sh', ['-c', 'tail -f ./logs/*']);
    tail.stdout.on('data', function(data) {
  		res.write(data, 'utf-8');
      res.flush();
    });
  	tail.stderr.on('data', function(data) {
  		console.error('stderr: ' + data);
  	});
  	tail.on('exit', function(code) {
  		res.end();
  	});
  });

};
