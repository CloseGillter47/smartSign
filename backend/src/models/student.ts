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

        this.getList(this.LessionId);
    }

    public getList(lessionId: string) {

        let list = this.studentes = Util.GetFile(PATH.join(this.BASE_ROOT, lessionId + '.json'), true, false);

        return list;
    }

    public setList(list: Student[]) {

        return Util.SetFile(PATH.join(this.BASE_ROOT, 'index.json'), list, true, false) || this.getList(this.LessionId);
    }

    public addStudent(student: Student) {

        let newId = Util.dateToLocalString(new Date(), "numbercut", 14);

        for (let _s of this.studentes) {

            if (_s.idCard === student.idCard) { return null }
        }

        newId !== this.studentes[this.studentes.length].id ? newId : ~~(this.studentes[this.studentes.length].id) + 1;

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

    public getStudent(studentId: string) {

        for (let _student of this.studentes) {

            if (_student.id === studentId) {

                return _student;
            }
        }

        return null;
    }

    public setStudent(studentId: string, student: Student) {

        for (let _student of this.studentes) {

            if (_student.id === studentId) {

                _student = student;

                return this.setList(this.studentes);
            }
        }

        return null;
    }
}