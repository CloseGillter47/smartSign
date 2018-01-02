import * as FS from "fs";

import * as PATH from "path";

import * as _ from "lodash";

import { Excel } from "./xlsx";

import * as Tool from "./util";

const XLS = Excel.FACTORY();

let EXPORT_CONF: any;

let APP_CONFIG: any;

export class FileAPI {

    protected COM_FILE_INDEX: number = 10;

    protected COM_CLAS_INDEX: number = 100;

    protected COM_TEMP_INDEX: number = 100;

    protected COM_DATA_INDEX: number = 1000;

    protected FILE_ID_HEADER: string = Tool.dateToLocalString(new Date(), "numbercut");

    protected CLAS_ID_HEADER: string = Tool.dateToLocalString(new Date(), "numbercut");

    protected TEMP_ID_HEADER: string = Tool.dateToLocalString(new Date(), "numbercut");

    protected DATA_ID_HEADER: string = Tool.dateToLocalString(new Date(), "numbercut");

    public BASE_ROOT: string = PATH.resolve(__dirname, '../../../../');

    constructor() {

        EXPORT_CONF = Tool.GetFile(PATH.join(Tool.getPath("conf"), "export.conf.json"), true);

        APP_CONFIG = Tool.GetFile(PATH.join(Tool.getPath("conf"), "app.conf.json"), true);

        let herf_db = PATH.join(this.BASE_ROOT, 'db');

        if (!FS.existsSync(herf_db)) FS.mkdirSync(herf_db);

        let herf_in = PATH.join(this.BASE_ROOT, 'db', 'in');

        if (!FS.existsSync(herf_in)) FS.mkdirSync(herf_in);

        let herf_out = PATH.join(this.BASE_ROOT, 'db', 'xlsx');

        if (!FS.existsSync(herf_out)) FS.mkdirSync(herf_out);

        let herf_temps = PATH.join(this.BASE_ROOT, 'db', 'temps');

        if (!FS.existsSync(herf_temps)) FS.mkdirSync(herf_temps);

        let herf_files = PATH.join(this.BASE_ROOT, 'db', 'files');

        if (!FS.existsSync(herf_files)) FS.mkdirSync(herf_files);

    }

    /**
     * 返回一个新实例
     * @return FileAPI 新实例
     */
    public static Factory(): FileAPI {

        return new FileAPI();
    }

    /**
     * 初始化数据库，搜索文件并建立临时缓存文件；
     * 注意：不要经常调用该方法，一般只在使用前调用一次。
     */
    public Init() {

        this.COM_FILE_INDEX = 10;

        this.COM_CLAS_INDEX = 100;

        this.COM_TEMP_INDEX = 100;

        this.COM_DATA_INDEX = 1000;

        this.FILE_ID_HEADER = Tool.dateToLocalString(new Date(), "numbercut");

        this.CLAS_ID_HEADER = Tool.dateToLocalString(new Date(), "numbercut");

        this.TEMP_ID_HEADER = Tool.dateToLocalString(new Date(), "numbercut");

        this.DATA_ID_HEADER = Tool.dateToLocalString(new Date(), "numbercut");

        let root = PATH.join(this.BASE_ROOT, 'db', 'in');

        let data = this.readAllExcelFiles(root);

        this.buildDATAFromSheets(data);

    }

    // 这个是系统统一读取使用
    protected readAllExcelFiles(path: string): Array<EFile> {

        let res: Array<EFile> = [];

        let files = FS.readdirSync(path);

        for (let file of files) {

            let url = PATH.join(path, file);

            let stat = FS.statSync(url);

            if (stat.isDirectory()) {

                let _res = this.readAllExcelFiles(url);

                res.push(..._res);
            }

            if (stat.isFile()) {

                if (PATH.parse(file).ext === '.xlsx' && stat.size > 1000) {

                    let sheets = XLS.read(url);

                    res.push({ path: url, stat: stat, sheets: sheets });
                }
            }
        }

        return res;
    }

