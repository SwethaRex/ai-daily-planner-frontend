import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  async login() {
    const { data, error } = await this.auth.login(this.email, this.password);
    if (error) {
      alert(error.message);
      return;
    }
    await this.auth.storeToken();
    this.router.navigate(['/dashboard']);
  }
}
