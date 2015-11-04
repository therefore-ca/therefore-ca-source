var _ = require('lodash');
//create node.js http server and listen on port
var http = require("http"),
    url  = require("url"),
    path = require("path"),
    fs   = require("fs");
var port = 8888;

var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill('yU1xPprQ1LjIdmsbvqxCaQ');

var redirects = {
  "/blog/accessibility-wcag-aoda-presentation-follow": "/accessibility-wcag-aoda-presentation.html",
  "/blog/birth-merlin": "/blog/birth-merlin.html",
  "/blog/decoupling-drupal": "/blog/decoupling-drupal.html",
  "/about-us": "/about-us.html",
  "/mobile-web": "/work.html",
  "/meet-the-team": "/about-us.html",
  "/protfolio": "/work.html",
  "/blog": "/#home-blog-teasers",
  "/contact": "/contact.html",
  "/brand/loblaws": "/work.html",
  "/brand/unifor": "/work.html",
  "/brand/canada-lands": "/work.html",
  "/portfolio/slide/125/all": "/work.html",
  "/portfolio/slide/129/all": "/work.html",
  "/portfolio/slide/131/all": "/work.html",
  "/cupw": "/work.html",
  "/youre-agency": "/contact.html",
  "/website-content-management": "/services.html",
  "/brand/allseating": "/allseating.html",
  "/sites/default/files/do-the-right-thing-slides.pdf": "/do-the-right-thing-slides.pdf",
};

var contentTypesByExtension = {
  '.html': "text/html",
  '.css': "text/css",
  '.svg': "image/svg+xml",
  '.js': "text/javascript"
};

http.createServer(function (req, res) {
  var uri = url.parse(req.url).pathname;
  var filename = path.join(process.cwd(), uri);
  var threeOhOne = false;

  fs.exists(filename, function (exists) {

    // Log raw uris, not file assets
    if (!path.extname(filename)) {
      console.log('GET >> ', uri);
    }

    _.each(redirects, function (target, check) {
      if (!threeOhOne && (uri == check || uri == check + '/')) {
        console.log('301 >> ', uri, ' <--> ', target);

        res.writeHead(301, {'Location': target});

        threeOhOne = true;
      }
    });

    if (threeOhOne) {
      res.end();
      return;
    }

    if (uri == '/contact-process') {
      sendEmail(req, res);
      return;
    }

    if (!exists) {
      res.writeHead(404, {"Content-Type": "text/html"});
      res.write(fs.readFileSync('./404.html'));
      res.end();
      return;
    }
    else {
      if (fs.statSync(filename).isDirectory()) {
        filename += '/index.html';
      }

      fs.readFile(filename, "binary", function (err, file) {
        if (err) {
          res.writeHead(500, {"Content-Type": "text/plain"});
          res.write(err + "\n");
          res.end();
          return;
        }

        var headers = {};
        var contentType = contentTypesByExtension[path.extname(filename)];
        if (contentType) {
          headers["Content-Type"] = contentType;
        }
        res.writeHead(200, headers);
        res.write(file, "binary");
        res.end();
      });
    }
  });
}).listen(parseInt(port, 10));

console.log("Static file server running at\n  => http://localhost:" + port + "/\nCTRL + C to shutdown");

function sendEmail(req, res) {
  var args = url.parse(req.url, true).query;
  var message = {
    'from_email': 'contact@therefore.ca',
    'to': [
      // {
      //   'email': 'clement@therefore.ca',
      //   'name': 'Clément Hurel',
      //   'type': 'to'
      // },
      {
        'email': 'alex@therefore.ca',
        'name': 'Alex De Winne',
        'type': 'to'
      }
      //{
      //  'email': 'sean@therefore.ca',
      //  'name': 'Sean De Rioux',
      //  'type': 'to'
      //}
      //{
      //  'email': 'homer@therefore.ca',
      //  'name': 'Sean Homer',
      //  'type': 'to'
      //}
    ],
    'autotext': 'true',
    'subject': 'New Contact Form Submission',
    'html': 'Contact information : <br/>' +
    'Name : ' + args.name + '<br/>' +
    'Email : ' + args.email + '<br/>' +
    'Comment : ' + args.comment + '<br/>'
  };
  mandrill_client.messages.send({"message": message}, function (result) {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify({success: true}));
    res.end();
  }, function (e) {
    console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify({success: false}));
    res.end();
  });
}