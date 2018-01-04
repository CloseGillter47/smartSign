import * as PATH from "path";
import * as FS from "fs";

/**
 * 读取文件
 * @param url 文件绝对路径
 * @param json 是否以json格式返回 默认 true 以json格式返回 (返回的是对象)
 * @param strict 严格模式，(不存在的文件不会新建) 默认false 
 */
export function GetFile(url: string, json?: boolean, strict?: boolean): any {

    json = !json || json;

    strict = false || strict;

    if (FS.existsSync(url)) {

        let _res = FS.readFileSync(url, 'utf8');

        return json ? JSON.parse(_res) : _res;

    } else {

        if (!strict) {
            // 非严格模式，写入新文件

            json ? FS.writeFileSync(url, JSON.stringify({}), 'utf8') : FS.writeFileSync(url, "", 'utf8');

            return json ? {} : "";

        } else {
            // 严格模式，不能写入文件

            return json ? null : "";
        }
    }

}

/**
 * 写入文件
 * @param url 文件绝对路径
 * @param data 写入的内容
 * @param json 传入的是否为json格式 默认 true 
 * @param strict 严格模式，(不存在的文件不会新建) 默认false 
 */
export function SetFile(url: string, data: any, json?: boolean, strict?: boolean) {

    json = !json || json;

    strict = false || strict;

    if (FS.existsSync(url)) {

        json ? FS.writeFileSync(url, JSON.stringify(data), 'utf8') : FS.writeFileSync(url, data, 'utf8');

    } else {

        if (!strict) { json ? FS.writeFileSync(url, JSON.stringify(data), 'utf8') : FS.writeFileSync(url, data, 'utf8') }
    }

}

/**
 * 获取数据文件夹的文件路径
 * @param param 数据文件夹下的文件
 */
export function getPath(param: string) {

    let _base_root = PATH.resolve(__filename, "../../..");

    return PATH.join(_base_root, 'dat', param);
}

/**
 * 将日期对象转换为需要的格式
 * @param idate 需要格式化的日期或日期类型的字符串
 * @param itype 输出的格式，共有["date","number","numbercut"]，默认 "date"
 * @param isize 需要剪裁的长度（保留的长度）默认14
 * @param spacer 日期的连接线 如：2017/12/25 默认是 "/"
 */
export function dateToLocalString(date?: string | Date, type?: string, size?: number, spacer = "/") {

    type = type || "date";

    size = size || 14;

    let _date = date ? new Date(date.toString()) : new Date();

    let _time = _date.getTime();

    // 北京时间 +8小时 8*60*60*1000
    _date.setTime(_time + 28800000);

    // 2017-12-25T09:17:19.211Z
    let _dateString = _date.toJSON();

    // 2017/12/25T09:17:19.211Z
    _dateString = _dateString.replace(/\-/g, spacer);

    // 2017/12/25 09:17:19.211Z
    _dateString = _dateString.replace(/[a-zA-Z](?!$)/g, " ");

    switch (type) {
        // 2017/12/25 09:17:19.211
        case "date":
            return _dateString.replace(/[a-zA-Z]/g, "");
        // 20171225091719211
        case "number":
            return _dateString.replace(/[a-zA-Z]/g, "").replace(/\W/g, "");

        // 20171225091719
        case "numbercut":
            return _dateString.replace(/[a-zA-Z]/g, "").replace(/\W/g, "").substr(0, size);

        // 2017-12-25T09:17:19.211Z
        default:

            return _date.toJSON();
    }
}