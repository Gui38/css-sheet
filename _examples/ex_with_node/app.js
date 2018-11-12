

/*i am not a node expert
thus this test will be embettered
sooner or later */

// APP setup -------------------------------------------

var express = require("express");
var fs = require("fs");

var app = express();

app.get(
  "/",
  function (req, res) {
    res.set('Content-Type', 'text/html');
    res.sendFile(__dirname + "/index.html");
  }
)


//STATIC example --------------------------------------
// the js lib is loaded directly in the code
// of the html file send

app.use(express.static('../../'));

//var static_html = fs.readFileSync("test_static.html");

app.get(
  "/static",
  function (req, res) {
    res.set('Content-Type', 'text/html');
    //res.send(new Buffer (static_html) );
    res.sendFile(__dirname + "/test_static.html")
});



//SERVER SIDE EXAMPLE ---------------------------------

const jsdom = require("jsdom");
//const { JSDOM } = jsdom;
//const dom = new JSDOM(`<!DOCTYPE html><p>Hello world in pure JS server side!</p>`);
var dom = new jsdom.JSDOM(
  `<!DOCTYPE html>
    <div class=".VCS">Hello world in pure JS server side!</div>
    <br/>
    <a href="/static">see the static version</a>
    <br/>
    <a href="/">go back to menu</a>`);

var doc = dom.window.document;



var virtualCssSheet = require("../../virtual-css-sheet");


var css = new virtualCssSheet(doc);

css.set(".VCS", "background", "#FAE");
css.set("a", "color", "#FAE");
css.set("a", "text-decoration", "none");
css.set("a:hover", "text-shadow", "1px 1px 2px black");
css.set("a:active", "color", "#A69")


app.get(
  "/server",
  function (req, res) {
    var html = dom.serialize();
    res.send(html);
});



app.listen(8080);
