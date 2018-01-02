// 引入 express 组件
import { NextFunction, Response, Request, Router } from "express";

// model

/**
 * @class HerosApi
 */
export class FilesApi {

    /**
     * 创建 api.
     * @static
     */
    public static create(router: Router) {

        // 注册路由

        // 用于获取班级列表
        // 管理员获取班级列表 接收管理员对象{name:string,tooken:string}
        router.post("/class/list", (req: Request, res: Response, next: NextFunction) => {
            new FilesApi().add(req, res, next);
        });

        // 用于获取班级信息
        // 管理员获取班级信息 接收管理员对象{name:string,tooken:string,lessionId:string}
        router.post("/class/find", (req: Request, res: Response, next: NextFunction) => {
            new FilesApi().add(req, res, next);
        });

        // 用于更新班级信息
        // 管理员更新班级信息 接收管理员对象{name:string,tooken:string,fileIds:[string,...]}
        router.post("/class/update", (req: Request, res: Response, next: NextFunction) => {
            new FilesApi().add(req, res, next);
        });

        // 用于删除过期班级
        // 管理员删除班级 接收管理员对象{name:string,tooken:string,fileIds:[string,...]}
        router.post("/class/delete", (req: Request, res: Response, next: NextFunction) => {
            new FilesApi().add(req, res, next);
        });

        // 用于新增新班级
        // 管理员导开设新班级 接收管理员对象{name:string,tooken:string,lession:{name:string,...}}
        router.post("/class/add", (req: Request, res: Response, next: NextFunction) => {
            new FilesApi().add(req, res, next);
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
