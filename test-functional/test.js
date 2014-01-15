'use strict';

require('should');

var fail = require('assert').fail;
var By = require('selenium-webdriver').By,
    error = require('selenium-webdriver').error,
    test = require('selenium-webdriver/lib/test'),
    assert = require('selenium-webdriver/testing/assert'),
    Browser = test.Browser,
    Pages = test.Pages;

var SITE_URL = process.env.SITE_URL;

require('./support/app')

test.suite(function (env) {

  before(function (done) {
    require('./support/app');
    done();
  });

  var driver;
  
  beforeEach(function () { 
    driver = env.driver; 
  });

  describe('Happy Path: logging in', function () {

    test.it('invalid username or password should show alert informing user', function () {
      driver.get(SITE_URL);
      driver.findElement(By.name('username')).sendKeys('invalid_login');
      driver.findElement(By.name('password')).sendKeys('invalid_password');
      driver.findElement(By.id('submit')).click();
      driver.findElement(By.className('alert')).getText().then(function (text) {
        text.should.include('Sorry, that username and password combination doesn\'t match');
      }).then(null, function (err) {
        throw err;
      });
    });

    test.it('correct username and password should show success page', function () {
      driver.get(SITE_URL);
      driver.findElement(By.name('username')).sendKeys('matt');
      driver.findElement(By.name('password')).sendKeys('matt');
      driver.findElement(By.id('submit')).click();
      driver.findElement(By.className('freeeeeedom')).getText().then(function (text) {
        text.should.include('matt, you bought yourself FREEEEEDOOOOOM!');
      }).then(null, function (err) {
        throw err;
      });
    });

    // test.it('clicking on freeeeeedom image should tell you how sneaky you are', function () {
    //   driver.findElement(By.className('freedom')).click();
    //   driver.findElement(By.className('huzzaah')).getText().then(function (text) {
    //     text.should.include('You so sneaky!');
    //   }).then(null, function (err) {
    //     throw err;
    //   });
    // });
  
  });

});