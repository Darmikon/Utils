var Utils = (function (){
    var util={
        Chain:(function() {
            var Chain;
			//private constructor expexts dom object or string with id
            function _$(els) {
                //selection
                this.elements = [];
                for (var i = 0, len = els.length; i < len; ++i) {
                    var element = els[i];
                    if (typeof element === 'string') {
                        element = document.getElementById(element);
                    }
                    this.elements.push(element);
                }
            }
            //prototype constructor contains methods which will be inherited by each instance
            _$.prototype = {
                el:function (){
                    return this.elements[0];
                },
                firstChild:function (){
                    var childNodes = this.elements[0].childNodes,
                        i = 0,
                        firstChild;
                    for(var i=0; i<childNodes.length; i++) {
                        if(childNodes[i].nodeType==1){
                            firstChild = this._chain(childNodes[i]);
                            break;
                        }
                    }
                    return firstChild;
                },
                each: function(fn) {
                    for ( var i = 0, len = this.elements.length; i < len; ++i ) {
                        fn.call(this, this.elements[i]);
                    }
                    return this;
                },
                log: function() {
                    var that = this;
                    this.each(function(el) {
                        //console.log(that);
                        console.log('log');
                    });
                    return this;
                },
                on: function(type, fn) {
                    var add = function(el) {
                        if (window.addEventListener) {
                            el.addEventListener(type, fn, false);
                        } else if (window.attachEvent) {
                            el.attachEvent('on'+type, fn);
                        }
                    };
					//listener will be set to each instance
                    this.each(function(el) {
                        add(el);
                    });
                    return this;
                },
                off: function (type, fn) {
                    var remove = function (el){
                        if (el) {
                            if (el.detachEvent) {
                                el.detachEvent('on' + type, el[type + fn]);
                                el[type + fn] = null;
                            } else {
                                el.removeEventListener(type, fn, false);
                            }
                        }
                    };
                    this.each(function (el){
                        remove(el);
                    });
                    return this;
                },
                // Does the node have a class
                hasClass : function (className) {
                    var re;
                    if (this.elements[0].className) {
                        re = new RegExp('(\\s|^)' + className + '(\\s|$)');
                        if(re.test(this.elements[0].className)){
                            return true;
                        }else{
                            return false;
                        }
                    } else {
                        return false;
                    }
                },
                // Add a class to a node
                addClass: function (className) {
                    if (!this.hasClass(className)){
                        this.elements[0].className += " " + className;
                    }
                },
                // Removes a class from a node
                removeClass : function (className) {
                    if (this.hasClass(className)) {
                        var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
                        this.elements[0].className = this.elements[0].className.replace(reg, ' ');
                    }
                },
                html:function (string){
                    this.each(function(el) {
                        el.innerHTML = string;
                    });
                    return this;
                },
                parent : function (){
                    //wrap parent to chain pattern
                    return this._chain(this.elements[0].parentNode);
                },
                _chain : function() {
                    return new _$(arguments);
                }
            };
            return function() {
                return new _$(arguments);
            };
        })(),
        Ajax : (function (){
            var SimpleHandler = function() {}; // implements AjaxHandler
            SimpleHandler.prototype = {
                request: function(method, url, callback, postVars) {
                    var xhr = this.createXhrObject();
                    xhr.onreadystatechange = function() {
                        if(xhr.readyState !== 4) return;
                        (xhr.status === 200) ?
                            callback.success(xhr.responseText, xhr.responseXML) :
                            callback.error(xhr.status);
                    };
                    xhr.open(method, url, true);
                    if(method !== 'POST') postVars = null;
                    xhr.send(postVars);
                    return xhr;
                },
                createXhrObject: function() { // Factory method.
                    var methods = [
                        function() { return new XMLHttpRequest(); },
                        function() { return new ActiveXObject('Msxml2.XMLHTTP'); },
                        function() { return new ActiveXObject('Microsoft.XMLHTTP'); }
                    ];
                    for(var i = 0, len = methods.length; i < len; i++) {
                        try {
                            methods[i]();
                        } catch(e) {
                            continue;
                        }
                        // If we reach this point, method[i] worked.
                        this.createXhrObject = methods[i]; // Memoize the method.
                        return methods[i]();
                    }
                    // If we reach this point, none of the methods worked.
                    throw new Error('SimpleHandler: Could not create an XHR object.');
                }
            };
            var myHandler = new SimpleHandler();
            return myHandler;
        })()
    };
	return util;
})();