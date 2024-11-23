import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

declare const google: any;

@Component({
  selector: 'app-location-map',
  templateUrl: './location-map.component.html',
  styleUrls: ['./location-map.component.css'],
})
export class LocationMapComponent implements AfterViewInit {
  fromLocation: string = '';
  toLocation: string = '';
  distance: number | null = null;

  map: any;
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();

  ngAfterViewInit(): void {
    this.initMap();
  }

  initMap() {
    this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
      center: { lat: 0, lng: 0 },
      zoom: 2,
    });
    this.directionsRenderer.setMap(this.map);
  }

  calculateDistance() {
    if (!this.fromLocation || !this.toLocation) {
      alert('Please enter both locations');
      return;
    }

    const request = {
      origin: this.fromLocation,
      destination: this.toLocation,
      travelMode: google.maps.TravelMode.DRIVING,
    };

    this.directionsService.route(request, (result: any, status: any) => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.directionsRenderer.setDirections(result);

        const route = result.routes[0];
        const distance = route.legs[0].distance.value / 1000; // distance in km
        this.distance = Math.round(distance * 100) / 100; // Round to 2 decimal places
      } else {
        alert('Could not calculate the distance. Please check your inputs.');
      }
    });
  }
}
