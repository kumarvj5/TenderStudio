import { Component, OnInit, Inject, Optional, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { TenderserviceService } from '../services/tenderservice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-expendituredialog',
  templateUrl: './expendituredialog.component.html',
  styleUrls: ['./expendituredialog.component.scss']
})
export class ExpendituredialogComponent implements OnInit {

  form: FormGroup;
  ngOnInit() {
  }
  title: string;
  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ExpendituredialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) private data : FormGroup,
    private toastr: ToastrService,
    private tenderService: TenderserviceService,
  ) {
    if (data === null) {
      this.form  = this.formBuilder.group({
        code: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
      });
      this.title = 'Create Expenditure';
    } else {
      this.form = data;
      this.title = 'Update Expenditure';
    }
  }

  submit(form) {
    this.dialogRef.close({ data: form.value });
  }
}


