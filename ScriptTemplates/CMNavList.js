            test.it('should have a nav-list that has title XXX2', function (done) {
                setTimeout(done, Helper.getTestCaseTimeout());
                driver.findElements(By.css('.category-nav-list.XXX1 h3 span')).then(function (elements) {
                        assert.equal(elements.length, 1);
			elements[0].getText().then(function(t) {
				assert.equal(t, 'XXX2'); 							
			});
                        done();
                });
            }); // end test.it