// 引入 express 组件
import { NextFunction, Response, Request, Router } from "express";

// model
import { FilesModel } from "../models/files";
import { MessageModel as Mes } from "../models/message";


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

        // 用于获取文件列表
        // 管理员获取已录入的文件列表 接收管理员对象{name:string,tooken:string}
        router.post("/files/list", (req: Request, res: Response, next: NextFunction) => {
            new FilesApi().list(req, res, next);
            next();
        });

        // 用于获取文件信息
        // 管理员获取已录入的文件信息 接收管理员对象{name:string,tooken:string,fileId:string}
        router.post("/files/find", (req: Request, res: Response, next: NextFunction) => {
            new FilesApi().find(req, res, next);
            next();
        });

        // 用于文件解析录入系统
        // 管理员录入文件 接收管理员对象{name:string,tooken:string,fileIds:[string,...]}
        router.post("/files/paser", (req: Request, res: Response, next: NextFunction) => {
            new FilesApi().paser(req, res, next);
            next();
        });

        // 用于文件再导出
        // 管理员导出文件 接收管理员对象{name:string,tooken:string,fileIds:[string,...]}
        router.post("/files/export", (req: Request, res: Response, next: NextFunction) => {
            new FilesApi().exports(req, res, next);
            next();
        });


    }

    public static filesModel = new FilesModel();

    public list(req: Request, res: Response, next: NextFunction) {

        let filelist = FilesApi.filesModel.getList();

        if (filelist) {

            res.send(new Mes({}, "请求数据成功", 200).result());

        } else {

            res.send(new Mes({}, "找不到数据", 501).result());

        }

    }

    public find(req: Request, res: Response, next: NextFunction) {

        let _file = req.body.file;

        let ifile = FilesApi.filesModel.getFileInfo(_file.fileId);

        if (ifile !== null) {

            res.send(new Mes({ file: ifile }, "请求数据成功", 200).result());

        } else {

            res.send(new Mes({}, "找不到相关数据", 401).result());
        }


    }

    public paser(req: Request, res: Response, next: NextFunction) {
        // 凡是已将上传的文件都会存在一个文件id，然后根据id，将文件解析，一个文件只能解析一次，同一个文件想解析多次只能多次上传

    }

    public exports(req: Request, res: Response, next: NextFunction) {
        // 获取该文件下的所有班级的id，然后根据id去找到相应的学员然后导出文件，最后将文件返回

        let _file = req.body.file;

        let ifile = FilesApi.filesModel.getFileInfo(_file.fileId);

        if (ifile !== null) {

            let lessionIds = ifile.lessiones;

            


        } else {

            res.send(new Mes({}, "找不到相关数据", 401).result());
        }



    }
}
