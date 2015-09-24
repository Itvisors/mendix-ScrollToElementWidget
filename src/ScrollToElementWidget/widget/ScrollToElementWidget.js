/*jshint undef: true, browser:true, nomen: true */
/*jslint browser:true, nomen: true */
/*global mx, console, define, require */
/*
    ScrollToElementWidget
    ========================

    @file      : ScrollToElementWidget.js
    @version   : 1.0
    @author    : Marcel Groeneweg
    @date      : Tue, 22 Sep 2015 08:38:12 GMT
    @copyright : 
    @license   : Apache 2

    Documentation
    ========================
    Describe your widget here.
*/

// Required module list. Remove unnecessary modules, you can always get them back from the boilerplate.
define([
    "dojo/_base/declare",
    "mxui/widget/_WidgetBase",
    "mxui/dom",
    "dojo/dom",
    "dojo/_base/lang",
    "dojo/window",
    "ScrollToElementWidget/lib/jquery-1.11.2"
], function (declare, _WidgetBase, dom, dojoDom, dojoLang, dojoWin, _jQuery) {
    "use strict";

    var $ = _jQuery.noConflict(true);

    // Declare widget's prototype.
    return declare("ScrollToElementWidget.widget.ScrollToElementWidget", [ _WidgetBase ], {

        // Properties
        classToSearch: "",
        listenToAttr: null,
        delay: 0,
        
        // Internal variables. Non-primitives created in the prototype are shared between all widget instances.
        _handles: null,
        _contextObj: null,
        _alertDiv: null,
        _previousValue: null,

        // dojo.declare.constructor is called to construct the widget instance. Implement to initialize non-primitive properties.
        constructor: function () {
            this._handles = [];
        },

        // dijit._WidgetBase.postCreate is called after constructing the widget. Implement to do extra setup work.
        postCreate: function () {
            //console.log(this.id + ".postCreate");
            this._setupEvents();
        },

        // mxui.widget._WidgetBase.update is called when context is changed or initialized. Implement to re-render and / or fetch data.
        update: function (obj, callback) {
            //console.log(this.id + ".update");

            this._contextObj = obj;
            this._resetSubscriptions();
            this._previousValue = null;

            callback();
        },

        // mxui.widget._WidgetBase.uninitialize is called when the widget is destroyed. Implement to do special tear-down work.
        uninitialize: function () {
            // Clean up listeners, helper objects, etc. There is no need to remove listeners added with this.connect / this.subscribe / this.own.
        },

        // Attach events to HTML dom elements
        _setupEvents: function () {
        },
        
        _handleObjectChanged: function () {
            var newValue = this._contextObj.get(this.listenToAttr),
                nodeList,
                thisObj = this;
            if (newValue !== this._previousValue) {
                //console.log(this.id + "._handleObjectChanged: value changed");
                // Clear the value on the context object. Clicking on the same element again should trigger the focus again.
                this._contextObj.set(this.listenToAttr, 0);
                this._previousValue = this._contextObj.get(this.listenToAttr);
                mx.data.save({
                    mxobj: this._contextObj,
                    callback: function () {
                        //console.log("Object saved");
                    }
                });
                setTimeout(function () {
                    nodeList = $("." + thisObj.classToSearch + ":contains(" + newValue + ")");
                    if (nodeList.length > 0) {
                        //console.dir(nodeList[0]);
                        dojoWin.scrollIntoView(nodeList[0]);
                    }
                }, this.delay);
            } else {
                //console.log(this.id + "._handleObjectChanged: value not changed");
            }
        },

        // Reset subscriptions.
        _resetSubscriptions: function () {
            var objectHandle,
                thisObj = this;
            
            // Release handles on previous object, if any.
            if (this._handles) {
                this._handles.forEach(function (handle) {
                    thisObj.unsubscribe(handle);
                });
                this._handles = [];
            }

            // When a mendix object exists create subscribtions. 
            if (this._contextObj) {
                objectHandle = this.subscribe({
                    guid: this._contextObj.getGuid(),
                    callback: dojoLang.hitch(this, function (guid) {
                        this._handleObjectChanged();
                    })
                });

                this._handles = [ objectHandle ];
            }
        }
    });
});

require(["ScrollToElementWidget/widget/ScrollToElementWidget"], function () {
    "use strict";
});
