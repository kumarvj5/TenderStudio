import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TenderserviceService } from '../services/tenderservice.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ConfirmdialogComponent } from '../confirmdialog/confirmdialog.component';
import { ItemdialogComponent } from '../itemdialog/itemdialog.component';
import { TenderData } from '../models/tenderData';
import { TenderViewData } from '../models/tenderDataView';

@Component({
  selector: 'app-tenderoverall',
  templateUrl: './tenderoverall.component.html',
  styleUrls: ['./tenderoverall.component.scss']
})
export class TenderoverallComponent implements OnInit {
  expenditureType: string;
  loading: boolean = true;
  itemCount: number;
  form: FormGroup;
  totalAmount: any;
  tenderAmount: any;
  public checked: boolean = false;
;
tenderData: TenderData = new TenderData();
tenderType: string;
  tenderReportList : Array<any> = [];
  constructor(private router: Router,
    private cd: ChangeDetectorRef,
    private tenderService: TenderserviceService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getAllTenderReports();
    this.tenderType = this.activatedRoute.snapshot.params.tendertype;
    this.tenderService.breadsCrumbList.next([{
      name: 'Tenders',
      path: '/dashboard'
   }, {
    name: 'Items',
    path: '/dashboard/overall/'+ this.tenderType
 }])
  }
  ngOnDestroy(): void {
    this.tenderService.breadsCrumbList.next([{}]);
  }
  getAllTenderReports() {
    if (this.activatedRoute.snapshot.params.tendertype) {
      if (this.checked) {
        this.tenderService.getTenderReportsSplitList(this.activatedRoute.snapshot.params.tendertype).subscribe((res: any) => {
          this.tenderReportList = res;
          this.cd.detectChanges();
          this.tenderAmount = res[0].tenderAmount;
          this.loading = false;
        });
      } else {
        this.tenderService.getTenderReportsList(this.activatedRoute.snapshot.params.tendertype).subscribe((res: any) => {
          this.tenderReportList = res;
          this.cd.detectChanges();
          this.itemCount = res.length;
          this.totalAmount = this.tenderReportList.reduce((sum, current) => sum + current.amount, 0);
          this.tenderAmount = res[0].tenderAmount;
          this.loading = false;
        });
      }
    }
  }
  openFileDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    // dialogConfig.disableClose = true;

    this.dialog.open(ItemdialogComponent, {
      width: '25vw',
      height:'21vw',
    }).afterClosed().subscribe((result) => {
      if (result) {
        console.log('i am resitl', result);
        this.tenderData = result.data;
        this.tenderData.tenderType = this.tenderType;
        this.tenderService.createTenderReport(result.data).subscribe(data => {
          this.toastr.success('Item Created Successfully');
          this.getAllTenderReports();
        },
        errors => {
          this.toastr.error('Creating Item Failed', 'Failed Creation');
        });
      }
    });
}

updateFileDialog(row){
  console.log(row);
  const dialogConfig = new MatDialogConfig();
  dialogConfig.autoFocus = true;
  // dialogConfig.disableClose = true;
  this.form = new FormGroup({
    itemName: new FormControl({value: row.itemName, disabled: true}, [Validators.required]),
    expenditureType: new FormControl(row.expenditureType, [Validators.required]),
    amount: new FormControl(row.amount, [Validators.required])
  });
  const dialogRef = this.dialog.open(ItemdialogComponent, {
    width: '25vw',
    height:'21vw', 
    data: this.form
  });

  dialogRef.afterClosed().subscribe((result) => {
    if (result) {
      console.log('i am resitl', result);
      this.tenderService.updateTenderReport(row.tenderReportId, result.data).subscribe(data => {
        this.toastr.success('Item Updated Successfully');
        this.getAllTenderReports();
      },
      errors => {
        this.toastr.error('Updating Item Failed', 'Failed Updating');
      });
    }
  });
}

deleteFileDialog(tenderReportId: any){
  const dialogRef = this.dialog.open(ConfirmdialogComponent, {
    data: {
        title: "Are you sure?",
        message: "You are about to delete an item, Do you wish to continue ? "
      }
  });
  // listen to response
  dialogRef.afterClosed().subscribe(dialogResult => {
    if (dialogResult) {
      this.tenderService.deleteTenderReport(tenderReportId).subscribe(data => {
        this.toastr.success('Item Deleted Successfully');
        this.getAllTenderReports();
      })
    }
});
}

change(event){
  this.loading= true;
  this.getAllTenderReports();
}
overallReport(){
  this.router.navigateByUrl(`dashboard/overall/${this.tenderType}/report`);
}

getTotal(event)
{
  console.log(event);
}
}
