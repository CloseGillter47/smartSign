import * as PATH from "path";

import * as Util from "../utils/util";

import { Admin } from "../interfaces/admin";


export class AdminModel {

    private Admines: Array<Admin>;

    private BASE_ROOT: string;

    constructor() {

        this.BASE_ROOT = Util.getPath("admin");

        this.getAdmines();
    }

    /**
     * 读取管理员配置文件
     */
    public getAdmines() {

        let admines = this.Admines = Util.GetFile(PATH.join(this.BASE_ROOT, 'main.json'), true, false);

        return admines;
    }

    /**
     * 写入管理员配置文件
     * @param list 写入的内容
     */
    private setAdmines(list: Array<Admin>) {

        return Util.SetFile(PATH.join(this.BASE_ROOT, 'index.json'), list, true, false) || this.getAdmines();
    }

    /**
     * 添加管理员到配置文件中
     * @param admin 管理员信息
     */
    public addAdmin(admin: Admin) {

        this.Admines = this.Admines || Util.GetFile(PATH.join(this.BASE_ROOT, 'main.json'), true, false);

        // 限制同名用户
        for (let _admin of this.Admines) {

            if (_admin.username === admin.username) { return null }
        }

        let newId = Util.dateToLocalString(new Date(), "numbercut", 10);

        newId !== this.Admines[this.Admines.length].id ? newId : ~~this.Admines[this.Admines.length].id + 1;

        Object.assign(admin, { id: newId });

        this.Admines.push(admin);

        return this.setAdmines(this.Admines);
    }

    /**
     * 删除管理员
     * @param admin 非root用户
     */
    public delAdmin(admin: Admin) {

        for (let _idx in this.Admines) {

            if (this.Admines[_idx].id === admin.id) {

                this.Admines.splice(~~_idx, 1);

                return this.setAdmines(this.Admines);
            }
        }

        return null;

    }

    /**
     * 查询管理员
     * @param admin 需要查询的管理员
     */
    public findAdmin(admin: Admin) {

        for (let _admin of this.Admines) {

            if (_admin.username === admin.username || _admin.id === _admin.id) {

                return _admin;
            }
        }

        return null;
    }

    /**
     * 更新管理员
     * @param admin 需要更新的管理员
     */
    public updateAdmin(admin: Admin) {

        for (let _idx in this.Admines) {

            if (this.Admines[_idx].id === admin.id) {

                this.Admines[_idx] = admin;

                return this.setAdmines(this.Admines);
            }
        }

        return null;
    }
}