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
        private router: Router,
        private uiService: UIService,
        private nbConfigService: NbConfigService
    ) { }

	ngOnInit() {
        this.form = new FormGroup({
            device_id: new FormControl('', [Validators.required]),
            device_name: new FormControl('', [Validators.required]),
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
                device_id: form.value.device_id,
                device_name: form.value.device_name,
            },
            file: form.value.file.files[0]
        };
        this.nbConfigService.newNbConfig(this.nbConfigData);
        this.router.navigate(['/nbConfig']);
    }

    ngOnDestroy() {
        if (this.loadingSubs) {
            this.loadingSubs.unsubscribe();
        }
    }

}
