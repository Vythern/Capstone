import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { TripDataService } from '../services/trip-data.service';

@Component({
  selector: 'app-delete-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './delete-trip.component.html',
  styleUrls: ['./delete-trip.component.css']
})
export class DeleteTripComponent implements OnInit {
  public deleteForm!: FormGroup;
  tripName: string = '';  // Store the trip name for display
  submitted = false;
  message: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripDataService: TripDataService
  ) { }

  ngOnInit(): void {
    // Retrieve stashed trip code (ID) from localStorage
    const tripCode = localStorage.getItem("tripCode");
    if (!tripCode) {
      alert("Couldn't find the trip code!");
      this.router.navigate(['']);
      return;
    }

    // Initialize the form with the trip code and a confirmation question
    this.deleteForm = this.formBuilder.group({
      code: [tripCode, Validators.required],
      name: ['', Validators.required] // We will set this later
    });

    // We can set the tripName here for display in the template
    this.tripDataService.getTrip(tripCode).subscribe({
      next: (value: any) => {
        if (value && value.length > 0) {
          this.tripName = value[0].name; // Extract the trip name from the response
          this.deleteForm.patchValue({
            name: this.tripName
          });
        }
      },
      error: (error: any) => {
        console.error('Error retrieving trip details:', error);
      }
    });
  }

  // Simplified onSubmit function to delete the trip
  public onSubmit(): void {
    this.submitted = true;
    if (this.deleteForm.valid) {
      const tripCode = this.deleteForm.value.code;

      // Call the deleteTrip method to perform the deletion
      this.tripDataService.deleteTrip(tripCode).subscribe({
        next: () => {
          console.log(`Trip with code ${tripCode} deleted successfully.`);
          this.router.navigate(['']); // Redirect after deletion
        },
        error: (error) => {
          console.error('Error deleting trip:', error);
        }
      });
    }
  }

  // Getter to access form controls
  get f() { return this.deleteForm.controls; }
}
