// 引入 express 组件
import { NextFunction, Response, Request, Router } from "express";

import { AdminModel } from "../models/admin";
import { Admin } from "../interfaces/admin";
import { Message } from "../interfaces/message";
import { MessageModel as Mes } from "../models/message";

// model

/**
 * @class HerosApi
 */
export class AdminApi {

    /**
     * 创建 api.
     * @static
     */
    public static create(router: Router) {

        // 用于管理员登录
        // 管理员登录 接收管理员对象{name:string,password:string,tooken:string}
        router.post("/admin/login", (req: Request, res: Response, next: NextFunction) => {
            new AdminApi().login(req, res, next);
        });

        // 用于管理员注销
        // 管理员登录 接收管理员对象{name:string,password:string,tooken:string}
        router.post("/admin/logout", (req: Request, res: Response, next: NextFunction) => {
            new AdminApi().logout(req, res, next);
        });

        // 用于新增管理员 (非root对象)
        // 新增管理员 接收管理员对象{name:string,password:string}
        router.post("/add/admin", (req: Request, res: Response, next: NextFunction) => {
            new AdminApi().add(req, res, next);
        });

        // 用于新增管理员 (非root对象)
        // 新增管理员 接收管理员对象{name:string,password:string}
        router.post("/del/admin", (req: Request, res: Response, next: NextFunction) => {
            new AdminApi().delete(req, res, next);
            next();
        });

        // 用于管理员更新信息 (一般是密码)
        // 更新管理员信息 接收管理员对象{name:string,password:string,id:string}
        router.post("/update/admin", (req: Request, res: Response, next: NextFunction) => {
            new AdminApi().update(req, res, next);
            next();
        });

        // 用于新增管理员 (非root对象)
        // 新增管理员 接收管理员对象{name:string,password:string}
        router.post("/find/admin", (req: Request, res: Response, next: NextFunction) => {
            new AdminApi().find(req, res, next);
            next();
        });

        // 用于管理员重置系统 (root对象)
        // 重置系统 接收管理员对象{name:string,password:string}
        router.post("/admin/sys/reset", (req: Request, res: Response, next: NextFunction) => {
            new AdminApi().reset(req, res, next);
            next();
        });

        // 用于管理员设置导出格式 
        // 设置导出格式 接收管理员对象{name:string,password:string,option:object}
        router.post("/admin/sys/export", (req: Request, res: Response, next: NextFunction) => {
            new AdminApi().iexport(req, res, next);
            next();
        });

        // 用于管理员导出班级学员信息 
        // 导出班级学员信息 接收管理员对象{name:string,password:string,id:string}
        router.post("/admin/export/class", (req: Request, res: Response, next: NextFunction) => {
            new AdminApi().exportClass(req, res, next);
            next();
        });

        // 用于管理员导出某些学员信息
        // 导出某些学员信息 接收管理员对象{name:string,password:string,ids:[string,...]}
        router.post("/admin/export/students", (req: Request, res: Response, next: NextFunction) => {
            new AdminApi().exportStudents(req, res, next);
            next();
        });

        // 用于管理员上传文件 
        // 上传表格文件 接收管理员对象{name:string,password:string,option:object}
        router.post("/admin/file/upload", (req: Request, res: Response, next: NextFunction) => {
            new AdminApi().upload(req, res, next);
            next();
        });

        // 用于管理员下载文件 
        // 下载导出表格文件 接收管理员对象{name:string,password:string,fileid:string,option:object}
        router.post("/admin/file/download", (req: Request, res: Response, next: NextFunction) => {
            new AdminApi().download(req, res, next);
            next();
        });
    }

    protected adminModel: AdminModel;

    constructor() {
        this.adminModel = new AdminModel();
    }

    public login(req: Request, res: Response, next: NextFunction) {

        let admin: Admin = req.body.admin;

        let _admin = this.adminModel.findAdmin(admin);

        if (_admin !== null) {

            if (admin.username === _admin.username && admin.password === _admin.password) {

                let iadmin = <Admin>{};

                Object.assign(iadmin, _admin);

                delete iadmin.password;

                res.send(new Mes({ admin: iadmin, tooken: new Date() }, "登录成功", 200).result());

            } else {

                res.send(new Mes({}, "管理员登录名或登录密码不匹配", 402).result());
            }

        } else {

            res.send(new Mes({}, "找不到相关管理员的数据", 401).result());

        }

    }

    public logout(req: Request, res: Response, next: NextFunction) {

    }

    public add(req: Request, res: Response, next: NextFunction) {
        // 创建
        let admin: Admin = req.body.admin;

        let _admines = this.adminModel.addAdmin(admin);

        if (_admines !== null) {

            let _admin = this.adminModel.findAdmin(admin);

            if (_admin !== null) {

                delete _admin.password;

                res.send(new Mes({ admin: _admin }, "注册成功", 200).result());

            } else {

                res.send(new Mes({}, "注册失败", 501).result());
            }

        } else {

            res.send(new Mes({}, "管理员登录名已存在", 402).result());
        }


    }

    public delete(req: Request, res: Response, next: NextFunction) {

        let admin: Admin = req.body.admin;

        let _admin = this.adminModel.findAdmin(admin);

        if (_admin !== null) {

            let _admines = this.adminModel.delAdmin(_admin);

            if (_admines !== null) {

                res.send(new Mes({}, "删除成功", 200).result());

            } else {

                res.send(new Mes({}, "删除失败", 501).result());
            }

        } else {

            res.send(new Mes({}, "找不到相关管理员的数据", 401).result());
        }

    }

    public list(req: Request, res: Response, next: NextFunction) {

        let _admines = this.adminModel.getAdmines();

        if (_admines) {

            for (let _ad of _admines) {

                delete _admines.password;
            }

            res.send(new Mes({ list: _admines }, "请求成功", 200).result());

        } else {

            res.send(new Mes({}, "找不到数据", 501).result());
        }
    }

    public find(req: Request, res: Response, next: NextFunction) {

        let admin = req.body.admin;

        let _admin = this.adminModel.findAdmin(admin);

        if (_admin !== null) {

            res.send(new Mes({ admin: _admin }, "请求成功", 200).result());

        } else {

            res.send(new Mes({}, "找不到数据", 401).result());
        }
    }

    public reset(req: Request, res: Response, next: NextFunction) {

    }

    public iexport(req: Request, res: Response, next: NextFunction) {

    }

    public exportClass(req: Request, res: Response, next: NextFunction) {

    }

    public exportStudents(req: Request, res: Response, next: NextFunction) {

    }

    public upload(req: Request, res: Response, next: NextFunction) {

    }

    public download(req: Request, res: Response, next: NextFunction) {

    }

    public update(req: Request, res: Response, next: NextFunction) {

        let admin: Admin = req.body.admin;

        let _admines = this.adminModel.updateAdmin(admin);

        if (_admines !== null) {

            let _admin = this.adminModel.findAdmin(admin);

            if (_admin !== null) {

                res.send(new Mes({}, "更新数据成功", 200).result());
            } else {

                res.send(new Mes({}, "更新数据后找不到对象", 501).result());
            }

        } else {

            res.send(new Mes({}, "找不到相关管理员的数据", 401).result());
        }
    }

}
