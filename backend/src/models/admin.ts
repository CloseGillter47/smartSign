import * as PATH from "path";
import * as _ from "lodash";

import * as Util from "../utils/util";


export class AdminModel {

    private Admines: Array<any>;

    private BASE_ROOT: string;

    constructor() {

        this.BASE_ROOT = Util.getPath("admin");

        this.getAdmines();
    }

    /**
     * 读取管理员配置文件
     */
    private getAdmines() {

        let admines = this.Admines = Util.GetFile(PATH.join(this.BASE_ROOT, 'main.json'), true, false);

        return admines;
    }

    /**
     * 写入管理员配置文件
     * @param list 写入的内容
     */
    private setAdmines(list: any) {

        return Util.SetFile(PATH.join(this.BASE_ROOT, 'index.json'), list, true, false) || this.getAdmines();
    }

    /**
     * 添加管理员到配置文件中
     * @param admin 管理员信息
     */
    public addAdmin(admin: any) {

        this.Admines = this.Admines || Util.GetFile(PATH.join(this.BASE_ROOT, 'main.json'), true, false);

        let newId = ~~this.Admines[this.Admines.length].id + 1;

        Object.assign(admin, { id: newId });

        this.Admines.push(admin);

        return this.setAdmines(this.Admines);
    }

    /**
     * 删除管理员
     * @param admin 非root用户
     */
    public delAdmin(admin: any) {

        for (let _idx in this.Admines) {

            if (this.Admines[_idx].id === admin.id) {

                this.Admines.splice(~~_idx, 1);

                return this.setAdmines(this.Admines);
            }
        }

    }

    /**
     * 查询管理员
     * @param admin 需要查询的管理员
     */
    public findAdmin(admin: any) {

        for (let _admin of this.Admines) {

            if (_admin.username === admin.username || _admin.id === _admin.id) {

                return _admin;
            }
        }
    }

    /**
     * 更新管理员
     * @param admin 需要更新的管理员
     */
    public updateAdmin(admin: any) {

        for (let _admin of this.Admines) {

            if (_admin.username === admin.username || _admin.id === _admin.id) {

                
                return _admin;
            }
        }
    }
}