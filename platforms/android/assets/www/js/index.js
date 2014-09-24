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
        app.getDate();
    },
    getDate: function () {
        
        app.receivedEvent('deviceready'); 
        //========LANGUAGE========
        var cLANGUAGE = null;
        navigator.globalization.getLocaleName(
            function (locale) {alert('locale: ' + locale.value + '\n');},
            function () {alert('Error getting locale\n');}
        );
        navigator.globalization.getPreferredLanguage(
            //Get Language from Settings
            function (locale) {
                cLANGUAGE = locale.value;
                languageControls(cLANGUAGE);
            },
            //On Failure set language to english
            function () {cLANGUAGE = "en";}
        );
 
        var languageSpecificObject = null;
        var languageSpecificURL = "";
        var spanishLanguageSpecificURL = "i18n/es/strings.json";
        var englishLanguageSpecificURL = "i18n/en/strings.json";
        //Function to make network call according to language on load
        var languageControls = function(language){
            if((language.toString() == "es") || (language.toString() == "español") || (language.toString().indexOf("es") != -1)){
                    languageSpecificURL = spanishLanguageSpecificURL;
            }
            else{
                    //Default English
                    languageSpecificURL = englishLanguageSpecificURL;
            }
                //Make an ajax call to strings.json files
            onNetworkCall(languageSpecificURL,function(msg){
                languageSpecificObject = JSON.parse(msg);
                $(".languagespecificHTML").each(function(){
                    $(this).html(languageSpecificObject.languageSpecifications[0][$(this).data("text")]);
                });
                $(".languageSpecificPlaceholder").each(function(){
                    $(this).attr("placeholder",languageSpecificObject.languageSpecifications[0][$(this).data("text")]);
                });
                        $(".languageSpecificValue").each(function(){
                    $(this).attr("value",languageSpecificObject.languageSpecifications[0][$(this).data("text")]);
                });
            });
        };
 
        //Function to get specific value with unique key
        var getLanguageValue = function(key){
            value = languageSpecificObject.languageSpecifications[0][key];
            return value;
        };
 
        //Network Call
        var onNetworkCall = function(urlToHit,successCallback){
            $.ajax({
               type: "POST",
               url: urlToHit,
               timeout: 30000 ,
               }).done(function( msg ) {
                   successCallback(msg);
                       }).fail(function(jqXHR, textStatus, errorThrown){
                           alert("Internal Server Error");
                       });
        }
        
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
