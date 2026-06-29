import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  email = '';
  password = '';

  constructor(
    private router: Router,
    private auth: AuthService,
  ) {}

  async signup() {
    const { data, error } = await this.auth.signup(
      this.email.trim(),
      this.password,
    );
    if (error) {
      if (error.status === 429) {
        alert('Too many signup attempts. Please try again later.');
      } else {
        alert(error.message);
      }
      return;
    }

    alert('Signup successful! Check your email.');
    console.log(data);
    await this.auth.storeToken();
    this.router.navigate(['/dashboard']);
  }
}
