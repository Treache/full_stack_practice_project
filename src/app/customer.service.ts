
import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse, HttpHeaders, HttpResponse, HttpParams } from  '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private _http: HttpClient) { }

  getCustomers(filter?,status?) {
    return this._http.get('http://localhost:3000/api/customers', {params: this.httpParameterizer(filter, status)});
  }
  newCustomer(customer) {
    return this._http.post('http://localhost:3000/api/customers',customer);
  }
  getCustomer(id) {
    // return this._http.get("");
  }

  httpParameterizer(filter, status) {
    let parameters = new HttpParams();
    if(filter)
      parameters = parameters.set("dfilter", filter);
    if(status != null && status != undefined && status != 'undefined')
      parameters = parameters.set("status", status)
    return parameters;
  }
}
