import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CallerService } from '../services/caller.service';

@Component({
  selector: 'app-base-navigation',
  templateUrl: './base-navigation.component.html',
  styleUrls: ['./base-navigation.component.css']
})
export class BaseNavigationComponent implements OnInit {

  constructor(private router: Router, private callerService: CallerService) { }

  ngOnInit(): void {
  }

  // should be a shared service
  logOutUser(): void {
    this.callerService.logOutUser().subscribe({
      next: (res) => {
        sessionStorage.removeItem('domini_user_details')
        this.router.navigate(['/'])
      },
      error: (err) => {
        this.router.navigate(['/']) // maybe show a message
      }
    })
    
  }

}
