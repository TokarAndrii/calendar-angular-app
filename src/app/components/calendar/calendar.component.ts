import { Component } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';

import {
  MatDatepickerInputEvent,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AppointmentCreateDialogComponent } from '../appointment-create-dialog/appointment-create-dialog.component';
import { AppointmentListComponent } from '../appointment-list/appointment-list.component';

import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AppointmentListComponent,
    AppointmentCreateDialogComponent,
    MatButtonModule,
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
})
export class CalendarComponent {
  constructor(public dialog: MatDialog) {}

  selectedDate: Date | null = null;

  onDateSelected(event: MatDatepickerInputEvent<any, any>): void {
    const selectedDate = event.value;
    this.selectedDate = selectedDate;
  }

  openAppointmentDialog(): void {
    const dialogRef = this.dialog.open(AppointmentCreateDialogComponent, {
      width: '500px',
      height: '500px',
      data: {
        selectedDate: this.selectedDate,
      },
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     // Handle saving the appointment using result data
    //   }
    // });
  }
}
