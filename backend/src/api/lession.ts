// 引入 express 组件
import { NextFunction, Response, Request, Router } from "express";

import { LessionModel } from "../models/lession";
import { MessageModel as Mes } from "../models/message";
import { Lession } from "../interfaces/lession";


// model

/**
 * @class HerosApi
 */
export class LessionApi {

    /**
     * 创建 api.
     * @static
     */
    public static create(router: Router) {

        // 注册路由

        // 用于获取班级列表
        // 管理员获取班级列表 接收管理员对象{name:string,tooken:string}
        router.post("/class/list", (req: Request, res: Response, next: NextFunction) => {
            new LessionApi().list(req, res, next);
            next();
        });

        // 用于获取班级信息
        // 管理员获取班级信息 接收管理员对象{name:string,tooken:string,lessionId:string}
        router.post("/class/find", (req: Request, res: Response, next: NextFunction) => {
            new LessionApi().find(req, res, next);
            next();
        });

        // 用于更新班级信息
        // 管理员更新班级信息 接收管理员对象{name:string,tooken:string,fileIds:[string,...]}
        router.post("/class/update", (req: Request, res: Response, next: NextFunction) => {
            new LessionApi().update(req, res, next);
            next();
        });

        // 用于删除过期班级
        // 管理员删除班级 接收管理员对象{name:string,tooken:string,fileIds:[string,...]}
        router.post("/class/delete", (req: Request, res: Response, next: NextFunction) => {
            new LessionApi().delete(req, res, next);
            next();
        });

        // 用于新增新班级
        // 管理员导开设新班级 接收管理员对象{name:string,tooken:string,lession:{name:string,...}}
        router.post("/class/add", (req: Request, res: Response, next: NextFunction) => {
            new LessionApi().add(req, res, next);
            next();
        });


    }

    private lessionModel: LessionModel;

    constructor() {

        this.lessionModel = new LessionModel();
    }

    public list(req: Request, res: Response, next: NextFunction) {

        let _list = this.lessionModel.getList();

        if (_list) {

            res.send(new Mes({ list: _list }, "请求成功", 200).result());

        } else {

            res.send(new Mes({}, "找不到数据", 501).result());
        }

    }

    public find(req: Request, res: Response, next: NextFunction) {

        let lession = req.body.lession;

        let _lession = this.lessionModel.getLession(lession.id);

        if (_lession !== null) {

            res.send(new Mes({ lession: _lession }, "请求成功", 200).result());

        } else {

            res.send(new Mes({}, "找不到相关数据", 501).result());

        }

    }

    public update(req: Request, res: Response, next: NextFunction) {

        let lession = req.body.lession;

        let _lessiones = this.lessionModel.setLession(lession.id, lession);

        if (_lessiones !== null) {

            let _lession = this.lessionModel.getLession(lession.id);

            if (_lession !== null) {

                res.send(new Mes({ lession: _lession }, "更新成功", 200).result());

            } else {

                res.send(new Mes({ lession: _lession }, "更新数据后找不到对象", 502).result());
            }

        } else {

            res.send(new Mes({}, "找不到相关数据", 401).result());

        }
    }

    public add(req: Request, res: Response, next: NextFunction) {

        let lession: Lession = req.body.lession;

        let _lessiones = this.lessionModel.addLession(lession);

        if (_lessiones) {

            res.send(new Mes({ list: _lessiones }, "添加成功", 200).result());

        } else {

            res.send(new Mes({}, "添加失败", 501).result());
        }

    }

    public delete(req: Request, res: Response, next: NextFunction) {

        let lession: Lession = req.body.lession;

        let _lession = this.lessionModel.getLession(lession.id);

        if (_lession !== null) {

            let _lessiones = this.lessionModel.delLession(lession.id);

            if (_lessiones !== null) {

                res.send(new Mes({}, "删除成功", 200).result());

            } else {

                res.send(new Mes({}, "删除失败", 501).result());
            }

        } else {

            res.send(new Mes({}, "找不到相关的数据", 401).result());
        }
    }

}
