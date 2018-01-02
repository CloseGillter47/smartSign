import { iFiles as FilesList, iFile as FileDetail } from "../interfaces/files";
import * as PATH from "path";
import * as _ from "lodash";

import * as Util from "../utils/util";

export class FilesModel {

    public filesList: FilesList;

    private BASE_ROOT: string;

    constructor() {

        this.BASE_ROOT = Util.getPath("files");
    }

    public getList() {

        let list = this.filesList = Util.GetFile(PATH.join(this.BASE_ROOT, 'index.json'), true, false);

        return list;
    }

    public setList(list: any) {

        return Util.SetFile(PATH.join(this.BASE_ROOT, 'index.json'), list, true, false) || this.getList();
    }

    public getFileInfo(fileId: string) {

    }

    public setFileInfo(fileId: string, data: any) {

    }





}