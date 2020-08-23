import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MatDialogConfig, MatDialog, MatDialogRef } from '@angular/material';
import { MatSort} from '@angular/material/sort';
import { MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource} from '@angular/material/table';
import { TypedialogComponent } from '../typedialog/typedialog.component';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ConfirmdialogComponent } from '../confirmdialog/confirmdialog.component';
import { TenderserviceService } from '../services/tenderservice.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DialogData } from '../models/codetype';
import { ExpendituredialogComponent } from '../expendituredialog/expendituredialog.component';

@Component({
  selector: 'app-expendituretype',
  templateUrl: './expendituretype.component.html',
  styleUrls: ['./expendituretype.component.scss']
})
export class ExpendituretypeComponent implements OnInit {

  typeDialogRef: MatDialogRef<TypedialogComponent>;

  expenditureList: MatTableDataSource<any> = new MatTableDataSource([]);
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
              private dialog: MatDialog) { }

  ngOnInit() {
   this.getExpenditureTypes();
  }
  getExpenditureTypes() {
    this.tenderService.getExpenditureTypes().subscribe((res: any) => {
      this.loading = false;
      this.expenditureList = new MatTableDataSource(res);
      this.expenditureList.paginator = this.paginator;
      this.expenditureList.sort = this.sort;
      this.cd.detectChanges();
    });
  }

  ngAfterViewInit(): void{
    this.expenditureList.paginator = this.paginator;
    this.expenditureList.sort = this.sort;
  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.expenditureList.filter = filterValue.trim().toLowerCase();

    if (this.expenditureList.paginator) {
      this.expenditureList.paginator.firstPage();
    }
  }

  openFileDialog() {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      // dialogConfig.disableClose = true;

      this.dialog.open(ExpendituredialogComponent, {
        width: '25vw',
        height:'17vw',
        
      }).afterClosed().subscribe((result) => {
        if (result) {
          console.log('i am resitl', result);
          this.tenderService.createExpenditure(result.data).subscribe(data => {
            this.toastr.success('Expenditure Created Successfully');
            this.getExpenditureTypes();
          },
          errors => {
            this.toastr.error('Creating Expenditure Failed', 'Failed Creation');
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
      description: new FormControl(row.description, [Validators.required])
    });
    let dialogRef = this.dialog.open(ExpendituredialogComponent, {
      width: '25vw',
      height:'17vw', 
      data: this.form
    });


    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('i am resitl', result);
        this.tenderService.updateExpenditure(row.code, result.data).subscribe(data => {
          this.toastr.success('Expenditure Updated Successfully');
          this.getExpenditureTypes();
        },
        errors => {
          this.toastr.error('Updating Expenditure Failed', 'Failed Updating');
        });
      }
    });
  }

  deleteFileDialog(code: string){
    const dialogRef = this.dialog.open(ConfirmdialogComponent, {
      data: {
          title: "Are you sure?",
          message: "You are about to delete an expenditure, Do you wish to continue ? "
        }
    });
    // listen to response
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.tenderService.deleteExpenditure(code).subscribe(data => {
          this.toastr.success('Expenditure Deleted Successfully');
          this.getExpenditureTypes();
        })
      }
  });
  }
}
