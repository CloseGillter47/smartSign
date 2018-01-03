import { iFiles as FilesList, iFile as FileDetail } from "../interfaces/files";
import * as PATH from "path";

import * as Util from "../utils/util";

export class FilesModel {

    public filesList: FileDetail[];

    private BASE_ROOT: string;

    constructor() {

        this.BASE_ROOT = Util.getPath("files");

        this.getList();
    }

    public getList() {

        let list = this.filesList = Util.GetFile(PATH.join(this.BASE_ROOT, 'index.json'), true, false);

        return list;
    }

    public setList(list: FileDetail[]) {

        return Util.SetFile(PATH.join(this.BASE_ROOT, 'index.json'), list, true, false) || this.getList();
    }

    public getFileInfo(fileId: string) {

        for (let _file of this.filesList) {

            if (_file.fileId === fileId) {

                return _file;
            }
        }

        return null;

    }

    public setFileInfo(fileId: string, data: any) {

        for (let _file of this.filesList) {

            if (_file.fileId === fileId) {

                _file = data;

                return this.setList(this.filesList);
            }
        }

        return null;
    }

    public addFileInfo(file: FileDetail) {

        let newId = Util.dateToLocalString(new Date(), "numbercut", 14);

        newId !== this.filesList[this.filesList.length].fileId ? newId : ~~(this.filesList[this.filesList.length].fileId) + 1;

        Object.assign(file, { id: newId });

        this.filesList.push(file);

        return this.setList(this.filesList);

    }

    public delFileInfo(fileId: string) {

        for (let _idx in this.filesList) {

            if (this.filesList[_idx].fileId === fileId) {

                this.filesList.splice(~~_idx, 1);

                return this.setList(this.filesList);
            }
        }

        return null;
    }

}