process.env.NODE_ENV = "test";

// mocha
import "mocha";

import { suite, test } from "mocha-typescript";

import * as Util from "../utils/util";

let chai: Chai.ChaiStatic = require("chai");
chai.should();

@suite class StudentTest {

    @test public getPath() {

        Util.getPath("files").should.be.a('string').eql("/Users/chuxin/Documents/study/Kuroko/smartSign/dist/dat/files");
    }
}