    // 这个是给用户单独读取使用
    public readExcelFile(path: string): EFile {

        let stat = FS.statSync(path);

        let sheets = XLS.read(path);

        let res = { path: path, stat: stat, sheets: sheets };

        return res;
    }

    // 解析表格文件数据
    public buildDATAFromSheets(files: Array<EFile>) {

        let rowKeyword = EXPORT_CONF.EXCEL_HEADER[0].keyword;

        let readKeys = EXPORT_CONF.EXCEL_HEADER[0].keys;

        let rowKeywordIndex = _.findIndex(readKeys);

        // 这里开始解析文件
        files.forEach((file, index) => {

            let out_file_item = {

                // 文件在系统中的Id
                id: this.FILE_ID_HEADER + String(++this.COM_FILE_INDEX),
                // 文件名
                name: PATH.parse(file.path).name + PATH.parse(file.path).ext,
                // 文件的真实路径
                path: file.path,
                // 文件的上传时间
                updateTime: Tool.dateToLocalString(),
                // 包括那些课堂
                lessionses: new Array()
            };

            // 这里是一个文件
            file.sheets.forEach((sheet, indx) => {

                let TempFileID = this.TEMP_ID_HEADER + 'A' + String(++this.COM_TEMP_INDEX);

                let out_lession_item = {
                    // 该课堂在系统中的Id
                    id: this.CLAS_ID_HEADER + String(++this.COM_CLAS_INDEX),
                    // 该课堂包括的临时文件的列表
                    temps: new Array(),
                    // 课堂的名称
                    name: sheet.name,
                    // 一共有多少个学员
                    total: 0,
                    // 已经登陆过系统的数量
                    checked: 0,
                    // 已经完成签到的数量
                    signed: 0,
                    // 是否已经导出（存在对于的导出文件）
                    export: 0
                };

                let out_temp_item = {
                    // 学员列表
                    data: new Array(),
                    // 该临时文件的具体信息
                    info: {
                        // 数据来源那个文件
                        src: file.path,
                        // 属于哪个课堂
                        name: sheet.name,
                        // 一共有多少个学员在这里
                        total: 0,
                        // 已经登陆的数量
                        checked: 0,
                        // 已经签到的数量
                        signed: 0,
                        // 是否已经导出（存在对于的导出文件）
                        export: 0
                    }
                };

                sheet.data.length ? out_lession_item.temps.push(TempFileID) : 1;

                // 这里是一个课堂
                sheet.data.forEach((row, idx) => {

                    if (idx && row.length && row[rowKeywordIndex]) {

                        let student = new Object();

                        readKeys.forEach((key, ide) => {

                            student[key] = row[ide] || '';
                        });

                        student['id'] = this.DATA_ID_HEADER + String(++this.COM_DATA_INDEX);

                        out_temp_item.data.push(student);

                        out_temp_item.info.total++;

                        out_lession_item.total++;

                        if (out_temp_item.data.length >= APP_CONFIG.DB_TEMP_MAX_SIZE) {

                            let temp_url = PATH.join(this.BASE_ROOT, 'db', 'temps', TempFileID + '.json');

                            this.setFileContent(temp_url, out_temp_item);

                            TempFileID = this.TEMP_ID_HEADER + 'A' + String(++this.COM_TEMP_INDEX);

                            out_lession_item.temps.push(TempFileID);

                            this.setFileContent(PATH.join(this.BASE_ROOT, 'db', 'temps', TempFileID + '.json'), out_temp_item)

                            out_temp_item.data = [];

                            out_temp_item.info.total = 0;

                        }
                    }
                });

                out_temp_item.data.length ? this.setFileContent(PATH.join(this.BASE_ROOT, 'db', 'temps', TempFileID + '.json'), out_temp_item) : 0;

                out_file_item.lessionses.push(out_lession_item);

            });

            out_file_item.lessionses.length ? this.setFileContent(PATH.join(this.BASE_ROOT, 'db', 'files', out_file_item.id + '.json'), out_file_item) : 0;

        });
    }

