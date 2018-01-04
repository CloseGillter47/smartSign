import * as FS from "fs";
import * as PATH from "path";

import { Excel, Sheet } from "./xlsx";
import * as Tool from "./util";

const XLS = Excel.FACTORY();


export class KurokoCore {

    constructor() {

    }

    public export_conf: any;

    private init() {

        let temp_conf = {
            "ONLY_ONE_HEADER": true,
            "EXCEL_HEADERS": [
                {
                    "name": "system",
                    "keyword": "No",
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

        this.export_conf = Tool.GetFile(PATH.join(Tool.getPath('conf'), 'export.conf.json'), true, false) || temp_conf;


    }

    /**
     * 将对象导出为表格文件
     */
    public JSONToEXCEL(Sheets: Sheet[], ) {

    }

    /**
     * 将表格文件解析为对象
     */
    public EXCELTOJSON() {

    }
} 