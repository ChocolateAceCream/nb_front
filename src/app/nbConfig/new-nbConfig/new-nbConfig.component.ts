import { Component, OnInit, OnDestroy } from '@angular/core';
import { NbConfig } from '../nbConfig.model';
import { NbConfigService } from '../nbConfig.service';
import { UIService } from '../../shared/ui.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {NbFile} from '../nbFile.model';

@Component({
	selector: 'app-new-nbConfig',
	templateUrl: './new-nbConfig.component.html',
	styleUrls: ['./new-nbConfig.component.css']
})
export class NewNbConfigComponent implements OnInit, OnDestroy {

    isLoading = false;
    name: string;
    nbConfigData: NbFile;
    private loadingSubs: Subscription;
    form: FormGroup;

    constructor(
        private uiService: UIService,
        private nbConfigService: NbConfigService
    ) { }

	ngOnInit() {
        this.form = new FormGroup({
            deviceId: new FormControl('', [Validators.required]),
            gatewayId: new FormControl('', [Validators.required]),
            serviceType: new FormControl('', [Validators.required]),
            serviceId: new FormControl('', [Validators.required]),
            isParsing: new FormControl('', [Validators.required]),
            parseField: new FormControl('', [Validators.required]),
            parseJarClass: new FormControl('', [Validators.required]),
            parseJarMethod: new FormControl('', [Validators.required]),
            isBaseDecode: new FormControl('', [Validators.required]),
            storageFields: new FormControl('', [Validators.required]),
            isCallback: new FormControl('', [Validators.required]),
            appId: new FormControl('', [Validators.required]),
            method: new FormControl('', [Validators.required]),
            callbackUrl: new FormControl('', [Validators.required]),
            maxRetransmit: new FormControl('', [Validators.required]),
            expireTime: new FormControl('', [Validators.required]),
            callbackFieldsKey: new FormControl('', [Validators.required]),
            callbackFieldsValues: new FormControl('', [Validators.required]),
            file: new FormControl([])
        });

		this.loadingSubs = this.uiService.loadingStateChanged.subscribe(isLoading => {
            this.isLoading = isLoading;
        });
	}

    onSubmit(form: FormGroup){
        console.log(form);
        //this.name = localStorage.getItem('currentUser');
        this.nbConfigData = {
            // name: this.name,
            // seat: form.value.seat,
            // date: form.value.startingDate.toString(),
            // duration: form.value.duration
            nbConfig:{
                deviceId: form.value.deviceId,
                gatewayId: form.value.gatewayId,
                serviceType: form.value.serviceType,
                serviceId: form.value.serviceId,
                isParsing: form.value.isParsing,
                parseField: form.value.parseField,
                parseJarClass: form.value.parseJarClass,
                parseJarMethod: form.value.parseJarMethod,
                isBaseDecode: form.value.isBaseDecode,
                storageFields: form.value.storageFields,
                isCallback: form.value.isCallback,
                appId: form.value.appId,
                method: form.value.method,
                callbackUrl: form.value.callbackUrl,
                maxRetransmit: form.value.maxRetransmit,
                expireTime: form.value.expireTime,
                callbackFieldsKey: form.value.callbackFieldsKey,
                callbackFieldsValues: form.value.callbackFieldsValues
            },
            file: form.value.file.files[0]
        };
        this.nbConfigService.newNbConfig(this.nbConfigData);
        
    }

    ngOnDestroy() {
        if (this.loadingSubs) {
            this.loadingSubs.unsubscribe();
        }
    }

}
