import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as express from "express";
import * as morgan from "morgan";
import * as path from "path";
import errorHandler = require("errorhandler");

// 引入后台接口
import { AdminApi } from "./api/admin";

export class Server {

  public app: express.Application;

  // 启动后台
  public static bootstrap(): Server {
    return new Server();
  }

  /**
   * @constructor
   */
  constructor() {
    // 创建 Express 实例
    this.app = express();

    // 配置程序
    this.config();

    // 添加后台接口
    this.api();
  }


  public api() {
    var router = express.Router();

    // 配置 CORS 跨域
    const corsOptions: cors.CorsOptions = {
      allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
      credentials: true,
      methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
      origin: "http://localhost:4200",
      preflightContinue: false
    };
    router.use(cors(corsOptions));

    // 最原始的请求
    router.get("/", (req: express.Request, res: express.Response, next: express.NextFunction) => {
      res.json({ announcement: "Welcome to our API." });
      next();
    });

    // 创建 API 路由
    AdminApi.create(router);

    // 挂载 REST API
    this.app.use("/api", router);

    // 启用 CORS pre-flight
    router.options("*", cors(corsOptions));
  }


  public config() {
    // 使用 morgan 插件记录请求
    this.app.use(morgan("dev"));

    // bodyParser 插件使用JSON格式
    this.app.use(bodyParser.json());

    //use query string parser middlware
    this.app.use(bodyParser.urlencoded({
      extended: true
    }));

    // 出现错误时，以404返回给客户端
    this.app.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
      err.status = 404;
      next(err);
    });

    // 处理异常
    this.app.use(errorHandler());
  }
}