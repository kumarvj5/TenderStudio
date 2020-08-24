import { Component, OnInit, Inject, Optional } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { TenderserviceService } from '../services/tenderservice.service';
import { ActivatedRoute } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-itemdialog',
  templateUrl: './itemdialog.component.html',
  styleUrls: ['./itemdialog.component.scss']
})
export class ItemdialogComponent implements OnInit {
expenditureTypeList: Array<any> = [];
  form: FormGroup;
  ngOnInit() {
    this.getExpenditureTypeList();
  }

  title: string;
  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ItemdialogComponent>,
    private activatedRoute: ActivatedRoute,
    private tenderService: TenderserviceService,
    @Optional() @Inject(MAT_DIALOG_DATA) private data : FormGroup,
    private currencyPipe : CurrencyPipe
  ) {
    if (data === null) {
      this.form  = this.formBuilder.group({
        itemName: new FormControl('', [Validators.required]),
        expenditureType: new FormControl('', [Validators.required]),
        amount : new FormControl('', [Validators.required])
      });
      this.title = 'Create Item';
    } else {
      this.form = data;
      console.log('endo idi', data);
      this.title = 'Update Item';
    }
  }

  getExpenditureTypeList() {
    this.tenderService.getExpenditureTypes().subscribe((res: any) => {
      this.expenditureTypeList = res;
    });
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
