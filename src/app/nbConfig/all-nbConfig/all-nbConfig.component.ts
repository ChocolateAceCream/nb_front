import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { NbConfig } from '../nbConfig.model';
import { NbConfigService } from '../nbConfig.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-all-nbConfig',
    templateUrl: './all-nbConfig.component.html',
    styleUrls: ['./all-nbConfig.component.css']
})
export class AllNbConfigComponent implements OnInit,AfterViewInit {

    displayedColumns = [
        'deviceId',
        'gatewayId',
        'serviceType',
        'serviceId',
        'isParsing',
        'parseField',
        'parseJarClass',
        'parseJarMethod',
        'isBaseDecode',
        'storageFields',
        'isCallback',
        'appId',
        'method',
        'callbackUrl',
        'maxRetransmit',
        'expireTime',
        'callbackFieldsKey',
        'callbackFieldsValues',
        '操作'
    ];
    dataSource = new MatTableDataSource<NbConfig>();
    interval: any;
    private reChangedSubscription: Subscription;

    @ViewChild(MatSort, {static: true}) sort: MatSort;
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

    constructor(private nbConfigService: NbConfigService) { }

    ngOnInit() {
        this.nbConfigService.getAllNbConfigs();
        this.reChangedSubscription = this.nbConfigService.reChanged.subscribe(
            (nbConfigs: NbConfig[]) => {
                console.log(nbConfigs);
                this.dataSource.data = nbConfigs;
            }
        )
    }

    ngAfterViewInit() {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }

    doFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    onDelete(deviceId: string){
        console.log(deviceId);
    }

    onEdit(nbConfig: NbConfig){
        console.log(nbConfig);
    }

    ngOnDestroy() {
        this.reChangedSubscription.unsubscribe();
    }

}
