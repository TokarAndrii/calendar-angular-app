import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { v4 as uuidv4 } from 'uuid';

import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AppointmentService } from '../../core/services/appointment.service';

@Component({
  selector: 'app-appointment-create-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './appointment-create-dialog.component.html',
  styleUrl: './appointment-create-dialog.component.css',
})
export class AppointmentCreateDialogComponent {
  //   @Input() selectedDate: Date | null = null;

  appointmentCreateForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private readonly appointmentService: AppointmentService,
    public dialogRef: MatDialogRef<AppointmentCreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.appointmentCreateForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  createAppointment() {
    if (this.data.selectedDate) {
      this.appointmentService.addAppointment({
        id: uuidv4(),
        date: this.data.selectedDate,
        title: this.appointmentCreateForm.value.title,
        description: this.appointmentCreateForm.value.description,
      });

      this.dialogRef.close();
    }
  }
}
