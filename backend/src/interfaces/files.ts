import { Lession } from "./lession";

export interface iFiles {
    filename?: string;
    fileurl?: string;
}
export interface iFile {
    filename: string;
    fileurl: string;
    lessiones?: Lession[];
}