import { NbConfig } from './nbConfig.model';
export interface Response{
    status: number;
    msg: string;
    result: NbConfig[];
}
