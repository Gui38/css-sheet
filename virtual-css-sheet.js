
/*
Virtual css virtualCssSheet
to be used in browser by calling
var css = new virtualCssSheet(document);

you can use it in node,
I guess,
if you have some kind of document object...

*/


var virtualCssSheet = function ( doc=undefined ) {
  //Module ---------------------------------------------

  this.isDocument = function (doc)
  {
    try {
      doc.getElementById("test");
      //returns null if doc is a document
      //throws error if not
      return true;
    } catch (e) {
      return false;
    }
  };


  //_______________________initialize

  this.autoUpload = true;

  if ( this.isDocument(doc) == false )
  {
    console.log("virtualCssSheet >> no document, method upload unavailable")
    this.document = undefined;
    //this.document = document;
  } else {
    this.document = doc;
  }

  this.cssTree = {}

  this.set = function (selector, property, value)
  {
    if ( this.cssTree[selector] ) {
      this.cssTree[selector][property] = value;
    } else {
      this.cssTree[selector]={};
      this.cssTree[selector][property] = value;
    }
    if ( this.autoUpload == true )
    {
      this.upload();
    }
  };


  this.renderSelector = function (selector, cssScript = "")
  {
    var selectorTree = this.cssTree[selector];
    var br = `
`;

    cssScript += br + selector +' {'+br;

    var properties = Object.keys(selectorTree);
    for ( var i=0; i<properties.length; i++ )
    {
      var value = this.cssTree[selector][properties[i]];
      cssScript += '  ' + properties[i] +': '+value+';'+ br;
    }
    cssScript += '}'+br;

    return cssScript;
  };


  this.render = function ()
  {
    var cssScript = "";

    for ( var selector in this.cssTree )
    {
      cssScript += this.renderSelector(selector)
    }

    return cssScript;
  };

  this.upload = function ( doc=undefined ) {

    if ( this.isDocument(doc) == false )
    {
      if ( this.isDocument(this.document) == false )
      {
        throw new Error ("virtualCssSheet >> no valid document, no upload possible");
        return undefined;//I'm not sure throw will stop the code, I beginner
      } else {
        doc = this.document;
      }
    }

    if ( doc.getElementById("virtualCssSheet") == null )
    {
      var vCssSheet= doc.createElement("style");
      vCssSheet.id = "virtualCssSheet"
      doc.head.appendChild(vCssSheet)
      console.log("..css tag uploaded to document")
    }
    var vCssSheet = doc.getElementById("vCssSheet");
    this.removeAllChilds(vCssSheet);
    vCssSheet.appendChild( doc.createTextNode( this.render() ) );
  };



  // useful functions ---------------------------------
  this.removeAllChilds = function(element)
  {
    while (element.firstChild)
    {
      element.removeChild(element.firstChild)
    }
  };




  // end of Module-------------------------------------
  return this;
};


// Other exports ---------------------------
var module;
if (module)
{
  // for node JS ---------------------------
  module.exports = virtualCssSheet;
}
