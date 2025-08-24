export interface IUser {
  CustomerId: number;
  FirstName: string;
  LastName: string;
  Company?: string;
  Address?: string;
  City?: string;
  State?: string;
  Country?: string;
  PostalCode?: string;
  Phone?: string;
  Fax?: string;
  Email: string;
  SupportRepId?: number;
  RoleId?: number;
}