/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

//====== Global Vars ====
var localeList = ["es", "en", "it", "de", "fr", "pt"];
var languageSpecificObject = null;
var languageSpecificURL = "";
var templateLanguageSpecificURL = "i18n/%locale%/strings.json";
var cLANGUAGE = "en";//default lang 
//======================= 

var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {        
        app.receivedEvent('deviceready'); 
        //========LANGUAGE========
            
        var locale = navigator.language.substring(0,2);
        if($.inArray( locale, localeList ) != -1){
            cLANGUAGE = locale;
        }
        languageControls(cLANGUAGE);
    },
    
    // Update DOM on a Received Event
    receivedEvent: function(id) {
    }
};

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function languageControls( cLANGUAGE){
        //Function to make network call according to language on load
        languageSpecificURL = templateLanguageSpecificURL.replace('%locale%', cLANGUAGE);
        
        $.getJSON( languageSpecificURL, function( data ) {
            languageSpecificObject = data;
            $(".languagespecificHTML").each(function(){
                $(this).html(languageSpecificObject.languageSpecifications[0][$(this).data("text")]);
            });
            $(".languageSpecificPlaceholder").each(function(){
                $(this).attr("placeholder",languageSpecificObject.languageSpecifications[0][$(this).data("text")]);
            });
            $(".languagespecificValue").each(function(){
                $(this).attr("value",languageSpecificObject.languageSpecifications[0][$(this).data("text")]);
            });
            $(".languagespecificIMG").each(function(){
                var img_src = $(this).attr("src");
                img_src = img_src.replace('%locale%',cLANGUAGE);
                $(this).attr("src", img_src);
            });
      });
}

//Function to get specific value with unique key
function getLanguageValue (key){
    value = languageSpecificObject.languageSpecifications[0][key];
    return value;
}