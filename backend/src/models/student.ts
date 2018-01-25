import * as PATH from "path";

import { Student } from "../interfaces/student";

import * as Util from "../utils/util";

export class StudentModel {

    private studentes: Student[];

    private BASE_ROOT: string;

    private LessionId: string;

    constructor(lessionId: string) {

        this.BASE_ROOT = Util.getPath("student");

        this.LessionId = lessionId;

        this.getList();

    }

    public getList() {

        let list = this.studentes = Util.GetFile(PATH.join(this.BASE_ROOT, this.LessionId + '.json'), true, false);

        return list;
    }

    public setList(list: Student[]) {

        return Util.SetFile(PATH.join(this.BASE_ROOT, this.LessionId + '.json'), list, true, false) || this.getList();
    }

    public addStudent(student: Student) {

        let newId = Util.dateToLocalString(new Date(), "numbercut", 13);

        for (let _s of this.studentes) {

            if (_s.idCard === student.idCard) { return null }
        }

        newId !== this.studentes[this.studentes.length - 1].id ? newId : ~~(this.studentes[this.studentes.length].id) + 1;

        Object.assign(student, { id: newId });

        this.studentes.push(student);

        return this.setList(this.studentes);

    }

    public delStudent(studentId: string) {

        for (let _idx in this.studentes) {

            if (this.studentes[_idx].id === studentId) {

                this.studentes.splice(~~_idx, 1);

                return this.setList(this.studentes);
            }
        }

        return null;
    }

    public getStudent(idCard: string) {

        for (let _student of this.studentes) {

            if (_student.idCard === idCard) {

                return _student;
            }
        }

        return null;
    }

    public setStudent(studentId: string, student: Student) {

        for (let idx in this.studentes) {

            if (this.studentes[idx].id === studentId) {

                this.studentes[idx] = student;

                return this.setList(this.studentes);
            }
        }

        return null;
    }
}