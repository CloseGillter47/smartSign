import * as FS from "fs";


const XLSX = require("node-xlsx");

export class Excel {

    public static FACTORY(): Excel {

        return new Excel();
    }

    constructor() {

    }

    public read(path: string): Array<any> {

        let res: Array<any>;

        if (!path) return res;

        try {

            res = XLSX.parse(path);

        } catch (error) {

            return res;
        }

        return res;
    }

    public write(path: string, sheets: Array<any>): boolean {

        if (!path || Object.prototype.toString.call(sheets) !== '[object Array]') return false;

        try {

            let buffer = XLSX.build(sheets);

            FS.writeFileSync(path, buffer, { 'flag': 'w' });

        } catch (error) {

            return false;
        }

        return true;
    }

}