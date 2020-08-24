import { Component, OnInit, ChangeDetectorRef, ViewChild, ɵbypassSanitizationTrustStyle } from '@angular/core';
import { TenderserviceService } from '../services/tenderservice.service';
import { ActivatedRoute } from '@angular/router';
import { LegendLabelsContentArgs, ChartComponent } from '@progress/kendo-angular-charts';
import { IntlService } from '@progress/kendo-angular-intl';
import { saveAs } from '@progress/kendo-file-saver';
import { exportPDF, geometry } from '@progress/kendo-drawing';

function mm(val: number): number {
  return val * 2.8347;
}
const PAGE_RECT = new geometry.Rect([0, 0], [mm(210 - 20), mm(297 - 20)]);

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})



export class ChartsComponent implements OnInit {
  loading: boolean = true;
color:string ='green'
  public checked: boolean = false;
  @ViewChild('chart',null) public chart: ChartComponent;
    constructor(private tenderService: TenderserviceService,private cd:ChangeDetectorRef, private activatedRoute: ActivatedRoute, private intl: IntlService) {
      this.labelContent = this.labelContent.bind(this);
     }
     pieList: Array<any>=[];
    categoriesList: Array<any>=[];
    dataList: Array<any>=[];
    tenderAmount: number;
    totalAmount: number;
    profitAmount: number;
    isProfit: boolean =true;
    ngOnInit() {
      let tenderType = this.activatedRoute.snapshot.params.tendertype;
      this.getAllTenderOverall();
      this.tenderService.breadsCrumbList.next([{
        name: 'Tenders',
        path: '/dashboard'
     }, {
      name: 'Items',
      path: '/dashboard/overall/'+ tenderType
   },{
    name: 'Overall',
    path: '/dashboard/overall/'+ tenderType+'/report'
  },
  {
    name: 'Graphs',
    path: '/dashboard/overall/'+ tenderType+'/graph'
  }])
    }
    ngOnDestroy(): void {
      this.tenderService.breadsCrumbList.next([{}]);
    }
    getAllTenderOverall() {
      this.tenderService.getAllTenderOverall(this.activatedRoute.snapshot.params.tendertype).subscribe((res: any) => {
        this.categoriesList=[];
        this.dataList=[];
        this.pieList=res.tenderSummary;
        res.tenderSummary.forEach(element => {
          this.categoriesList.push(element.expenditureType + ' ('+`${this.intl.formatNumber(element.share, 'p2')}`+')');
          this.dataList.push(element.amount);
        });
        this.totalAmount = res.totalAmount;
      this.tenderAmount = res.tenderAmount;
      if (res.profit == null) {
        this.profitAmount = res.loss;
         this.isProfit = false;

      } else {
        this.profitAmount = res.profit;
      }
        this.cd.detectChanges();
        this.loading = false;
      });
    }

  public labelContent(args: LegendLabelsContentArgs): string {
      return `${args.dataItem.expenditureType} amount: ₹${this.intl.formatNumber(args.dataItem.amount, 'n2')} (${this.intl.formatNumber(args.dataItem.share, 'p2')})`;
  }
  change(event){

  }
  public exportSizedChart(chart): void {
    const visual = chart.exportVisual({
      width: PAGE_RECT.size.width
    });

    this.exportElement(visual);
  }
  public exportElement(element): void {
    exportPDF(element, {
      paperSize: "A4",
      margin: "1cm"
    }).then((dataURI) => {
      saveAs(dataURI, 'chart.pdf');
    });
  }
}
