import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UIService } from'../../shared/ui.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
    maxDate;
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

    }

    onSubmit(form: NgForm){
        this.authService.registerUser({
            name: form.value.name,
            password: form.value.password
        });
    }

    ngOnDestroy() {
        if (this.loadingSubs) {
            this.loadingSubs.unsubscribe();
        }
    }

}
