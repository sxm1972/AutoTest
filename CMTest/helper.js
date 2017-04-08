// Helper methods
var fs = require('fs');
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var Helper = function () {
    var baseURL = 'https://pldevbrl-a2.rd3.labs.aspect.com'; // 'http://pldevbrlucc3.rd3.labs.aspect.com';
    var __driver = undefined;

    var setDriver = function (driver) {
        if (!driver) {
            console.log('Error: No driver set! Some methods may not work!');
        };

        __driver = driver;
    };

    var getDriver = function () {
        return __driver;
    };

    var getBaseUrl = function () {
        return baseURL;
    };

    var getFullUrl = function (relUrl) {
        return baseURL + relUrl;
    };

    var getTestSuiteTimeout = function () {
        return 150000;
    };

    var getTestCaseTimeout = function () {
        return 45000;
    };

    var getElementWaitTimeout = function () {
        return 10000;
	};

    var getWaitBeforeVerifying = function () {
        return 10000;
    };

	var takeScreenshot = function (driver, outfile, callwhendone) {
		return driver.takeScreenshot().then(
			function (image, err) {
				fs.writeFile(outfile, image, 'base64', function (err) {
                    if (callwhendone) {
                        callwhendone();
                    };
				});
			}
		);
	};
	
	var getLocator = function (t) {
		var by = undefined;
		if (t.css) { by = By.css(t.css); };
		if (t.id) { by = By.id(t.id); };
		if (t.xpath) { by = By.xpath(t.xpath); };
		return by;
	};
	
	var getLoginUser = function () { return 'uccadmin' };
	var getLoginPassword = function () { return 'Aspect9' };
	
    var getRandomString = function (length) {
		var text = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		for (var i = 0; i < length; i++) {
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		}
		return text;
	}
    var getRandomNumberString = function (length) {
        var text = "";
        var possible = "0123456789";
        for (var i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }	
	var hasUnique = function (arr) {
		if (!arr) return false;
		return arr.filter(function (item) { return item.value && item.value.match(/@UNIQUE@|@NUM.@/) != null; }) != null;
	};
	
	var makeUnique = function (s) {
        return s.replace(/@UNIQUE@/, getRandomString(5)).replace(/@NUM(.)@/, function (x, p1) {
            return getRandomNumberString(p1);
        });
    };

    /**
     * This method can be used for those situations where a spinning wait indicator appears on the screen
     * for an operation that takes a long time, usually a refresh to the entity-editlist. The overlay element
     * can take time to appear as well as disappear. So we need to handle all situations.
     * 1. The overlay appears and then disappears.
     * 2. The overlay never appears and we proceed after a timeout.
     * 3. The overlay appears but never disappears and we have to error out.
     * @param driver
     * @param callback
     */
    var waitOutOverlay = function (driver, timeout) {
        var localtimeout = 3;
        if (timeout) {
            localtimeout = timeout;
        };
        console.log('Debug: waitOutOverlay called with timeout: %s', localtimeout);

        return new Promise(function (resolve, reject) {
            var overlayfound = false;
            var overlaydisappeared = false;
            var count = 0;
            var s = setInterval(function () {
                return driver.findElements(By.css('.k-overlay')).then(function (elements) {
                    if (elements.length > 0) {
                        if (++count > localtimeout) {
                            console.log('Debug: waited %s intervals', localtimeout);
                            clearInterval(s);
                            if (overlaydisappeared) {
                                console.log('Debug: overlay disappeared');
                                resolve(true);
                            } else {
                                console.log('Error: overlay still visible');
                                reject(false);
                            }
                        } else {
                            console.log('Debug: Overlay detected. waiting for overlay to disappear: ', count);
                            overlayfound = true;
                            elements[0].getAttribute('style').then(function (attr) {
                                console.log("Debug: %s", attr);
                                if (attr.match(/display: none/) != null) {
                                    overlaydisappeared = true;
                                }
                            });
                        }
                    } else {
                        if (overlayfound) {
                            overlaydisappeared = true;
                            clearInterval(s);
                            resolve(true);
                        } else if (++count > localtimeout) {
                            console.log('Debug: Overlay not found for %s intervals. Proceeding', localtimeout);
                            clearInterval(s);
                            resolve(true);
                        }
                    };
                });
            }, 1000);
        });
    };

    var sendSingleItemData = function (item) {
          return new Promise(function (resolve, reject) {
            console.log("Debug: sendSingleItemData called for %s", item.id || item.value);
            getDriver().wait(until.elementLocated(getLocator(item)), getElementWaitTimeout()); 
            console.log("Debug: sendSingleItemData wait over for %s", item.id || item.value);
            getDriver().findElement(getLocator(item)).then(function (element) {
                getDriver().wait(() => { return getDriver().executeScript("return jQuery.active == 0") });

                if (item.type == "input") {
                    getDriver().wait(() => { return element.isDisplayed().then((displayed) => { if (!displayed) return false; return element.isEnabled(); }); });
                    var val = item.value;
                    if (val.match(/@UNIQUE@|@NUM.@/)) {
                        var uniqvaltemp = makeUnique(val);
                        val = uniqvaltemp;
                    }
                    console.log("Debug: Sending input: ", val);
                    element.clear().then(() => { console.log("Debug: Previous input cleared "); return element.sendKeys(val); })
                                    .then(() => {resolve(uniqvaltemp);});
                } else if (item.type == "k-select") {
                    console.log("Debug: Selecting input %s: %s ", item.id, item.value);
                    var temp = "var picker = $('###ID##').data('kendoDropDownList');picker.select(##VAL##);picker.trigger('change');";
                    var myscript = temp.replace(/##ID##/, item.id).replace(/##VAL##/, item.value);
                    console.log("Debug: Executing script: ", myscript);
                    getDriver().executeScript(myscript).then(() => { console.log('Debug: Executed script');resolve(''); (reason) => { console.log('Error: Selecting DropDownList:', reason); reject(reason); } });
                } else if (item.type == "modularispropdropdown") {
                    console.log("Debug: Selecting input %s: %s", item.id, item.value);
                    var temp = "var picker = $('###ID##').getKendoModularisPropDropDown();picker.select(##VAL##);picker.trigger('change');";
                    var myscript = temp.replace(/##ID##/, item.id).replace(/##VAL##/, item.value);
                    console.log("Debug: Executing script: ", myscript);
                    getDriver().executeScript(myscript).then(() => { resolve(''); (reason) => { console.log('Error: Selecting ModularisDropDown:', reason); reject(reason); }});
                } else if (item.type == "k-numerictextbox") {
                    console.log("Debug: Selecting input %s: %s ", item.id, item.value);
                    var temp = "var numtextbox = $('###ID##').data('kendoNumericTextBox');numtextbox.value(##VAL##);numtextbox.trigger('change');";
                    var myscript = temp.replace(/##ID##/, item.id).replace(/##VAL##/, item.value);
                    console.log("Debug: Executing script: ", myscript);
                    getDriver().executeScript(myscript).then(() => { resolve(''); (reason) => { console.log('Error: Selecting NumericTextBox:', reason); reject(reason); }});
                } else if (item.type == "checkbox") {
                    getDriver().wait(() => { return element.isDisplayed().then((displayed) => { if (!displayed) return false; return element.isEnabled(); }); });
                    console.log("Debug: Selecting checkbox %s: %s ", item.id, item.value);
                    var temp = "var elt = document.getElementById('##ID##'); var c1 = (elt.checked == true); var c2 = ##VAL##; if ( (c1 && !c2) || (!c1 && c2)) elt.click();";
                    var myscript = temp.replace(/##ID##/, item.id).replace(/##VAL##/g, item.value);
                    console.log("Debug: Executing script: ", myscript);
                    getDriver().executeScript(myscript).then(() => { console.log('Debug: Executed script');resolve(''); (reason) => { console.log('Error: Selecting Checkbox:', reason); reject(reason); }});;
                } else if (item.type == "radio") {
                    console.log("Debug: Selecting radio %s: %s", item.id, item.value);
                    var temp = "var elt = document.getElementById('##ID##'); elt.click();";
                    var myscript = temp.replace(/##ID##/, item.id).replace(/##VAL##/g, item.value);
                    console.log("Debug: Executing script: ", myscript);
                    getDriver().executeScript(myscript).then(() => { console.log('Clicked button'); resolve(''); }, (reason) => { console.log('Error: Selecting Radio:', reason); reject(reason);});;
                } else if (item.type == "k-timepicker") {
                    console.log("Debug: Selecting time %s: %s", item.id, item.value);
                    var temp = "var timepicker = $('###ID##').data('kendoTimePicker');timepicker.value('##VAL##');timepicker.trigger('change');";
                    var myscript = temp.replace(/##ID##/, item.id).replace(/##VAL##/g, item.value);
                    console.log("Debug: Executing script: ", myscript);
                    getDriver().executeScript(myscript).then(() => {resolve(''); }, (reason) => { console.log('Error: Picking time:', reason); reject(reason); });;
                } else if (item.type == "button") {
                    console.log("Debug: clicking button", item.value);
                    element.click().then(() => {
                        console.log("Debug: Clicked button", item.value);
                        resolve('');
                    });
                }
                else {
                    console.log("Error: unknown element", item);
                    reject(item);
                }
            }, function (reason) { console.log('Error getting element [%s]: [%s] :', item.id || item.value, reason); reject(reason); });
        });
    };

    var fillFields = function (driver, diagelts) {
        console.log("Debug: fillFields called with %s elements", diagelts.length);
        setDriver(driver);
    
        var actions = diagelts.map(sendSingleItemData);
        var results = Promise.all(actions);

        return results.then(function (responseArr) {
            var uniqvaltemp = responseArr.filter(function (item) { return item != undefined && item != '' });
            console.log(uniqvaltemp);
            if (uniqvaltemp == undefined || uniqvaltemp.constructor != Array ) return uniqvaltemp;

            console.log("Debug: fillFields returning %s", uniqvaltemp[0]);
            return uniqvaltemp[0];
        });

    };

    var waitOutOverlayWithTimeout = function (timeout) {
        if (getDriver() == undefined) {
            return Promise.reject(false);
        }

        return waitOutOverlay(getDriver(), timeout);
    };

    var submit = function (x) {
        if (!x || !x.type || x.type != 'submit' || !x.css)
            return Promise.reject(false);

        return getDriver().findElement(getLocator(x)).then(function (element) {
            console.log("Debug: Clicking OK Button");
            return element.click()
                .then(() => {
                    console.log("Debug: Clicked OK Button");
                    return Promise.resolve(true);
                }, (reason) => {
                    console.log('Error: Clicking OK button', reason); return Promise.reject(false);
                });
        });
    };

    return {
        getDriver: getDriver,
        setDriver: setDriver,
        getBaseUrl: getBaseUrl,
        getFullUrl: getFullUrl,
        getTestSuiteTimeout: getTestSuiteTimeout,
        getTestCaseTimeout: getTestCaseTimeout,
        getElementWaitTimeout: getElementWaitTimeout,
        getWaitBeforeVerifying: getWaitBeforeVerifying,
		takeScreenshot: takeScreenshot,
		getLocator: getLocator,
		getLoginUser: getLoginUser,
		getLoginPassword: getLoginPassword,
        getRandomString: getRandomString,
		hasUnique: hasUnique,
        makeUnique: makeUnique,
        waitOutOverlay: waitOutOverlay,
        fillFields: fillFields,
        waitOutOverlayWithTimeout: waitOutOverlayWithTimeout,
        submit: submit
    };

};

module.exports = Helper;