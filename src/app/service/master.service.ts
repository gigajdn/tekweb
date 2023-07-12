import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http: HttpClient) { }

  GetAllInvoice(){
    return this.http.get('http://localhost:3000/invoices');
  }

  GetInvHeaderbycode(invoiceno:any){
    return this.http.get('http://localhost:3000/invoices/'+invoiceno);
  }
  GetInvDetailbycode(invoiceno:any){
    return this.http.get('http://localhost:3000/invoices/'+invoiceno);
  }
  RemoveInvoice(invoiceno:any){
    return this.http.delete('http://localhost:3000/invoices/'+invoiceno);
  }

  SaveInvoice(invoicedata:any){
    return this.http.post('http://localhost:3000/invoices/',invoicedata);
  }

  GenerateInvoicePDF(invoiceno:any){
    return this.http.get('http://localhost:3000/invoices/'+invoiceno,{observe:'response',responseType:'blob'});
    
  }



}
