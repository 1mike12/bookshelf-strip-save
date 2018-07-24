'use strict';

global.mocha = require('mocha');
global.chai = mocha.chai;
global.expect = require("chai").expect;
process.env.NODE_ENV = "test";