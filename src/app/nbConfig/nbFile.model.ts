import { NbConfig } from './nbConfig.model';
export interface NbFile{
    nbConfig: NbConfig,
    file: File
}