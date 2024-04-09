import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';

export type Appointment = {
  id: string;
  title: string;
  date: Date;
  description: string;
};

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private appointments = new BehaviorSubject<Appointment[]>([
    {
      id: '79d46bdf-4918-49c6-b9b9-5d4340c18be3',
      title: 'Appointment test',
      description: 'Appointment test description',
      date: new Date('04-11-2024'),
    },
  ]);

  appointments$: Observable<Appointment[]> = this.appointments.asObservable();

  addAppointment(appointment: Appointment): void {
    const appointments = [...this.appointments.getValue(), appointment];
    this.appointments.next(appointments);
  }

  removeAppointment(id: string) {
    const appointments = [...this.appointments.getValue()].filter(
      (item) => item.id !== id
    );
    this.appointments.next(appointments);
  }

  getAppointmentsByDate(date: Date) {
    return this.appointments$
      .pipe(
        map((appointments) =>
          appointments.filter(
            (appointment) =>
              appointment.date.toDateString() === date.toDateString()
          )
        )
      )
      .subscribe((filteredAppointments) => {
        console.log('filteredAppointments', filteredAppointments);
        this.appointments.next(filteredAppointments);
      });
  }
}
