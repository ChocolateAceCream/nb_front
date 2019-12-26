import { Component, OnDestroy, EventEmitter, Output, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../../auth/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
    @Output() sidenavToggle = new EventEmitter<void>();
    isAuth: boolean = !!localStorage.getItem('accessToken');
    currentUser = localStorage.getItem('currentUser');
    authSubscription: Subscription;
    constructor( private authService: AuthService) { }

    ngOnInit() {
        this.authSubscription = this.authService.authChange.subscribe(authStatus => {
          this.isAuth = authStatus;
        });
    }

    onLogout() {
        this.authService.logout();
    }
    ngOnDestroy() {
        this.authSubscription.unsubscribe();
    }
}
