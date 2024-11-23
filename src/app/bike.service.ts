import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BikeService {
  private addBikeUrl = 'http://localhost:5102/api/Bike/AddBike';
  private uploadImageUrl = 'http://localhost:5102/api/Bike/UploadImages';

  constructor(private http: HttpClient) {}

  addBike(bikeData: any): Observable<any> {
    return this.http.post(this.addBikeUrl, bikeData);
  }

  uploadImage(unitId: number, imageFile: File): Observable<any> {
    const formData = new FormData();
    formData.append('UnitId', unitId.toString());
    formData.append('Image', imageFile, imageFile.name);

    return this.http.post(this.uploadImageUrl, formData);
  }
}
