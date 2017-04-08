            test.it('0. should have XXXCOUNT links in nav-list that has title XXX1', function (done) {
                setTimeout(done, Helper.getTestCaseTimeout());
                driver.findElements(By.css('.category-nav-list.XXX1 * li')).then(function (elements) {

                    var checknumberoflinks = function () {
                        assert.equal(elements.length, XXXCOUNT);
                        done();
                    };
                    if (elements.length != XXXCOUNT) {
                        console.log("Link count not matching for XXX1");
                        Helper.takeScreenshot(driver, 'XXX1_LinkError.png', checknumberoflinks);
                    } else {
                        checknumberoflinks();
                    }
                });
            }); // end test.it



