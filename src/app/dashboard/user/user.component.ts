import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {

  constructor(private router: Router) {}

  ngOnInit() {
    this.auth();
  }

  auth() {    
    if (localStorage.getItem('role') !== "user"){
      this.router.navigate(['/login']);
    }    
  }
}