    // 读取文件内容
    public getFileContent(path: string): object {

        if (FS.existsSync(path)) {

            let _res = FS.readFileSync(path, 'utf8');

            return _res ? JSON.parse(String(_res)) : undefined;

        } else {

            return this.setFileContent(path) || new Object();
        }
    }

    // 写入文件内容
    public setFileContent(path: string, content = new Object()) {

        FS.writeFileSync(path, JSON.stringify(content), 'utf8');
    }

    // 导出数据为表格文件
    public exportJSONToExcelFile(name: string, data: any[]) {

        let herf = PATH.join(this.BASE_ROOT, 'db', 'xlsx', name + '.xlsx');

        return XLS.write(herf, data);
    }

    // 生成写出表格文件的数据
    private buildSheetsDataForExport(data: any[], sheetname: string, keys: string[], values: string[]): any {

        let sheet = <any>{};

        sheet.name = sheetname;

        sheet.data = new Array();

        sheet.data.push(values);

        data.forEach((it, idx) => {

            let item = new Array();

            keys.forEach((k, i) => {

                item.push(it[k]);
            });

            sheet.data.push(item);

        });

        return sheet;
    }


    // 读取文件列表 --- files_list.json
    public GET_FILE_LIST(): any {

        let _path = PATH.join(this.BASE_ROOT, 'db', 'files_list.json');

        let _files_list = this.getFileContent(_path);

        if (!_files_list || !_files_list['push'] || !_files_list['length']) {

            let res = new Array();

            let _folder_path = PATH.join(this.BASE_ROOT, 'db', 'files');

            if (FS.existsSync(_folder_path) && FS.statSync(_folder_path).isDirectory()) {

                let files = FS.readdirSync(_folder_path);

                files.forEach((file, index) => {

                    let herf = PATH.join(_folder_path, file);

                    if (FS.statSync(herf).isFile() && PATH.parse(herf).ext === '.json') {

                        let res_file_src = FS.readFileSync(herf, 'utf8') || '[]';

                        let res_file = JSON.parse(res_file_src);

                        // 砍掉占空间的属性
                        delete res_file['lessionses'];

                        res.push(res_file);
                    }
                });

                this.setFileContent(_path, res);
            }

            return res;

        } else {

            return _files_list;
        }
    }

    // 写出文件列表 --- files_list.json
    public SET_FILE_LIST(data: object): any {

        let _path = PATH.join(this.BASE_ROOT, 'db', 'files_list.json');

        // 直接覆盖源数据
        return this.setFileContent(_path, data) || 1;
    }

    // 读取课堂列表
    public GET_LESSION_LIST(): any {

        let _path = PATH.join(this.BASE_ROOT, 'db', 'lession_list.json');

        let _lession_list = this.getFileContent(_path);

        if (!_lession_list || !_lession_list['push'] || !_lession_list['length']) {

            let res = new Array();

            let _folder_path = PATH.join(this.BASE_ROOT, 'db', 'files');

            if (FS.existsSync(_folder_path) && FS.statSync(_folder_path).isDirectory()) {

                let files = FS.readdirSync(_folder_path);

                files.forEach((file, index) => {

                    let herf = PATH.join(_folder_path, file);

                    if (FS.statSync(herf).isFile() && PATH.parse(herf).ext === '.json') {

                        let res_file_src = FS.readFileSync(herf, 'utf8') || '[]';

                        let res_file = JSON.parse(res_file_src);


                        res.push(...res_file['lessionses']);
                    }
                });

                this.setFileContent(_path, res);
            }

            return res;

        } else {

            return _lession_list;
        }
    }

    // 更新课堂列表
    public SET_LESSION_LIST(data: object): any {

        let _path = PATH.join(this.BASE_ROOT, 'db', 'lession_list.json');

        // 直接覆盖源数据
        return this.setFileContent(_path, data) || 1;
    }

    // 读取临时文件内容
    public GET_FILE_INFO(id: string): any {

        let herf = PATH.join(this.BASE_ROOT, 'db', 'files', id + '.json');

        return this.getFileContent(herf);
    }

