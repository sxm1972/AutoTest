                // Test launching of the XXX2 Screen

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
                    }, function (reason) {
                        Helper.takeScreenshot(driver, 'main_XXX4.png', function () {
                            throw reason;
                        });
                    });
                }); // end test.it


