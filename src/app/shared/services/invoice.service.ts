import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IInvoice, CreateInvoiceRequest, CheckoutRequest, CheckoutResponse } from '../interfaces/i-invoice';
import { ApiResponse } from './auth';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private baseUrl = 'http://127.0.0.1:8000/api/v1';

  constructor(private http: HttpClient) {}

  createInvoice(invoiceData: CreateInvoiceRequest): Observable<ApiResponse<IInvoice>> {
    return this.http.post<ApiResponse<IInvoice>>(`${this.baseUrl}/invoices`, invoiceData);
  }

  processCheckout(checkoutData: CheckoutRequest): Observable<CheckoutResponse> {
    return this.http.post<CheckoutResponse>(`${this.baseUrl}/checkout`, checkoutData);
  }
}