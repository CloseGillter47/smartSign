import { Lession } from "./lession";

export interface iFiles {
    filename?: string;
    fileurl?: string;
}
export interface iFile {
    fileId?: string;
    upload?: string;
    author?: string;
    filename?: string;
    fileurl?: string;
    lessiones?: Lession[];
}