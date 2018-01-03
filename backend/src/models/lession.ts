import * as PATH from "path";

import { Lession } from "../interfaces/lession";
import * as Util from "../utils/util";

export class LessionModel {

    private lessiones: Lession[];

    private BASE_ROOT: string;

    constructor() {

        this.BASE_ROOT = Util.getPath("lession");

        this.getList();

    }

    public getList() {

        let list = this.lessiones = Util.GetFile(PATH.join(this.BASE_ROOT, 'index.json'), true, false);

        return list;
    }

    public setList(list: Lession[]) {

        return Util.SetFile(PATH.join(this.BASE_ROOT, 'index.json'), list, true, false) || this.getList();
    }

    public addLession(lession: Lession) {

        let newId = Util.dateToLocalString(new Date(), "numbercut", 14);

        newId !== this.lessiones[this.lessiones.length].id ? newId : ~~(this.lessiones[this.lessiones.length].id) + 1;

        Object.assign(lession, { id: newId });

        this.lessiones.push(lession);

        return this.setList(this.lessiones);

    }

    public delLession(lessionId: string) {

        for (let _idx in this.lessiones) {

            if (this.lessiones[_idx].id === lessionId) {

                this.lessiones.splice(~~_idx, 1);

                return this.setList(this.lessiones);
            }
        }

        return null;
    }

    public setLession(lessionId: string, data: Lession) {

        for (let _lession of this.lessiones) {

            if (_lession.id === lessionId) {

                _lession = data;

                return this.setList(this.lessiones);
            }
        }

        return null;
    }

    public getLession(lessionId: string) {

        for (let _lession of this.lessiones) {

            if (_lession.id === lessionId) {

                return _lession;
            }
        }

        return null;
    }
}