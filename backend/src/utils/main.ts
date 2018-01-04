import * as FS from "fs";
import * as PATH from "path";

import { Excel, Sheet } from "./xlsx";
import * as Tool from "./util";

const XLS = Excel.FACTORY();

export interface iExcelFile {
    sheets?: Sheet[];
    stat?: FS.Stats;
    path?: string;
}

export interface iRowConf {
    name?: string;
    keyword?: string;
    keywordIndex?: number;
    keys?: string[];
    values?: string[];
}

export interface excelConf {
    ONLY_ONE_HEADER?: boolean;
    EXCEL_HEADERS?: iRowConf[];
}

export class KurokoCore {

    constructor() {

    }

    public export_conf: any;

    public rowKey: string[];

    public rowVal: string[];

    public static DefualtConf = {
        "ONLY_ONE_HEADER": true,
        "EXCEL_HEADERS": [
            {
                "name": "system",
                "keyword": "No",
                "keywordIndex": 3,
                "keys": [
                    "name",
                    "pinyin",
                    "idCard",
                    "unit",
                    "dept",
                    "job",
                    "address",
                    "phone",
                    "email",
                    "emailCode"
                ],
                "values": [
                    "姓名",
                    "拼音",
                    "身份证",
                    "单位",
                    "部门",
                    "职位",
                    "地址",
                    "电话",
                    "邮件",
                    "邮编"
                ]
            }
        ]
    };

    public init() {

        this.export_conf = Tool.GetFile(PATH.join(Tool.getPath('conf'), 'export.conf.json'), true, true) || KurokoCore.DefualtConf;

        let files = this.readAllExcelFiles(Tool.getPath('.in'));

        let rowConf = this.getRowConf("system");

        for (let file of files) {

            this.EXCELTOJSON(file, rowConf);


        }
    }

    public getRowConf(type: string) {

        this.export_conf = this.export_conf || Tool.GetFile(PATH.join(Tool.getPath('conf'), 'export.conf.json'), true, true) || KurokoCore.DefualtConf;

        for (let rowConf of this.export_conf.EXCEL_HEADERS) {

            if (rowConf.name === type) {

                return rowConf;
            }
        }

        return null;
    }

    /**
     * 将对象导出为表格文件
     */
    public JSONToEXCEL(Sheets: Sheet[]) {

    }

    /**
     * 将表格文件解析为对象
     */
    public EXCELTOJSON(file: iExcelFile, rowConf?: iRowConf) {

        let sheets = file.sheets;

        let stat = file.stat;

        let path = file.path;

        rowConf.keywordIndex = rowConf.keywordIndex - 1 || 1;

        for (let sheet of sheets) {

            let sheetName = sheet.name;

            let sheetData = sheet.data;

            let idIndex = Tool.dateToLocalString(new Date(), 'number');

            console.log(idIndex);

            sheetData.forEach((row, idx) => {

                if (idx && row.length && row[rowConf.keywordIndex]) {

                    let student = {};

                    rowConf.keys.forEach((k, i) => {

                        student[k] = row[i] || '';
                    });

                    student['id'] += (~~idIndex);

                    console.log(student);
                }
            })


        }
    }

    public readAllExcelFiles(path: string) {

        let res = new Array();

        let stat = FS.statSync(path);

        if (stat.isDirectory()) {

            let files = FS.readdirSync(path);

            for (let file of files) {

                let url = PATH.join(path, file);

                let _res = this.readAllExcelFiles(url);

                if (_res.length) { res.push(..._res) }

            }

            return res;
        }

        if (stat.isFile()) {

            if (PATH.parse(path).ext === ".xlsx" && stat.size > 1000) {

                let sheets = XLS.read(path);

                res.push({ sheets: sheets, stat: stat, path: path });
            }

            return res;
        }

    }
} 