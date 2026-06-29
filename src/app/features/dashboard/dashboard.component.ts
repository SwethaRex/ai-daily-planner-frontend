import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

import { ApiService } from '../../core/services/api.service';
import { AuthService } from '../../core/services/auth.service';
import { TaskFormComponent } from '../task-form/task-form.component';

interface ChatMessage {
  role: 'user' | 'assistant';
  text: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, TaskFormComponent, MatButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  // Dependency Injection
  private api = inject(ApiService);
  private auth = inject(AuthService);
  private router = inject(Router);

  // Signals
  tasks = signal<any[]>([]);
  plan = signal<any[]>([]);
  selectedTask = signal<any | null>(null);
  chatHistory = signal<ChatMessage[]>([]);
  showTaskForm = signal(false);
  isSending = signal(false);

  // Keep as normal property while using ngModel
  message = '';

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.api.getTasks().subscribe({
      next: (res: any) => {
        this.tasks.set(res);
      },
      error: (err) => {
        if (err.status === 401) {
          localStorage.removeItem('token');
          alert('Your session has expired. Please login again.');
          this.router.navigate(['/login']);
        } else {
          console.error('Failed to load tasks', err);
        }
      },
    });
  }

  planDay() {
    this.api.planDay().subscribe({
      next: (res: any) => {
        this.plan.set(res.plan);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  deleteTask(id: string) {
    this.api.deleteTask(id).subscribe({
      next: () => {
        this.loadTasks();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  editTask(task: any) {
    this.selectedTask.set(task);

    // Optional: automatically open the form
    this.showTaskForm.set(true);
  }

  onTaskSaved() {
    this.selectedTask.set(null);
    this.showTaskForm.set(false);
    this.loadTasks();
  }

  send() {
    const text = this.message.trim();

    if (!text || this.isSending()) {
      return;
    }

    this.chatHistory.update((history) => [
      ...history,
      {
        role: 'user',
        text,
      },
    ]);

    this.message = '';

    this.isSending.set(true);

    this.api.chat(text).subscribe({
      next: (res: any) => {
        this.chatHistory.update((history) => [
          ...history,
          {
            role: 'assistant',
            text: res.response,
          },
        ]);

        this.isSending.set(false);
      },
      error: () => {
        this.chatHistory.update((history) => [
          ...history,
          {
            role: 'assistant',
            text: 'Sorry, I encountered an error.',
          },
        ]);

        this.isSending.set(false);
      },
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