    // 更新临时文件内容
    public SET_FILE_INFO(id: string, data: object) {

        let herf = PATH.join(this.BASE_ROOT, 'db', 'files', id + '.json');

        let res = this.getFileContent(herf);

        res = res ? res : new Object();

        // 合并数据而不是直接覆盖
        Object.assign(res, data);

        return this.setFileContent(herf, res) || res;
    }

    // 读取临时数据文件内容
    public GET_TEMP_INFO(id: string): any {

        let herf = PATH.join(this.BASE_ROOT, 'db', 'temps', id + '.json');

        return this.getFileContent(herf);
    }

    // 更新临时数据文件内容
    public SET_TEMP_INFO(id: string, data: object) {

        let herf = PATH.join(this.BASE_ROOT, 'db', 'temps', id + '.json');

        let res = this.getFileContent(herf);

        res = res ? res : new Object();

        // 合并数据而不是直接覆盖
        Object.assign(res, data);

        return this.setFileContent(herf, res) || res;
    }

    // 将临时数据文件导出为表格文件
    public EXPORT_TEMP_TO_XLS(id: string, option?: object): boolean {

        let res = this.GET_TEMP_INFO(id);

        if (res && res.data && res.data.length) {

            let _option = {
                addMode: false,                                // 追加模式：如果同名（id已存在）是否要合并（追加）为一个文件
                sheetName: 'sheet',                            // 默认的表名 
                keys: EXPORT_CONF.EXCEL_HEADER[0].keys,        // 默认的变量名（表头索引）
                values: EXPORT_CONF.EXCEL_HEADER[0].values     // 默认的变量值（表头）
            };

            Object.assign(_option, option);

            let sheets = new Array();

            if (_option.addMode) {

                let herf = PATH.join(this.BASE_ROOT, 'db', 'xlsx', id + '.xlsx');

                sheets = FS.existsSync(herf) ? XLS.read(herf) : sheets;
            }

            let sheet = this.buildSheetsDataForExport(res.data, _option.sheetName, _option.keys, _option.values);

            sheets.push(sheet);

            res.info.export = 1;

            return this.exportJSONToExcelFile(id, sheets) && this.SET_TEMP_INFO(id, res) ? true : false;

        } else {

            return false;
        }

    }

    // 读取用户表
    // public GET_USER_DATA(): any {

    //     let href = PATH.join(this.BASE_ROOT, 'db', 'users.json');

    //     let res = this.getFileContent(href);

    //     if (!res || !res['root']) {

    //         res = { root: { username: 'root', password: T.md5('root@123') } };

    //         this.SET_USER_DATA(res);
    //     }

    //     return res;

    // }

    // 更新用户表
    // public SET_USER_DATA(data: object): any {

    //     let href = PATH.join(this.BASE_ROOT, 'db', 'users.json');

    //     let res = this.getFileContent(href);

    //     res['root'] = res['root'] || { username: 'root', password: T.md5('root@123') };

    //     Object.assign(res, data);

    //     return this.setFileContent(href, res) ? res : undefined;
    // }

    // 清理文件夹 
    public CLEAR_FOLDER(path: string, flag = false) {

        if (FS.existsSync(path) && FS.statSync(path).isDirectory()) {

            let files = FS.readdirSync(path);

            for (let file of files) {

                let url = PATH.join(path, file);

                if (FS.statSync(url).isDirectory()) {

                    flag ? this.CLEAR_FOLDER(url) : 0;

                } else {

                    FS.unlinkSync(url);
                }
            }

        } else {

            return false;
        }

    }

    // 清理文件
    public CLEAR_FILES(path: string) {

        path && FS.existsSync(path) && FS.statSync(path).isFile() ? FS.unlinkSync(path) : 0;
    }


}

// 读取到的表格文件格式
export interface EFile {
    path: string,
    stat: FS.Stats,
    sheets: Array<any>
}

export interface FAPImp {

    root: {
        username: string;
        password: string;
    }

    users?: Array<{ username: string; password: string; }>
}