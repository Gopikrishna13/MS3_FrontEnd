import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private baseUrl = 'http://localhost:5102/api/Report';
  private apiUrl = 'http://localhost:5102/api/Report/InventoryManagement';
  private apiUrlReport = 'http://localhost:5102/api/Report/UserHistory';

  constructor(private http: HttpClient) {}

  getTotalUsers(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/TotalUsers`);
  }

  getTotalBikes(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/TotalBikes`);
  }

  getBookedBikes(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/BookedBikes`);
  }

  getRevenue(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/Revenue`);
  }

  getRevenueByMonth(): Observable<{ month: string; count: number }[]> {
    return this.http.get<{ month: string; count: number }[]>(`${this.baseUrl}/GetRevenueByMonth`);
  }
  
  getRevenueByBike(): Observable<{ modelName: string; revenue: number }[]> {
    return this.http.get<{ modelName: string; revenue: number }[]>(`${this.baseUrl}/GetRevenueByBike`);
  }

  getInventoryManagement(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getUserHistory(): Observable<any> {
    return this.http.get<any>(this.apiUrlReport);
  }
  
}
