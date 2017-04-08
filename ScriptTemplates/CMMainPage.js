/* Configuration Manager Tests
 */
  

var assert = require('assert'),
	test = require('selenium-webdriver/testing'),
	webdriver = require('selenium-webdriver'),
	By = webdriver.By,
	until = webdriver.until;

var Helper = require('./Helper.js')();

var driver = undefined;
test.describe('Configuration Manager tests', function () {
	
	//test.describe('1. Configuration Manager Login ', function () {
		
	//    before(function (done) {
	//        setTimeout(done, Helper.getTestSuiteTimeout());
	//        driver = new webdriver.Builder().
	//                               withCapabilities(webdriver.Capabilities.chrome().set(webdriver.Capability.ACCEPT_SSL_CERTS, true)).
	//                               build();
	//		driver.get(Helper.getFullUrl('/CM/#/login')).then(function () {
	//			driver.wait(until.elementLocated(By.id('username')), 30000);
	//			driver.findElement(By.id('username')).then(function (element) {
	//				element.sendKeys('uccadmin');
	//				driver.findElement(By.id('password')).then(function (element) {
	//					element.sendKeys('Aspect8');
	//					driver.findElement(By.className('k-button')).then(function (element) {
	//						element.click();
	//						driver.wait(until.elementLocated(By.css('.k-widget.k-notification.k-notification-error')), Helper.getElementWaitTimeout());
	//						done();
	//					});
	//				});
	//			});
	//		});
	//	});
		
	//	test.it('with a wrong password should not work', function (done) {
	//		setTimeout(done, 30000);
	//		driver.getCurrentUrl().then(function (urlnow) {
	//			assert.equal( urlnow, Helper.getFullUrl('/CM/#/login'));
	//		});
	//		driver.findElement(By.className('k-notification-wrap m-message')).then(function (element) {
	//			element.getText().then(function (t) {
	//				assert.equal( t.indexOf('error') > -1,  true);
	//				done();
	//			});
	
	//		});
	//	}); // end test.it

	//	after(function () {
	//	    console.log("Driver quitting now")
	//	    driver.quit();
	//	});
	//}); // end describe
	
	test.describe('2. Configuration Manager Login', function () {
		before(function (done) {
		    setTimeout(done, Helper.getTestSuiteTimeout());
			driver = new webdriver.Builder().
                                withCapabilities(webdriver.Capabilities.chrome().set(webdriver.Capability.ACCEPT_SSL_CERTS, true)).
                                build();
			driver.get(Helper.getFullUrl('/CM/#/login')).then(function () {
				driver.wait(until.elementLocated(By.id('username')), 50000);
				driver.findElement(By.id('username')).then(function (element) {
					element.sendKeys('uccadmin');
					driver.findElement(By.id('password')).then(function (element) {
						element.sendKeys('Aspect9');
						driver.findElement(By.className('k-button')).then(function (element) {
							element.click();
							driver.wait(until.elementLocated(By.className('header-heading')), 30000);
							console.log("Calling before.done");
							done();
						});
					});
				});
			});
		}); // end before
		
		test.it('with a correct password should work', function (done) {
			setTimeout(done, 30000);
			driver.wait(until.elementLocated(By.className('header-heading')), Helper.getElementWaitTimeout());
			driver.findElement(By.className('header-heading')).then(function (element) {
				element.getText().then(function (value) {
					assert.equal( value,  'Configuration Manager');
					done();
				});
			});
		}); // end test.it
		
	    // BEGINLINK
	    // Include cm-link-test.js
        // ENDLINK
		
		test.describe('From Configuration Manager dashboard', function (done) {
		    beforeEach(function (done) {
		        setTimeout(done, 75000);
		        driver.getCurrentUrl().then(function (urlnow) {
		            if (urlnow == Helper.getFullUrl('/CM/#/')) {
		                done();
		                return;
		            } else {
		                console.log('Debug:Getting Dashboard page again. Current URL: %s', urlnow);
		                driver.get(Helper.getFullUrl('/CM/#/'));
		                driver.wait(until.elementLocated(By.className('header-heading')), Helper.getElementWaitTimeout());
		                done();
		            }
		        });
		    });


		// BEGIN-INSERT Generated tests here
		// Include cm-launch-back.js
		// END-INSERT Generated tests here
		    afterEach(function (done) {
		        driver.getCurrentUrl().then(function (urlnow) {
		            if (urlnow != Helper.getFullUrl('/CM/#/')) {
		                driver.navigate().back(); done();
		                return;
		            }
		            done();
		        });
		    });

		}); // end.describe
		
				
		after(function () {
			console.log("Driver quitting now")
			driver.quit();
		});
	});
});
