// 引入 express 组件
import { NextFunction, Response, Request, Router } from "express";

// model

/**
 * @class HerosApi
 */
export class StudentApi {

    /**
     * 创建 api.
     * @static
     */
    public static create(router: Router) {

        // 用于管理员登录
        // 管理员登录 接收管理员对象{name:string,password:string,tooken:string}
        router.post("/admin/login", (req: Request, res: Response, next: NextFunction) => {
            new StudentApi().add(req, res, next);
        });

        // 用于管理员注销
        // 管理员登录 接收管理员对象{name:string,password:string,tooken:string}
        router.post("/admin/logout", (req: Request, res: Response, next: NextFunction) => {
            new StudentApi().add(req, res, next);
        });

        // 用于新增管理员 (非root对象)
        // 新增管理员 接收管理员对象{name:string,password:string}
        router.post("/add/admin", (req: Request, res: Response, next: NextFunction) => {
            new StudentApi().add(req, res, next);
        });

        // 用于新增管理员 (非root对象)
        // 新增管理员 接收管理员对象{name:string,password:string}
        router.post("/del/admin", (req: Request, res: Response, next: NextFunction) => {
            new StudentApi().add(req, res, next);
        });

        // 用于管理员更新信息 (一般是密码)
        // 更新管理员信息 接收管理员对象{name:string,password:string,id:string}
        router.post("/update/admin", (req: Request, res: Response, next: NextFunction) => {
            new StudentApi().add(req, res, next);
        });

        // 用于新增管理员 (非root对象)
        // 新增管理员 接收管理员对象{name:string,password:string}
        router.post("/find/admin", (req: Request, res: Response, next: NextFunction) => {
            new StudentApi().add(req, res, next);
        });

        // 用于管理员重置系统 (root对象)
        // 重置系统 接收管理员对象{name:string,password:string}
        router.post("/admin/sys/reset", (req: Request, res: Response, next: NextFunction) => {
            new StudentApi().add(req, res, next);
        });

        // 用于管理员设置导出格式 
        // 设置导出格式 接收管理员对象{name:string,password:string,option:object}
        router.post("/admin/sys/export", (req: Request, res: Response, next: NextFunction) => {
            new StudentApi().add(req, res, next);
        });

        // 用于管理员导出班级学员信息 
        // 导出班级学员信息 接收管理员对象{name:string,password:string,id:string}
        router.post("/admin/export/class", (req: Request, res: Response, next: NextFunction) => {
            new StudentApi().add(req, res, next);
        });

        // 用于管理员导出某些学员信息
        // 导出某些学员信息 接收管理员对象{name:string,password:string,ids:[string,...]}
        router.post("/admin/export/students", (req: Request, res: Response, next: NextFunction) => {
            new StudentApi().add(req, res, next);
        });

        // 用于管理员上传文件 
        // 上传表格文件 接收管理员对象{name:string,password:string,option:object}
        router.post("/admin/file/update", (req: Request, res: Response, next: NextFunction) => {
            new StudentApi().add(req, res, next);
        });

        // 用于管理员下载文件 
        // 下载导出表格文件 接收管理员对象{name:string,password:string,fileid:string,option:object}
        router.post("/admin/file/download", (req: Request, res: Response, next: NextFunction) => {
            new StudentApi().add(req, res, next);
        });
    }

    public add(req: Request, res: Response, next: NextFunction) {
        // 创建

    }

    public delete(req: Request, res: Response, next: NextFunction) {

    }


    public get(req: Request, res: Response, next: NextFunction) {

    }


    public list(req: Request, res: Response, next: NextFunction) {

    }


    public update(req: Request, res: Response, next: NextFunction) {
    }

}
