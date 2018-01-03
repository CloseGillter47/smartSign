import { Message } from "../interfaces/message";

export class MessageModel implements Message {

    public data: any;

    public message: string;

    public success: boolean;

    public status: number;

    constructor(data: any, message: string, status: number) {
        this.setData(data).setStatus(status).setMessage(message);
    }

    public setData(data: any) {
        this.data = data;
        return this;
    }

    public setStatus(status: number) {

        this.status = status;

        if (status >= 500) {

            this.message = "[服务器错误]：";

            this.success = false;

            return this;
        }

        if (status > 400 && status < 500) {

            this.message = "[请求错误]：";

            this.success = false;

            return this;
        }

        if (status >= 200 && status < 300) {

            this.message = "[请求成功]：";

            this.success = true;

            return this;
        }
    }

    public setMessage(message: string) {
        this.message += message;
        return this;
    }

    public result() {
        return { data: this.data, message: this.message, success: this.success, status: this.status };
    }

}