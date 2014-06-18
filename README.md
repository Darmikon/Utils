Utils
=====

Utils - small framework to manipulate dom and make ajax requests

##Usage examples

Chain
```Javascript
var DOM = util.Chain('dom_id');
```
class
```Javascript
DOM.addClass('new');
DOM.hasClass('new'); //true
DOM.removeClass('new');
```
html
```Javascript
DOM.html('<span>innerHTML</span>');
```
other
```Javascript
DOM.firstChild(); //wrapped span
DOM.el(); //simple js dom object
DOM.parent(); //body element
DOM.each(function (el){});
```
listeners
```Javascript
DOM.on('click',callback);
DOM.off('click',callback);
```
Ajax
```Javascript
//util.Ajax.request('GET','/checkOtp.json',{...});
var xhr = util.Ajax.request('POST','json/checkOtp.json',{
	success:callbackSuccess,
	error: callbackError
});
var callbackSuccess = function (responseText){
	var response = JSON.parse(responseText);
}
```
