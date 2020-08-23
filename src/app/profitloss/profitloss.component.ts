import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TenderserviceService } from '../services/tenderservice.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profitloss',
  templateUrl: './profitloss.component.html',
  styleUrls: ['./profitloss.component.scss']
})
export class ProfitlossComponent implements OnInit {
loading: boolean = true;
isProfit: boolean = true;
tenderAmount: number;
totalAmount: number;
finalAmount: number;
tenderType: string;
  constructor(private tenderService: TenderserviceService,private cd:ChangeDetectorRef, private activatedRoute: ActivatedRoute, private router: Router) { }
  tendersOverallList: Array<any>=[];
  tendersList: Array<any>=[];
  ngOnInit() {
    this.tenderType = this.activatedRoute.snapshot.params.tendertype;
    this.getAllTenderOverall();
    this.tenderService.breadsCrumbList.next([{
      name: 'Tenders',
      path: '/dashboard'
   }, {
    name: 'Items',
    path: '/dashboard/overall/'+ this.tenderType
 },{
  name: 'Overall',
  path: '/dashboard/overall/'+ this.tenderType+'/report'
}])
  }
  ngOnDestroy(): void {
    this.tenderService.breadsCrumbList.next([{}]);
  }
  getAllTenderOverall() {
    this.tenderService.getAllTenderOverall(this.activatedRoute.snapshot.params.tendertype).subscribe((res: any) => {
      this.tendersOverallList = res.tenderSummary;
      this.tendersList = res.tender;
      this.totalAmount = res.totalAmount;
      this.tenderAmount = res.tenderAmount;
      if (res.profit == null) {
        this.finalAmount = res.loss;
        this.isProfit = false;
      } else {
        this.finalAmount = res.profit;
      }
      console.log('final amount', this.finalAmount);
      this.cd.detectChanges();
      this.loading = false;
    });
  }
  graphicalReport(){
    this.router.navigateByUrl(`dashboard/overall/${this.tenderType}/graph`);
  }
}
