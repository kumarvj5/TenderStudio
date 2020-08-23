import { Component, OnInit } from '@angular/core';
import { TenderserviceService } from '../services/tenderservice.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  breadcrumbList: any[] = [];
  constructor(private tenderService: TenderserviceService) { }
  ngOnInit() {
      this.tenderService.breadsCrumbList.asObservable().subscribe((list) => {
          this.breadcrumbList = list;
      });
  }
}
