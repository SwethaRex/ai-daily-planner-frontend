import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  private baseUrl = 'https://ai-daily-planner-backend.onrender.com/';

  private getHeaders() {
    const token = localStorage.getItem('token');

    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getTasks() {
    return this.http.get(`${this.baseUrl}/tasks`, {
      headers: this.getHeaders(),
    });
  }

  createTask(task: any) {
    return this.http.post(`${this.baseUrl}/tasks`, task, {
      headers: this.getHeaders(),
    });
  }

  planDay() {
    return this.http.post(
      `${this.baseUrl}/ai/plan`,
      {},
      {
        headers: this.getHeaders(),
      },
    );
  }
  chat(message: string) {
    return this.http.post(
      `${this.baseUrl}/ai/chat`,
      { message },
      {
        headers: this.getHeaders(),
      },
    );
  }

  deleteTask(id: string) {
    return this.http.delete(`${this.baseUrl}/tasks/${id}`, {
      headers: this.getHeaders(),
    });
  }

  updateTask(id: string, task: any) {
    return this.http.put(`${this.baseUrl}/tasks/${id}`, task, {
      headers: this.getHeaders(),
    });
  }
}
