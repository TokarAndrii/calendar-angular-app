import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  Appointment,
  AppointmentService,
} from '../../core/services/appointment.service';

@Component({
  selector: 'app-appointment-list',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './appointment-list.component.html',
  styleUrl: './appointment-list.component.css',
})
export class AppointmentListComponent {
  appointments: Appointment[] = [];

  @Input() selectedDate: Date | null = null;

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.appointmentService.appointments$.subscribe((appointments) => {
      if (this.selectedDate) {
        this.appointments = appointments.filter((appointment) => {
          return (
            appointment.date.toDateString() ===
            this.selectedDate?.toDateString()
          );
        });
      } else {
        this.appointments = [];
      }
    });
  }

  ngOnChanges(): void {
    if (this.selectedDate) {
      this.appointmentService.appointments$.subscribe((appointments) => {
        this.appointments = appointments.filter((appointment) => {
          return (
            appointment.date.toDateString() ===
            this.selectedDate?.toDateString()
          );
        });
      });
    } else {
      // Handle case where selectedDate is null
      this.appointments = [];
    }
  }

  deleteAppointment(id: string): void {
    this.appointmentService.removeAppointment(id);
  }
}
