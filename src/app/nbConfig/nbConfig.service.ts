import { NbConfig } from './nbConfig.model';
import { Response } from './response.model';
import { Subject } from 'rxjs/Subject';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { UIService } from '../shared/ui.service';
import {NbFile} from './nbFile.model';

import 'rxjs/add/operator/toPromise';
import { FileInput } from 'ngx-material-file-input';
import { GlobalVariable } from '../globals';
import { Router } from '@angular/router';

@Injectable()
export class NbConfigService {
    token: string;
    reChanged = new Subject<NbConfig[]>();
    nbConfigs: NbConfig[] = [];
    nbConfig: NbConfig;

    constructor(
        private router: Router,
        private http: HttpClient,
        private uiService: UIService
    ) {}

    ngOnInit() {
    }

    getAllNbConfigs() {
        this.token = localStorage.getItem('accessToken');
        let url = GlobalVariable.base_path;
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':'application/json',
                'Access-Control-Allow-Origin':"*",
                'Authorization':`Bearer ${this.token}`
            })
        };
        this.http.get<Response>(
            `${url}/rest/config/get`,
            httpOptions
        ).toPromise()
        .then((results: Response) => {
            this.reChanged.next(results.result);
            this.nbConfigs = results.result;
        })
        .catch(error => {
        })

    }

    newNbConfig(nbConfigData: NbFile) {
        this.token = localStorage.getItem('accessToken');
        let url=GlobalVariable.base_path;
        var data = new FormData();
        data.append("file", nbConfigData.file);
        data.append("deviceId", nbConfigData.nbConfig.deviceId);
        data.append("gatewayId", nbConfigData.nbConfig.gatewayId);
        data.append("serviceType", nbConfigData.nbConfig.serviceType);
        data.append("serviceId", nbConfigData.nbConfig.serviceId);
        data.append("isParsing", nbConfigData.nbConfig.isParsing);
        data.append("parseField", nbConfigData.nbConfig.parseField);
        data.append("parseJarClass", nbConfigData.nbConfig.parseJarClass);
        data.append("parseJarMethod", nbConfigData.nbConfig.parseJarMethod);
        data.append("isBaseDecode", nbConfigData.nbConfig.isBaseDecode);
        data.append("storageFields", nbConfigData.nbConfig.storageFields);
        data.append("isCallback", nbConfigData.nbConfig.isCallback);
        data.append("appId", nbConfigData.nbConfig.appId);
        data.append("method", nbConfigData.nbConfig.method);
        data.append("callbackUrl", nbConfigData.nbConfig.callbackUrl);
        data.append("maxRetransmit", nbConfigData.nbConfig.maxRetransmit);
        data.append("expireTime", nbConfigData.nbConfig.expireTime);
        data.append("callbackFieldsKey", nbConfigData.nbConfig.callbackFieldsKey);
        data.append("callbackFieldsValues", nbConfigData.nbConfig.callbackFieldsValues);
        this.uiService.loadingStateChanged.next(true);
        const httpOptions = {
            headers: new HttpHeaders({
                // 'Content-Type':'multipart/form-data',
                'Access-Control-Allow-Origin':"*",
                'Authorization':`Bearer ${this.token}`
            })
        };
        this.http.post(
            `${url}/rest/config/uploadFile`,
            data,
            httpOptions
        ).toPromise()
        .then(result => {
            this.uiService.loadingStateChanged.next(false);
            this.uiService.showSnackbar("NbConfig Done",null,5000)
            this.getAllNbConfigs()
            this.router.navigate(['/allConfig']);
        })
        .catch(error => {
            this.uiService.loadingStateChanged.next(false);
            this.uiService.showSnackbar(error.error.errors[0].detail,null,3000)
        })

    }

    deleteNbConfig(deviceId: string) {
        this.token = localStorage.getItem('accessToken');
        let url=GlobalVariable.base_path;
        var data = new FormData();
        data.append("deviceId",deviceId)
        this.uiService.loadingStateChanged.next(true);
        const httpOptions = {
            headers: new HttpHeaders({
                // 'Content-Type':'application/x-www-form-urlencoded',
                'Access-Control-Allow-Origin':"*",
                'Authorization':`Bearer ${this.token}`
            })
        };
        this.http.post<Response>(
            `${url}/rest/config/delete`,
            data,
            httpOptions
        ).toPromise()
        .then(result => {
            this.uiService.loadingStateChanged.next(false);
            this.uiService.showSnackbar(result.msg,null,5000);
            this.getAllNbConfigs();
            this.router.navigate(['/allConfig']);
        })
        .catch(error => {
            this.uiService.loadingStateChanged.next(false);
            this.uiService.showSnackbar(error.error.errors[0].detail,null,3000)
        })
    }

    onEditConfig(nbConfig: NbConfig) {
        this.nbConfig = nbConfig;
    }

    updateNbConfigWithFile(nbConfigData: NbFile){
        this.token = localStorage.getItem('accessToken');
        let url=GlobalVariable.base_path;
        var data = new FormData();
        data.append("file", nbConfigData.file);
        data.append("deviceId", nbConfigData.nbConfig.deviceId);
        data.append("gatewayId", nbConfigData.nbConfig.gatewayId);
        data.append("serviceType", nbConfigData.nbConfig.serviceType);
        data.append("serviceId", nbConfigData.nbConfig.serviceId);
        data.append("isParsing", nbConfigData.nbConfig.isParsing);
        data.append("parseField", nbConfigData.nbConfig.parseField);
        data.append("parseJarClass", nbConfigData.nbConfig.parseJarClass);
        data.append("parseJarMethod", nbConfigData.nbConfig.parseJarMethod);
        data.append("isBaseDecode", nbConfigData.nbConfig.isBaseDecode);
        data.append("storageFields", nbConfigData.nbConfig.storageFields);
        data.append("isCallback", nbConfigData.nbConfig.isCallback);
        data.append("appId", nbConfigData.nbConfig.appId);
        data.append("method", nbConfigData.nbConfig.method);
        data.append("callbackUrl", nbConfigData.nbConfig.callbackUrl);
        data.append("maxRetransmit", nbConfigData.nbConfig.maxRetransmit);
        data.append("expireTime", nbConfigData.nbConfig.expireTime);
        data.append("callbackFieldsKey", nbConfigData.nbConfig.callbackFieldsKey);
        data.append("callbackFieldsValues", nbConfigData.nbConfig.callbackFieldsValues);
        this.uiService.loadingStateChanged.next(true);
        const httpOptions = {
            headers: new HttpHeaders({
                // 'Content-Type':'multipart/form-data',
                'Access-Control-Allow-Origin':"*",
                'Authorization':`Bearer ${this.token}`
            })
        };
        this.http.post(
            `${url}/rest/config/updateConfigWithFile`,
            data,
            httpOptions
        ).toPromise()
        .then(result => {
            this.uiService.loadingStateChanged.next(false);
            this.uiService.showSnackbar("更新完毕",null,5000);
            this.getAllNbConfigs();
            this.router.navigate(['/allConfig']);
        })
        .catch(error => {
            this.uiService.loadingStateChanged.next(false);
            this.uiService.showSnackbar(error.error.errors[0].detail,null,3000);
        })
    }

    updateNbConfigWithoutFile(nbConfig: NbConfig){
        this.token = localStorage.getItem('accessToken');
        let url=GlobalVariable.base_path;
        var data = new FormData();
        data.append("deviceId", nbConfig.deviceId);
        data.append("gatewayId", nbConfig.gatewayId);
        data.append("serviceType", nbConfig.serviceType);
        data.append("serviceId", nbConfig.serviceId);
        data.append("isParsing", nbConfig.isParsing);
        data.append("parseField", nbConfig.parseField);
        data.append("parseJarClass", nbConfig.parseJarClass);
        data.append("parseJarMethod", nbConfig.parseJarMethod);
        data.append("isBaseDecode", nbConfig.isBaseDecode);
        data.append("storageFields", nbConfig.storageFields);
        data.append("isCallback", nbConfig.isCallback);
        data.append("appId", nbConfig.appId);
        data.append("method", nbConfig.method);
        data.append("callbackUrl", nbConfig.callbackUrl);
        data.append("maxRetransmit", nbConfig.maxRetransmit);
        data.append("expireTime", nbConfig.expireTime);
        data.append("callbackFieldsKey", nbConfig.callbackFieldsKey);
        data.append("callbackFieldsValues", nbConfig.callbackFieldsValues);
        this.uiService.loadingStateChanged.next(true);
        const httpOptions = {
            headers: new HttpHeaders({
                // 'Content-Type':'multipart/form-data',
                'Access-Control-Allow-Origin':"*",
                'Authorization':`Bearer ${this.token}`
            })
        };
        this.http.post(
            `${url}/rest/config/updateConfigWithoutFile`,
            data,
            httpOptions
        ).toPromise()
        .then(result => {
            this.uiService.loadingStateChanged.next(false);
            this.uiService.showSnackbar("更新完毕",null,5000);
            this.getAllNbConfigs();
            this.router.navigate(['/allConfig']);
        })
        .catch(error => {
            this.uiService.loadingStateChanged.next(false);
            this.uiService.showSnackbar(error.error.errors[0].detail,null,3000);
        })
    }
}
