export interface IInvoice {
  InvoiceId?: number;
  CustomerId: number;
  InvoiceDate?: string;
  BillingAddress?: string;
  BillingCity?: string;
  BillingState?: string;
  BillingCountry?: string;
  BillingPostalCode?: string;
  Total: number;
}

export interface CreateInvoiceRequest {
  CustomerId: number;
  InvoiceDate?: string;
  BillingAddress?: string;
  BillingCity?: string;
  BillingState?: string;
  BillingCountry?: string;
  BillingPostalCode?: string;
  Total: number;
}

export interface CheckoutRequest {
  customer_id: number;
  tracks: CheckoutTrack[];
  billing_address?: string;
  billing_city?: string;
  billing_state?: string;
  billing_country?: string;
  billing_postal_code?: string;
}

export interface CheckoutTrack {
  track_id: number;
  quantity: number;
}

export interface CheckoutResponse {
  message: string;
  data: {
    invoice: IInvoice;
    total_amount: number;
    items_count: number;
  };
}