import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NbConfigService } from '../nbConfig.service';
import { NbConfig } from '../nbConfig.model';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UIService } from '../../shared/ui.service';

@Component({
  selector: 'app-edit-nb-config',
  templateUrl: './edit-nb-config.component.html',
  styleUrls: ['./edit-nb-config.component.css']
})
export class EditNbConfigComponent implements OnInit {

  private onEditConfigSubscription: Subscription;
  private nbConfig: NbConfig;


  isLoading = false;
  private loadingSubs: Subscription;

  form: FormGroup;



  constructor(
    private nbConfigService: NbConfigService,
    private router: Router,
    private uiService: UIService,

  ) { }

  ngOnInit() {
    this.nbConfig = this.nbConfigService.nbConfig;
    this.form = new FormGroup({
      deviceId: new FormControl(this.nbConfig.deviceId, [Validators.required]),
      gatewayId: new FormControl(this.nbConfig.gatewayId, [Validators.required]),
      serviceType: new FormControl(this.nbConfig.serviceType, [Validators.required]),
      serviceId: new FormControl(this.nbConfig.serviceId, [Validators.required]),
      isParsing: new FormControl(this.nbConfig.isParsing, [Validators.required]),
      parseField: new FormControl(this.nbConfig.parseField, [Validators.required]),
      parseJarClass: new FormControl(this.nbConfig.parseJarClass, [Validators.required]),
      parseJarMethod: new FormControl(this.nbConfig.parseJarMethod, [Validators.required]),
      isBaseDecode: new FormControl(this.nbConfig.isBaseDecode, [Validators.required]),
      storageFields: new FormControl(this.nbConfig.storageFields, [Validators.required]),
      isCallback: new FormControl(this.nbConfig.isCallback, [Validators.required]),
      appId: new FormControl(this.nbConfig.appId, [Validators.required]),
      method: new FormControl(this.nbConfig.method, [Validators.required]),
      callbackUrl: new FormControl(this.nbConfig.callbackUrl, [Validators.required]),
      maxRetransmit: new FormControl(this.nbConfig.maxRetransmit, [Validators.required]),
      expireTime: new FormControl(this.nbConfig.expireTime, [Validators.required]),
      callbackFieldsKey: new FormControl(this.nbConfig.callbackFieldsKey, [Validators.required]),
      callbackFieldsValues: new FormControl(this.nbConfig.callbackFieldsValues, [Validators.required]),
      file: new FormControl([])
    });
    this.loadingSubs = this.uiService.loadingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading;
    });

  }


}
