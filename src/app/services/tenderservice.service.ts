import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { DialogData } from "../models/codetype";
import { TenderData } from '../models/tenderData';
import { Observable, BehaviorSubject } from 'rxjs';
import { TenderViewData } from '../models/tenderDataView';

@Injectable({
  providedIn: "root",
})
export class TenderserviceService {

  constructor(private http: HttpClient) {}

  baseUrl = environment.tendersUrl;
  public breadsCrumbList: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  deleteTender(code: string) {
    return this.http.delete(this.baseUrl + "tendertype/" + code);
  }

  updateTender(code: string, typeModel: DialogData) {
    return this.http.put(this.baseUrl + "tendertype/" + code, typeModel);
  }

  getTendersList() {
    return this.http.get(this.baseUrl + "tendertype");
  }

  createTender(typeModel: DialogData) {
    return this.http.post(this.baseUrl + "tendertype", typeModel);
  }

  getTenderReportsList(tendertype: any) {
    return this.http.get(this.baseUrl + "tenders/" + tendertype);
  }

  getExpenditureTypes() {
    return this.http.get(this.baseUrl + "expenditure");
  }
  createExpenditure(typeModel: DialogData) {
    return this.http.post(this.baseUrl + "expenditure", typeModel);
  }
  updateExpenditure(code: string,typeModel: DialogData) {
    return this.http.put(this.baseUrl + "expenditure/" + code, typeModel);
  }

  deleteExpenditure(code: string) {
    return this.http.delete(this.baseUrl + "expenditure/" + code);
  }

  createTenderReport(tenderData: TenderData) {
    return this.http.post(this.baseUrl + "tenders", tenderData);
  }

  updateTenderReport(tenderReportId, tenderData: TenderData){
    return this.http.put(this.baseUrl + "tenders/"+tenderReportId, tenderData);
  }
  deleteTenderReport(tenderReportId){
    return this.http.delete(this.baseUrl + "tenders/"+tenderReportId);
  }

  getTenderReportsSplitList(tendertype: any){
    return this.http.get(this.baseUrl + "tenders/" + tendertype+'/split');
  }
  getAllTenderOverall(tendertype: any) {
    return this.http.get(this.baseUrl + "tenders/" + tendertype+'/overall');
  }
}
