
            // Should have a link to XXX5 page
            test.it('XXX3. should have a link to the XXX2 page in nav-list that has title XXX1', function (done) {
                setTimeout(done, Helper.getTestCaseTimeout());
                driver.findElement(By.css('.category-nav-list.XXX1 * li:nth-of-type(XXX3) * span')).then(function (element) {
                    element.getText().then(function (t) {
                        assert.equal(t, 'XXX2');
                        done();
                    });
                });
            }); // end test.it



