import { Component, OnInit, Inject, Optional, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { TenderserviceService } from '../services/tenderservice.service';
import { ToastrService } from 'ngx-toastr';
import { CurrencyPipe } from '@angular/common';



@Component({
  selector: 'app-typedialog',
  templateUrl: './typedialog.component.html',
  styleUrls: ['./typedialog.component.scss']
})
export class TypedialogComponent implements OnInit {
  form: FormGroup;
  ngOnInit() {
  }
  title: string;
  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<TypedialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) private data : FormGroup,
    private toastr: ToastrService,
    private tenderService: TenderserviceService,
    private currencyPipe: CurrencyPipe
  ) {
    if (data === null) {
      this.form  = this.formBuilder.group({
        code: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
        amount: new FormControl('', [Validators.required])
      });
      this.title = 'Create Tender';
    } else {
      this.form = data;
      console.log('ido idi', data);

      this.title = 'Update Tender';
    }
  }

  submit(form) {
    this.dialogRef.close({ data: form.value });
  }
  transformTotal() {
    const value = this.form.controls.amount.value;
    this.form.controls.amount.setValue(
      this.formatMoney(value.replace(/\,/g, "")), 
      {emitEvent: false}
    );
  }

  formatMoney(value) {
    const temp = `${value}`.replace(/\,/g, "");
    return this.currencyPipe.transform(temp).replace("$", "₹");
  }
}
