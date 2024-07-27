import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, MatIconModule,
    MatButtonModule
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

  thoughts = 'This Clockered App is my child project which i have started working from July 2024. My Goal of this is to create a Super App with all angular(as of now) or java spring boot if needed.';
  socialLinks = [
    { icon: 'F', name: 'Facebook', url: 'https://www.facebook.com/gogulakrishnan.mgk'},
    { icon: 'I', name: 'Instagram', url: 'https://www.instagram.com/mgk_the_king/'},
    { icon: 'X', name: 'X', url: 'https://x.com/voice_of_mg'},
    { icon: 'L', name: 'LinkedIn', url: 'https://www.linkedin.com/in/gokulakrishnan-m-843101108/'}
  ]

}
