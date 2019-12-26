import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UIService } from'../../shared/ui.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
    loginForm: FormGroup;
    isLoading = false;
    private loadingSubs: Subscription;

    constructor(
        private authService: AuthService,
        private uiService: UIService
    ) { }

    ngOnInit() {
        this.loadingSubs = this.uiService.loadingStateChanged.subscribe(isLoading => {
            this.isLoading = isLoading;
        });
        this.loginForm = new FormGroup({
            name: new FormControl('', {validators: [Validators.required]}),
            password: new FormControl('', {validators: [Validators.required]})
        })
    }

    onSubmit() {
        this.authService.login({
            name: this.loginForm.value.name,
            password: this.loginForm.value.password
        });
    }

    ngOnDestroy() {
        if (this.loadingSubs) {
            this.loadingSubs.unsubscribe();
        }
    }

}
