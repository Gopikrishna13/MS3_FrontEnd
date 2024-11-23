import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { BikeService } from '../bike.service';

@Component({
  selector: 'app-bike',
  templateUrl: './bike.component.html',
  styleUrls: ['./bike.component.css'],
})
export class BikeComponent {
  bikeForm: FormGroup;

  constructor(private fb: FormBuilder, private bikeService: BikeService) {
    this.bikeForm = this.fb.group({
      modelName: ['', Validators.required],
      bikeUnits: this.fb.array([this.createBikeUnit()]),
      image: [null, Validators.required],
    });
  }

  get bikeUnits(): FormArray {
    return this.bikeForm.get('bikeUnits') as FormArray;
  }

  createBikeUnit(): FormGroup {
    return this.fb.group({
      registrationNumber: ['', Validators.required],
      year: [null, [Validators.required, Validators.min(1900)]],
      rentPerDay: [null, [Validators.required, Validators.min(0)]],
    });
  }

  addBikeUnit() {
    this.bikeUnits.push(this.createBikeUnit());
  }

  removeBikeUnit(index: number) {
    this.bikeUnits.removeAt(index);
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.bikeForm.patchValue({ image: file });
  }

  submitForm() {
    if (this.bikeForm.invalid) {
      console.error('Form is invalid');
      return;
    }

    const formData = this.bikeForm.value;

    this.bikeService.addBike({
      modelName: formData.modelName,
      bikeUnits: formData.bikeUnits,
    }).subscribe(
      (response) => {
        console.log('Bike added successfully:', response);
        const unitId = response[0]?.unitId;
        if (unitId) {
          this.uploadImage(unitId, formData.image);
        }
      },
      (error) => {
        console.error('Error adding bike:', error);
      }
    );
  }

  uploadImage(unitId: number, imageFile: File) {
    this.bikeService.uploadImage(unitId, imageFile).subscribe(
      (response) => {
        console.log('Image uploaded successfully:', response);
      },
      (error) => {
        console.error('Error uploading image:', error);
      }
    );
  }
}
