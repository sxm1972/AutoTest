/* XXX2 Screen related tests
*/
var assert = require('assert'),
	test = require('selenium-webdriver/testing'),
	webdriver = require('selenium-webdriver'),
	By = webdriver.By,
	until = webdriver.until;
var Helper = require('./helper.js')();
var testconfig = require('./cm-XXX1-XXX4.json');

var driver = undefined;
var uniqvalue = "";

test.describe('When launching the XXX2 screen from the landing page', function () {

    /*
        Before running any tests, GET the Login page and login to the Configuration Manager
    */
    before(function (done) {
        setTimeout(done, Helper.getTestSuiteTimeout());
        driver = new webdriver.Builder().
                            withCapabilities(webdriver.Capabilities.chrome().set(webdriver.Capability.ACCEPT_SSL_CERTS, true)).
                            build();
        Helper.setDriver(driver);
        driver.get(Helper.getFullUrl('/CM/#/login')).then(() => {
            driver.wait(until.elementLocated(By.id('username')), Helper.getTestCaseTimeout());
            driver.findElement(By.id('username')).then(function (element) {
                element.sendKeys(Helper.getLoginUser()).then(() => {
                    driver.findElement(By.id('password')).then(function (element) {
                        element.sendKeys(Helper.getLoginPassword());
                        driver.findElement(By.className('k-button')).then(function (element) {
                            element.click().then(() => {
                                driver.wait(until.elementLocated(By.className('header-heading')), Helper.getElementWaitTimeout());
                                driver.findElement(By.className('header-heading')).then(function (element) {
                                    element.getText().then(function (value) {
                                        assert.equal(value, 'Configuration Manager');
                                        driver.wait(until.elementLocated(By.className('category-nav-list chat')), Helper.getElementWaitTimeout());
                                        done();
                                    });
                                });
                            });
                        });
                    });
                });

            });
        });
    }); // end before

    /*
        From the Configuration Manager Dashboard page should be able to launch XXX2 screen
    */
    test.it('should be able to launch the XXX2 screen', function (done) {
        this.timeout( Helper.getTestCaseTimeout());
        driver.findElement(By.css('.category-nav-list.XXX1 * li:nth-of-type(XXX3) * a')).then(function (element) {
            element.click();
            driver.wait(until.elementLocated(By.id('XXX6'), Helper.getElementWaitTimeout()));
            driver.getCurrentUrl().then(function (urlnow) {
                assert.equal(urlnow, Helper.getFullUrl('/CM/#/XXX4'));
            });
            driver.findElement(By.css('div#main h1')).then(function (element) {
                element.getText().then(function (t) {
                    assert.equal(t, 'XXX5');
                    done();
                });
            });
        });
    }); // end test.it

    /*
        From the XXX2 screen, should be able to launch the Add XXX7 screen
    */
    test.it('should be able to launch the Add XXX2 screen', function (done) {
        if (!testconfig.addDialogLauncher || !testconfig.addDialogIndicator || !testconfig.addDialogElements) {
            console.log("Error: Check config", testconfig); done();
        };
        this.timeout( Helper.getTestCaseTimeout());
        driver.findElement(Helper.getLocator(testconfig.addDialogLauncher)).then(function (element) {
            element.click();
            console.log("Debug: Add XXX2 opened");
            driver.wait(until.elementLocated(Helper.getLocator(testconfig.addDialogIndicator)), Helper.getTestCaseTimeout());
            driver.findElement(Helper.getLocator(testconfig.addDialogIndicator)).then(function (element) {
                element.getText().then(function (t) {
                    console.log("Debug: Dialog add has title: ", t);
                    assert.equal(t, ' Add XXX7');
                    done();
                });
            });
        });
    }); // end test.it

    /* 
        Test case to cancel the Add XXX7 dialog after making changes, then confirm the cancellation.
        The test will then verify we are back on the previous page
    */
    test.it('should be able to cancel the Add XXX2 screen', function (done) {

        // Check that the configuration file read in has the appropriate configurations required to test the add page.
        if (!testconfig.addDialogCancel || !testconfig.addDialogCancelWait
            || !testconfig.addDialogCancelConfirmYes || !testconfig.addDialogCancelConfirm
            || !testconfig.addDialogElements) {
            console.log("Error: Check config", testconfig); done();
        };

        // Set the maximum time to wait for this test to complete
        this.timeout( Helper.getTestCaseTimeout());
        var diagelts = testconfig.addDialogElements.filter(function (item) { return item.type != "submit" && item.type != "subscreen"; });

        // Dirty the page so that cancelling then triggers the confirmation box
        Helper.fillFields(driver, diagelts).then(function (r) {
            driver.findElement(Helper.getLocator(testconfig.addDialogCancel)).then(function (element) {
                console.log("Debug: Found Add XXX2 window close button link");
                element.click().then(() => {
                    driver.wait(until.elementLocated(Helper.getLocator(testconfig.addDialogCancelWait)), Helper.getElementWaitTimeout());

                    driver.findElement(Helper.getLocator(testconfig.addDialogCancelConfirmYes)).then(function (element) {
                        element.click(); // click on Yes for confirmation to dismiss
                        driver.wait(until.elementLocated(By.id('XXX6'), Helper.getElementWaitTimeout()));
                        driver.getCurrentUrl().then(function (urlnow) {
                            assert.equal(urlnow, Helper.getFullUrl('/CM/#/XXX4'));
                            done();
                        });
                    });
                });

            });
        });
    }); // end test.it

    /* 
        Test case to launch the Add dialog for this page, then populate the input elements on that page and then submit the changes.
        The test will then verify that the new data has been added to the DB by searching for it in the entityeditlist in the page
    */
    test.it('should be able to make and save changes in Add XXX2 screen', function (done) {

        // Check that the configuration file read in has the appropriate configurations required to test the add page.
        if (!testconfig.addDialogLauncher || !testconfig.addDialogIndicator || !testconfig.addDialogElements) {
            console.log("Error: Check config", testconfig); done();
        };

        // Set the maximum time to wait for this test to complete
        this.timeout( Helper.getTestCaseTimeout());

        var fillScreen = function (tc) {
            // Wait for some element on the Add dialog to appear on the page
            //console.log("Debug: fillScreen called for %s", tc.addDialogIndicator.value);
            driver.wait(until.elementLocated(Helper.getLocator(tc.addDialogIndicator)), Helper.getTestCaseTimeout());
            //console.log("Debug: %s opened", tc.addDialogIndicator.value);
            return driver.findElement(Helper.getLocator(tc.addDialogIndicator)).then(function (element) {
                var diagelts = tc.addDialogElements.filter(function (item) { return item.type != "submit" && item.type != "subscreen"; });
                var diagsubmit = tc.addDialogElements.filter(function (item) { return item.type == "submit"; });

                // For each of the input elements in the configuration file, send the appropriate values to the controls
                // on the page.
                return Helper.fillFields(driver, diagelts).then(function (r) {
                    uniqvalue = r;

                    // Wait for all elements to be populated by the code above. Then click the Submit element.
                    if (diagsubmit.length < 1) {
                        return Promise.reject(new Error('Error: Did not find a Submit button specified for this screen. Check config!'));
                    }
                    return Helper.submit(diagsubmit[0]);

                }, function (err) { console.log('Error: fillFields returned error:', err); });
            });
        }; // end fillScreen

        var handleSubscreen = function (subscreen) {
            var subscreenconfig = require(subscreen.value);
            if (!subscreenconfig.addDialogLauncher || !subscreenconfig.addDialogIndicator || !subscreenconfig.addDialogElements) {
                console.log("Error: Check config", subscreenconfig);
            };
            console.log('Debug: In handleSubscreen . Waiting for launch button for %s...', subscreen.id);
            driver.wait(until.elementLocated(Helper.getLocator(subscreenconfig.addDialogLauncher)), Helper.getElementWaitTimeout());
            return driver.findElement(Helper.getLocator(subscreenconfig.addDialogLauncher))
                .then((element) => {
                    console.log('Debug: Launching subscreen', subscreen.id);
                    return element.click()
                        .then(() => {
                            console.log('Debug: Calling fillScreen for %s subscreen', subscreen.id);
                            return fillScreen(subscreenconfig);//.then(() => { return Promise.resolve(); });
                        }, function (reason) {
                            console.log('Debug: handleSubScreen threw error %s', reason);
                            Helper.takeScreenshot(driver, 'Add_XXX4_subscreen_error.png');
                            return Promise.reject(reason);
                        });
                });
        }; // end handleSubscreen

        var addAndSave = function (tc) {
            console.log('Debug: In addAndSave. Waiting...', tc.addDialogIndicator);
            driver.wait(until.elementLocated(Helper.getLocator(tc.addDialogIndicator)), Helper.getTestCaseTimeout());
            //return new Promise(function (resolve, reject) {
                var diagsubscreens = tc.addDialogElements.filter(function (item) { return item.type == "subscreen"; });

                // Are there subscreens to be launched and filled?
                if (diagsubscreens && diagsubscreens.length != 0) {
                    console.log('Debug: Found %s subscreens', diagsubscreens.length);

                    var mapSeries = require('promise-map-series');
                    return mapSeries(diagsubscreens, handleSubscreen)
                        .then(() => {
                            console.log('Debug: Now filling main screen');
                            return fillScreen(tc);//.then(() => { resolve(); });;
                        }, function (reason) {
                            console.log('Error: mapSeries threw error %s', reason);
                            return Promise.reject(reason);
                        });

                } else {
                    return fillScreen(tc);//.then(() => { resolve(); });;
                }
            //});
        };  // end addAndSave

        var doAfterOverlay = function (oktoproceed) {
            //return new Promise(function (resolve, reject) {
                if (oktoproceed) {
                    // Find the element on the page that launches the Add dialog, usually the + button on the toolbar area.
                    // console.log('Debug: In doAfterOverlay. Finding...', testconfig.addDialogLauncher);
                    return driver.findElement(Helper.getLocator(testconfig.addDialogLauncher)).then(function (element) {
                        return element.click().then(() => {
                            return addAndSave(testconfig);
                            //.then(function () {
                            //    resolve();
                            //}, function (reason) {
                            //    console.log('Error: addAndSave threw error %s', reason);
                            //    reject(reason);
                            //});
                        });

                    });
                } else {
                    Helper.takeScreenshot(driver, 'add_XXX4_error.png', done);
                    assert.equal(true, false);
                    return Promise.reject();
                }
            //});
        }; // end doAfterOverlay

        Helper.waitOutOverlay(driver)
            .then(doAfterOverlay)
            .then(() => {
                // Wait for a little while, by setting a timer, for the entityeditlist to refresh. Then check if the added element is present
                console.log('Debug: Setting timeout before verifying results');
                setTimeout(function () {
                    var locatorOfElementToVerify = "//td[text()='###VAL###']";
                    var hasuniqval = (Helper.hasUnique(testconfig.addDialogElements)) ? uniqvalue : diagaddelts[0].value;
                    var findstring = locatorOfElementToVerify.replace(/###VAL###/, hasuniqval);
                    driver.findElements(By.xpath(findstring)).then(function (elements) {
                        console.log("Debug: Checking for addition of: %s, xpath = %s ", hasuniqval, findstring);
                        if (elements.length != 1) {
                            Helper.takeScreenshot(driver, 'add_XXX4_error.png', function () {
                                assert.equal(elements.length, 1); // the added element should be added
                                done();
                            });
                        } else {
                            assert.equal(elements.length, 1); // the added element should be added
                            done();
                        }
                    });
                }, Helper.getWaitBeforeVerifying());
            }, (reason) => {
                console.log('Error: doAfterOverlay threw error:', reason);
                assert.equal(true, false);
                done();
            });

    }); // end test.it

    /* 
        Test case to modify XXX7, then choose yes on the confirm dialog.
        The test will then verify that the modified data has been updated by 
        searching for it in the entityeditlist in the page
    */
    test.it('should be able to modify the added XXX7', function (done) {
        // Check that the configuration file read in has the appropriate configurations required to test the modify page.
        if (!testconfig.modifyElement || !testconfig.modifyElementLaunchButton || !testconfig.modifyDialogIndicator
			|| !testconfig.modifyDialogChangeElements || !testconfig.modifyDialogVerifyAfter
			|| !testconfig.addDialogElements) {
            console.log("Error: Check modify config params", testconfig); done();
        };
        if (uniqvalue == '') {
            console.log("Debug: Record not found to modify. Skipping test");
            done();
            return;
        };

        this.timeout( Helper.getTestCaseTimeout());
        var diagaddelts = testconfig.addDialogElements.filter(function (item) { return item.type != "submit" && item.type != "subscreen"; });

        var findElementToModify = function (tc) {
            var locatorOfElementToModify = tc.modifyElement.xpath;
            var hasuniqval = (Helper.hasUnique(tc.addDialogElements)) ? uniqvalue : diagaddelts[0].value;

            driver.wait(until.elementLocated(By.xpath(locatorOfElementToModify.replace(/###VAL###/, hasuniqval))), Helper.getElementWaitTimeout());
            return driver.findElements(By.xpath(locatorOfElementToModify.replace(/###VAL###/, hasuniqval))).then(function (elements) {
                // skip this test if the element is not found
                if (elements.length != 1) {
                    return Promise.reject('Error: Could not find Record to modify.');
                };

                console.log("Debug: Found element with text %s", hasuniqval);
                var temp = "document.evaluate(\"##XPATH##\", document, null, 9, null ).singleNodeValue.scrollIntoView(true);";
                var myscript = temp.replace(/##XPATH##/, locatorOfElementToModify.replace(/###VAL###/, hasuniqval));
                console.log("Debug: Executing script: ", myscript);
                return driver.executeScript(myscript).then(() => {
                    return elements[0].click().then(() => {
                        console.log("Debug: Clicked element with text %s", hasuniqval);
                        return Promise.resolve(true);
                    });
                });
            });
        }; // end findElementToModify

        var modifyAndSave = function (tc) {

            // We try to find the record added in the previous test and modify it.
            return findElementToModify(tc).then(() => {

                return driver.findElement(Helper.getLocator(tc.modifyElementLaunchButton)).then(function (element) {
                    return element.click().then(() => {
                        // Sort the input elements so we know which are the input elements and which ones are buttons
                        var diagelts = tc.modifyDialogChangeElements.filter(function (item) { return item.type != "submit" && item.type != "subscreen"; });
                        var diagsubmit = tc.modifyDialogChangeElements.filter(function (item) { return item.type == "submit"; });

                        // For each of the input elements in the configuration file, send the appropriate values to the controls
                        // on the page.
                        driver.wait(until.elementLocated(Helper.getLocator(tc.modifyDialogIndicator)), Helper.getTestCaseTimeout());
                        return Helper.fillFields(driver, diagelts).then(function (r) {
                            if (r != undefined && r != '') {
                                uniqvalue = r;
                            }

                            return Helper.submit(diagsubmit[0]);
                        });

                    });
                });

            });
        }; // end modifyAndSave

        var doAfterOverlay = function (oktoproceed) {
            return new Promise(function (resolve, reject) {
                if (oktoproceed) {
                    return modifyAndSave(testconfig).then(function () {
                        resolve();
                    }, function (reason) {
                        console.log('Error: modifyAndSave threw error %s', reason);
                        reject(reason);
                    });
                } else {
                    return Helper.takeScreenshot(driver, 'modify_XXX4_error.png', function () {
                        reject(new Error('Error: Overlay still visible'));
                    });
                }
            });
        }; // end doAfterOverlay

        Helper.waitOutOverlay(driver).then(doAfterOverlay)
            .then(() => {
                // Wait for a little while, by setting a timer, for the entityeditlist to refresh. Then check if the added element is present
                setTimeout(function () {
                    var diagaddelts = testconfig.addDialogElements.filter(function (item) { return item.type != "submit" && item.type != "subscreen"; });
                    var locatorOfElementToVerify = testconfig.modifyDialogVerifyAfter.xpath;
                    var hasuniqval = (Helper.hasUnique(testconfig.addDialogElements)) ? uniqvalue : diagaddelts[0].value;

                    var findstring = locatorOfElementToVerify.replace(/###VAL###/, hasuniqval);
                    driver.findElements(By.xpath(findstring)).then(function (elements) {
                        console.log("Debug: Checking for modification of: %s, xpath = %s ", hasuniqval, findstring);
                        if (elements.length != 1) {
                            Helper.takeScreenshot(driver, 'modify_XXX4_error.png', function () {
                                assert.equal(elements.length, 1); // the added element should be added
                                done();
                            });
                        } else {
                            assert.equal(elements.length, 1); // the added element should be added
                            done();
                        }
                    });
                }, Helper.getWaitBeforeVerifying());
            }, (reason) => {
                console.log('Error: doAfterOverlay threw error:', reason);
                assert.equal(true, false);
                done();
            });
    }); // end test.it	

    /* 
        Test case to delete an XXX7, then choose yes on the confirm dialog.
        The test will then verify that the deleted data has been removed by 
		searching for it in the entityeditlist in the page
    */
    test.it('should be able to delete the added XXX7', function (done) {

        // Check that the configuration file read in has the appropriate configurations required to test the delete page.
        if (!testconfig.modifyElement || !testconfig.modifyElementLaunchButton
            || !testconfig.modifyDialogIndicator || !testconfig.modifyDialogChangeElements
            || !testconfig.modifyDialogVerifyAfter || !testconfig.addDialogElements
            || !testconfig.deleteElementConfirmWait || !testconfig.deleteElementLaunchButton
            || !testconfig.deleteElement ) {
            console.log("Error: Check delete config params", testconfig);
            done();
            return;
        };
        if (uniqvalue == '') {
            console.log("Debug: Record not found to delete. Skipping test");
            done();
            return;
        };
        this.timeout( Helper.getTestCaseTimeout());
        var diagaddelts = testconfig.addDialogElements.filter(function (item) { return item.type != "submit" && item.type != "subscreen"; });
        var locatorOfElementToDelete = testconfig.deleteElement.xpath;

        var findElementToDelete = function (tc) {
            var hasuniqval = (Helper.hasUnique(tc.addDialogElements)) ? uniqvalue : diagaddelts[0].value;

            driver.wait(until.elementLocated(By.xpath(locatorOfElementToDelete.replace(/###VAL###/, hasuniqval))), Helper.getElementWaitTimeout());
            return driver.findElements(By.xpath(locatorOfElementToDelete.replace(/###VAL###/, hasuniqval))).then(function (elements) {
                // skip this test if the element is not found
                if (elements.length != 1) {
                    return Promise.reject('Error: Could not find Record to modify.');
                };

                console.log("Debug: Found element with text %s", hasuniqval);
                var temp = "document.evaluate(\"##XPATH##\", document, null, 9, null ).singleNodeValue.scrollIntoView(true);";
                var myscript = temp.replace(/##XPATH##/, locatorOfElementToDelete.replace(/###VAL###/, hasuniqval));
                console.log("Debug: Executing script: ", myscript);
                return driver.executeScript(myscript).then(() => {
                    return elements[0].click().then(() => {
                        console.log("Debug: Clicked element with text %s", hasuniqval);
                        return Promise.resolve(true);
                    });
                });
            });
        }; // end findElementToModify


        var deleteRecord = function (tc) {
            return findElementToDelete(tc)
                .then(() => {
                    return driver.findElement(Helper.getLocator(testconfig.deleteElementLaunchButton));
                })
                .then(function (element) {
                    console.log("Debug: Found delete button");
                    return element.click();
                })
                .then(() => {
                    console.log("Debug: delete button clicked");
                    driver.wait(until.elementLocated(Helper.getLocator(tc.deleteElementConfirmWait)), Helper.getElementWaitTimeout());
                    console.log("Debug: Delete confirmation box is up!");

                    return driver.findElement(Helper.getLocator(tc.deleteElementConfirmWait));
                })
                .then(function (element) {
                    console.log("Debug: Delete confirmation box - Yes button found!");
                    return element.click();
                })
                .then(() => {
                    console.log("Debug: Clicked OK Button");
                    return Promise.resolve(true);
                }, (reason) => {
                    return Promise.reject(new Error('Error: Error clicking Delete Confirmation Yes'));
                });
            //                    // .then(() => { return Promise.resolve(); });
            //                }); //, (reason) => { return Promise.reject(new Error('Error: Error finding Delete Confirmation dialog')); })
            //                //.then(() => { return Promise.resolve(); });
            //            });
            //            //.then(() => { return Promise.resolve(); });;
            //        });
            //        //.then(() => { return Promise.resolve(); });;
            //    });
            ////.then(() => { return Promise.resolve(); });;
        }; // end deleteRecord

        var doAfterOverlay = function (oktoproceed) {
            if (oktoproceed) {
                return deleteRecord(testconfig);
                    //.then(function () {
                    //    return Promise.resolve();
                    //}, function (reason) {
                    //    console.log('Error: deleteRecord threw error %s', reason);
                    //    return Promise.reject(reason);
                    //});
            } else {
                return Helper.takeScreenshot(driver, 'delete_XXX4_error.png', function () {
                    return Promise.reject('Error: Overlay still visible');
                });
            }
        }; // end doAfterOverlay

        Helper.waitOutOverlay(driver)
            .then(doAfterOverlay)
            .then(() => {
                console.log('Debug: Setting timeout before verifying results');
                setTimeout(function () {
                    var findstring = locatorOfElementToDelete.replace(/###VAL###/, uniqvalue);
                    console.log("Debug: Checking for deletion of: %s, xpath = %s ", uniqvalue, findstring);
                    driver.findElements(By.xpath(findstring)).then(function (elements) {
                        console.log("Debug: Found %s elements matching ", elements.length);
                        assert.equal(elements.length, 0);
                        done();
                    });

                }, Helper.getWaitBeforeVerifying());
            }, (reason) => {
                console.log('Error: doAfterOverlay threw error:', reason);
                Helper.takeScreenshot(driver, 'delete_XXX4_error.png', function () {
                    assert.equal(true, false);
                    done();
                });
            });
    }); // end test.it		

    //BEGINCUSTOMINSERT
    //  Preserve custom tests written here
    //ENDCUSTOMINSERT

    afterEach(function () {
        console.log("=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-");
    });

    after(function () {
        console.log("Debug: Driver quitting now")
        driver.quit();
    });

}); // end.describe
