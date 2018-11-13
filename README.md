# css-sheet
*a javascript module to dynamically edit css properties,
just like a virtual css sheet*

## available in browser or in node

This module can either be loaded from a static html file
using a standard **script tag**,
or in a node application, using
```js
var CssSheet = require("css-sheet");
```
If you wonder why use a css module in node,
consider having your user modify the css and store it server side ?

## features and To-Dos

- **virtualCssSheet object**

*Works v 0.1.0*\
whether you use browser or node,
to run the module, you must first create an object :
```js
var yourCssSheet = CssSheet(document);
```
You can then call its functions.
(specifying a document isn't compulsory
but without a valid HTMLDocument object set as\
*yourCssSheet.document*\
you will not be able to upload automatically)

*possible upgrades :*\
Since the object is the only container of the whole module,\
see other sections


- **dynamic css modifying**

*Works v 0.1.0*\
You can modify any selector at anytime using
```js
yourCssSheet.set(selector, property, value);
//examples :
yourCssSheet.set(
  "body p",
  "color",
  "#FA7");
yourCssSheet.set(
  "body, #container",
  "color",
  "#FA7");
yourCssSheet.set(
  ".shadowToolBar button:hover",
  "box-shadow",
  "1px 1px 2px #000");
```
If the autoUpload is set to true,
the call to set will also call upload
(see below)

*possible upgrades :*\
needs to be modified if the cssTree is made better
(see cssTree)

- **upload to document**

*Works v 0.1.0*\
For now, the upload(document) function
creates a *script* tag in the *head* of HTMLDocument.\
(this seems to work even in a document with no *head*)\
Then it writes the whole css as text in the script tag.
```js
yourCssSheet.upload();
yourCssSheet.upload(document);//if yourCssSheet.document is not specified
```

*possible upgrades :*\
there sure is a better way of doing this
than creating a string a pasting it in a script tag...

- **autoUpload**

*Works v 0.1.0*\
a simple variable, set to true by default.\
you can change this by simply doing :
```js
yourCssSheet.autoUpload = false;
```
if set to true,
any modification of the virtualCssSheet will be followed by an upload.

*possible upgrades :*\
if new methods are added to modify the css,
there should be a call to upload if the autoUpload is set to true.

- **render as text**

*Works v 0.1.0*\
If you want to export you css to a file
or anything that requires the css to be rendered as a text,
just use :
```js
var cssText = yourCssSheet.render();
```

*possible upgrades :*\


- **render only one selector**

*Works v 0.1.0*\
If you need to render only one selector,
just call this :
```js
var selectorCss = yourCssSheet.renderSelector(selector);
//example :
var selectorCss = yourCssSheet.renderSelector("body p");
```

*possible upgrades :*\
see cssTree

- **css Tree**

*Works v 0.1.0*\
for now,
the whole data is stored in a simple Object
called yourCssSheet.cssTree\
You can access it, but you shouldn't modify it
by other means than virtualCssSheet methods.

the structure is very simple :
```
{
  selector: {
    property: value,
    property: value
    ...
  },
  selector : {}
  ...
}
```

*possible upgrades :*\
there could be cleaner ways of doing that,\
for instance, creating lists for multiple selectors such as
"html, body, button:hover"

- **reading css**

*TO DO, not done*\
A css parser would be nice !!!
you could load a whole file,
or write many rules at one time like :
```js
yourCssSheet.read(
  `
html,
body {
  background: black;
  color: white;
}
button:hover {
  ...
}
  `
);
```
really really nice! so much faster !!
but seems much more complicated than anything i've done so far,
if we want to do it CLEAN and UNBUGGY.


- **removing properties and selectors**

*TO DO, not done*\
this one is simple,
I didn't do it by lack of time,
probably for 0.1.1\
Meanwhile, you can erase a property
by setting it to inherited ? I don't know...
