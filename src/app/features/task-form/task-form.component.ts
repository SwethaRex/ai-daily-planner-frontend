import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [FormsModule, MatButtonModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css',
})
export class TaskFormComponent {
  taskCreated = output();
  editTaskData: any = input(null);
  loading = false;
  task: any = {
    title: '',
    description: '',
    priority: '',
    deadline: '',
    estimated_time: null,
  };

  constructor(private api: ApiService) {}

  ngOnInit() {
    console.log(this.editTaskData());
    if (this.editTaskData) {
      this.task = { ...this.editTaskData() };
    }
  }
  submit() {
    this.loading = true; //start loading

    const request = this.task.id
      ? this.api.updateTask(this.task.id, this.task) //edit
      : this.api.createTask(this.task); //create

    request.subscribe(
      () => {
        this.loading = false; //stop loading
        //clear form
        this.task = {
          title: '',
          description: '',
          priority: '',
          deadline: '',
          estimated_time: null,
        };

        //notify parent(dashboard)
        this.taskCreated.emit();
      },
      (err) => {
        this.loading = false; //stops loading on error event
        console.error(err);
        alert('Failed to create task');
      },
    );
  }
}
