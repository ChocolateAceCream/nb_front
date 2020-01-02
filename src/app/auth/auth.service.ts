//service provide in app.module.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UIService } from'../shared/ui.service';
import { GlobalVariable } from '../globals';
import 'rxjs/add/operator/toPromise';

//inject route service

interface AccessToken {
    result:string,
    msg: string;
}
@Injectable()

export class AuthService {
    authChange = new Subject<boolean>();
    private user: User;

    constructor(
        private router: Router,
        private http: HttpClient,
        private uiService: UIService
    ) {}

    registerUser(authData: AuthData) {
        this.uiService.loadingStateChanged.next(true);
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'*'
            })
        };

        // this.user = {
		// 	name: authData.name,
        //     password: authData.password
        // };
        let url = GlobalVariable.base_path;
        this.http.post<AccessToken>(
            `${url}/user/signup`,
            {
                username: authData.name,
                password: authData.password
            },
            // this.user,
            httpOptions
        ).toPromise()
        .then(result => {
            this.uiService.loadingStateChanged.next(false);
            this.authSuccessfully(result.result, result.msg);
        })
        .catch(error => {
            this.uiService.loadingStateChanged.next(false);
            this.uiService.showSnackbar(error.error.errors[0].detail,null,3000);
        });
    }

    login(authData: AuthData) {
        this.uiService.loadingStateChanged.next(true);
        let url = GlobalVariable.base_path;
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'*'
            })
        };
        this.user = {
            name: authData.name,
            password: authData.password
        };
        this.http.post<AccessToken>(
            `${url}/user/login`,
            {
                username: authData.name,
                password: authData.password
            },
            // this.user,
            httpOptions
        ).toPromise()
        .then(result => {
            this.uiService.loadingStateChanged.next(false);
            this.authSuccessfully(result.result, result.msg);
        })
        .catch(error => {
            this.uiService.loadingStateChanged.next(false);
            // this.uiService.showSnackbar(error.error.errors[0].detail,null,3000);
        });
    }

    logout() {
        this.user = null;
        this.authChange.next(false);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('currentUser');
        this.router.navigate(['/allConfig']);
    }

    getUser() {
        return {...this.user};
    }

    isAuth() {
        return <string>localStorage.getItem('accessToken') != null;
    }

    private authSuccessfully(token: string, name: string) {
        localStorage.setItem('accessToken', token);
        localStorage.setItem('currentUser', name);
        this.authChange.next(true);
        this.router.navigate(['/allConfig']);
    }
}
