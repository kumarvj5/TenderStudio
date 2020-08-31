import { Component, OnInit, ViewChild, ChangeDetectorRef, AfterViewInit, Inject, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { TenderserviceService } from '../services/tenderservice.service';
import { ToastrService } from 'ngx-toastr';
import { TypedialogComponent } from '../typedialog/typedialog.component';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { filter } from 'rxjs/operators';
import { DialogData } from '../models/codetype';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ConfirmdialogComponent } from '../confirmdialog/confirmdialog.component';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-tenderdashboard',
  templateUrl: './tenderdashboard.component.html',
  styleUrls: ['./tenderdashboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TenderdashboardComponent implements OnInit, AfterViewInit {
  typeDialogRef: MatDialogRef<TypedialogComponent>;

  tendersList: MatTableDataSource<any> = new MatTableDataSource([]);
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  activeUrl: boolean = true;
  loading: boolean = true;  
  dialogData: DialogData = new DialogData();
  form: FormGroup;

    private formBuilder: FormBuilder;
  constructor(private router: Router,
              private cd: ChangeDetectorRef,
              private tenderService: TenderserviceService,
              private toastr: ToastrService,
              private dialog: MatDialog,
              private currencyPipe: CurrencyPipe) { }

  ngOnInit() {
   this.getAllTenders();
   this.tenderService.breadsCrumbList.next([{
      name: 'Tenders',
      path: '/dashboard'
   }])
  }
  ngOnDestroy(): void {
    this.tenderService.breadsCrumbList.next([{}]);
  }
  getAllTenders() {
    this.tenderService.getTendersList().subscribe((res: any) => {
      this.tendersList = new MatTableDataSource(res);
      this.tendersList.paginator = this.paginator;
    this.tendersList.sort = this.sort;
      this.cd.detectChanges();
      this.loading = false;
    });
  }

  ngAfterViewInit(): void{
    this.tendersList.paginator = this.paginator;
    this.tendersList.sort = this.sort;
  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tendersList.filter = filterValue.trim().toLowerCase();

    if (this.tendersList.paginator) {
      this.tendersList.paginator.firstPage();
    }
  }
  processTender(row: any) {
    this.activeUrl = false;
    this.cd.detectChanges();
    this.router.navigateByUrl(`dashboard/overall/${row.code}`);
  }

  openFileDialog() {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      // dialogConfig.disableClose = true;

      this.dialog.open(TypedialogComponent, {
        width: '35%',
        height:'75%', 
      }).afterClosed().subscribe((result) => {
        if (result) {
          console.log('i am resitl', result);
          result.data.amount = result.data.amount.replace("₹","");
          this.tenderService.createTender(result.data).subscribe(data => {
            this.toastr.success('Tender Created Successfully');
            this.getAllTenders();
          },
          errors => {
            this.toastr.error(errors.error, 'Failed Creation');
          });
        }
      });
  }

  updateFileDialog(row){
    console.log(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    // dialogConfig.disableClose = true;
    this.form= new FormGroup({
      code: new FormControl({value: row.code, disabled: true}, [Validators.required]),
      description: new FormControl(row.description, [Validators.required]),
      amount: new FormControl(this.formatMoney(row.amount), [Validators.required])
    });
    let dialogRef = this.dialog.open(TypedialogComponent, {
      width: '35%',
      height:'75%', 
      data: this.form
    });


    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('i am resitl', result);
        result.data.amount = result.data.amount.replace("₹","");
        this.tenderService.updateTender(row.code, result.data).subscribe(data => {
          this.toastr.success('Tender Updated Successfully');
          this.getAllTenders();
        },
        errors => {
          this.toastr.error(errors.error, 'Failed Updating');
        });
      }
    });
  }

  deleteFileDialog(code: string){
    const dialogRef = this.dialog.open(ConfirmdialogComponent, {
      data: {
          title: "Are you sure?",
          message: "You are about to delete a tender, Do you wish to continue ? "
        }
    });
    // listen to response
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.tenderService.deleteTender(code).subscribe(data => {
          this.toastr.success('Tender Deleted Successfully');
          this.getAllTenders();
        })
      }
  });
  }

  formatMoney(value) {
    const temp = `${value}`.replace(/\,/g, "");
    return this.currencyPipe.transform(temp).replace("$", "₹");
  }
}