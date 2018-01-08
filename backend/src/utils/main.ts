import * as FS from "fs";
import * as PATH from "path";

import { Excel, Sheet } from "./xlsx";
import { Lession } from "../interfaces/lession";
import { iFile } from "../interfaces/files";
import { Student } from "../interfaces/student";
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

export interface iExportOpt {
    fileName?: string;
    sheetName?: string;
    keys?: string[];
    values?: string[];
}

export interface excelConf {
    ONLY_ONE_HEADER?: boolean;
    EXCEL_HEADERS?: iRowConf[];
}

export class KurokoCore {

    constructor() {
        if (!FS.existsSync(Tool.getPath('admin'))) FS.mkdirSync(Tool.getPath('admin'));
        if (!FS.existsSync(Tool.getPath('.out'))) FS.mkdirSync(Tool.getPath('.out'));
        if (!FS.existsSync(Tool.getPath('files'))) FS.mkdirSync(Tool.getPath('files'));
        if (!FS.existsSync(Tool.getPath('lession'))) FS.mkdirSync(Tool.getPath('lession'));
        if (!FS.existsSync(Tool.getPath('student'))) FS.mkdirSync(Tool.getPath('student'));
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

        let fileInfoes = new Array();

        let rowConf = this.getRowConf("system");

        let sysLessiones = new Array();

        for (let file of files) {

            let fileInfo: iFile = {
                fileId: '',
                upload: '',
                author: 'system',
                filename: PATH.parse(file.path).name + PATH.parse(file.path).ext,
                fileurl: file.path,
                lessiones: new Array()
            };

            let lessiones = this.EXCELTOJSON(file, rowConf);

            for (let lession of lessiones) {

                // 填充文件信息
                fileInfo.lessiones.push(lession.id);

                // 按课堂Id写入学员信息列表
                Tool.SetFile(PATH.join(Tool.getPath('student'), lession.id + '.json'), lession.studentes, true, false);

                // 删除容量庞大的学员信息列表
                delete lession.studentes;
            }

            sysLessiones.push(...lessiones);

            fileInfoes.push(fileInfo);
        }

        Tool.SetFile(PATH.join(Tool.getPath('files'), 'index.json'), fileInfoes, true, false);

        // 在课堂索引中写入课堂信息列表
        Tool.SetFile(PATH.join(Tool.getPath('lession'), 'index.json'), sysLessiones, true, false);
    }

    public initSystem() {

        this.clearTemp(Tool.getPath('student'));

        this.clearTemp(Tool.getPath('.out'));

        Tool.SetFile(PATH.join(Tool.getPath('files'), 'index.json'), [], true, false);

        Tool.SetFile(PATH.join(Tool.getPath('lession'), 'index.json'), [], true, false);
    }

    public exportAllLession() {

        let lessiones = Tool.GetFile(PATH.join(Tool.getPath('lession'), 'index.json'), true, false);

        for (let lession of lessiones) {

            let studentes = Tool.GetFile(PATH.join(Tool.getPath('student'), lession.id + '.json'), true, false);

            if (studentes.length) {

                let excelData = this.JSONToEXCEL(studentes, { fileName: lession.id, sheetName: lession.name });

                XLS.write(PATH.join(Tool.getPath('.out'), excelData.file + '.xlsx'), [excelData.excel]);
            }
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
    public JSONToEXCEL(studentes: Student[], option: iExportOpt) {

        let _keys = option.keys;

        let _values = option.values;

        if (!_keys || _values) {

            let _rowCof = this.getRowConf('system');

            _rowCof = _rowCof !== null ? _rowCof : KurokoCore.DefualtConf.EXCEL_HEADERS[0];

            _keys = option.keys || _rowCof.keys;

            _values = option.values || _rowCof.values;
        }

        let sheet: Sheet = {
            name: option.sheetName,
            data: new Array()
        };

        for (let student of studentes) {

            let item = new Array();

            _keys.forEach((k, i) => {

                item.push(student[k]);
            });

            sheet.data.push(item);
        }

        return { excel: sheet, file: option.fileName || Tool.dateToLocalString(new Date(), 'numbercut', 15) }
    }

    /**
     * 将表格文件解析为对象
     * @param file 规定格式的数据
     * @param rowConf 规定格式的配置
     * @returns 完整的课堂（包括课堂信息，学员列表）列表
     */
    public EXCELTOJSON(file: iExcelFile, rowConf?: iRowConf) {

        let res = new Array();

        let sheets = file.sheets;

        let stat = file.stat;

        let path = file.path;

        let idIndex = 0;

        let idHeader = Tool.dateToLocalString(new Date(), 'numbercut', 12);

        let lessionIdHeader = Tool.dateToLocalString(new Date(), 'numbercut', 12);

        let lessionIdndex = 100;

        rowConf.keywordIndex = rowConf.keywordIndex - 1 || 1;

        for (let sheet of sheets) {

            let lession: Lession = {
                id: lessionIdHeader + lessionIdndex++,
                name: sheet.name,
                size: 0,
                total: 0,
                signed: 0,
                checked: 0,
                export: ''
            };

            let studentes = new Array();

            let sheetName = sheet.name;

            let sheetData = sheet.data;

            sheetData.forEach((row, idx) => {

                if (idx && row.length && row[rowConf.keywordIndex]) {

                    let student = {};

                    rowConf.keys.forEach((k, i) => {

                        student[k] = row[i] + '' || '';
                    });

                    student['id'] = idHeader + idIndex++;

                    studentes.push(student);
                }
            });

            lession.size = lession.total = studentes.length;

            // 写入 student 文件
            // Tool.SetFile(PATH.join(Tool.getPath('student'), lession.id + '.json'), studentes, true, false);

            lession['studentes'] = studentes;

            res.push(lession);
        }

        return res;
    }

    /**
     * 
     * @param path 需要读取的文件路径（包括文件夹和文件）
     */
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

    public clearTemp(path: string) {

        let stat = FS.statSync(path);

        if (stat.isDirectory()) {

            let files = FS.readdirSync(path);

            for (let file of files) {

                let url = PATH.join(path, file);

                this.clearTemp(url);
            }

            FS.rmdirSync(path);
        }

        if (stat.isFile()) {

            return FS.unlinkSync(path);
        }

    }
} 