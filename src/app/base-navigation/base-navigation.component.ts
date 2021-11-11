import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-base-navigation',
  templateUrl: './base-navigation.component.html',
  styleUrls: ['./base-navigation.component.css']
})
export class BaseNavigationComponent implements OnInit {

  constructor(private router: Router,) { }

  ngOnInit(): void {
  }

  // should be a shared service
  logOutUser(): void {
    sessionStorage.removeItem('domini_user_details')
    this.router.navigate(['/'])
  }

}
