// 引入 express 组件
import { NextFunction, Response, Request, Router } from "express";

import { StudentModel } from "../models/student";
import { MessageModel as Mes } from "../models/message";

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

        // 注册路由

        // 用于管理员查看学员的签到状态
        // 获取学员们 接收班级{id:string,name:string,...}
        router.get("/get/students", (req: Request, res: Response, next: NextFunction) => {
            new StudentApi().list(req, res, next);
        });

        // 用于学员检索登录
        // 获取学员 接收学员对象{name:string,classId:string}
        router.post("/get/student", (req: Request, res: Response, next: NextFunction) => {
            new StudentApi().find(req, res, next);
        });

        // 用于管理员临时添加学员 (永久添加)
        // 新增学员 接收学员对象{name:string,pinyin:string}
        router.post("/add/students", (req: Request, res: Response, next: NextFunction) => {
            new StudentApi().add(req, res, next);
        });

        // 用于管理员临时删除学员 (永久删除)
        // 删除学员 接收学员对象列表[{id:string,name:string,pinyin:string,...},...]
        router.post("/del/students", (req: Request, res: Response, next: NextFunction) => {
            new StudentApi().delete(req, res, next);
        });

        // 用于学员提交签到信息 (永久更新)
        // 更新学员 接收学员对象{id:string,name:string,pinyin:string,...}
        router.post("/update/student", (req: Request, res: Response, next: NextFunction) => {
            new StudentApi().update(req, res, next);
        });

    }

    constructor() {

    }

    public add(req: Request, res: Response, next: NextFunction) {

        let _student = req.body.student;

        let _lessionId = req.body.lessionid;

        let _studentModel = new StudentModel(_lessionId);

        let _studentes = _studentModel.getList();

        if (_studentes) {

            let _istudentes = _studentModel.addStudent(_student);

            if (_istudentes) {

                res.send(new Mes({ students: _istudentes }, "添加成功", 200).result());

            } else {

                res.send(new Mes({}, "添加失败", 401).result());

            }

        } else {

            res.send(new Mes({}, "请求失败，找不到相关数据", 401).result());
        }

    }

    public delete(req: Request, res: Response, next: NextFunction) {

        let _student = req.body.student;

        let _lessionId = req.body.lessionid;

        let _studentModel = new StudentModel(_lessionId);

        let _studentes = _studentModel.getList();

        if (_studentes) {

            let _istudentes = _studentModel.delStudent(_student);

            if (_istudentes) {

                res.send(new Mes({ students: _istudentes }, "删除成功", 200).result());

            } else {

                res.send(new Mes({}, "删除失败", 401).result());

            }

        } else {

            res.send(new Mes({}, "请求失败，找不到相关数据", 401).result());
        }

    }


    public find(req: Request, res: Response, next: NextFunction) {

        let _lessionId = req.body.lessionid;

        let _studentModel = new StudentModel(_lessionId);

        let _studentes = _studentModel.getList();

        if (_studentes) {

            res.send(new Mes({ students: _studentes }, "添加成功", 200).result());

        } else {

            res.send(new Mes({}, "请求失败，找不到相关数据", 401).result());
        }

    }


    public list(req: Request, res: Response, next: NextFunction) {

        let _lessionId = req.body.lessionid;

        let _studentModel = new StudentModel(_lessionId);

        let _studentes = _studentModel.getList();

        if (_studentes) {

            res.send(new Mes({ students: _studentes }, "添加成功", 200).result());

        } else {

            res.send(new Mes({}, "请求失败，找不到相关数据", 401).result());
        }
    }


    public update(req: Request, res: Response, next: NextFunction) {

    }

}
