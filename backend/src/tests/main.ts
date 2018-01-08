process.env.NODE_ENV = "test";

// mocha
import "mocha";
import { suite, test } from "mocha-typescript";

import * as Util from "../utils/util";
import { KurokoCore } from "../utils/main";

let chai: Chai.ChaiStatic = require("chai");
chai.should();

@suite class UtilTest {

    @test public getPath() {

        Util.getPath("files").should.be.a('string').eql("/Users/chuxin/Documents/study/Kuroko/smartSign/dist/dat/files");
    }
}

@suite class KurokoTest {

    @test public coreTest() {

        // new KurokoCore().initSystem();
        // new KurokoCore().init();
        new KurokoCore().exportAllLession();
    }
}