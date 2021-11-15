import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventState } from '../ngrx/app.state';
import { CallerService } from '../services/caller.service';
import { Store } from '@ngrx/store';
import { EventActionTypes, retrievedEventsList, clearEvent } from '../ngrx/actions/event.actions';

@Component({
  selector: 'app-base-navigation',
  templateUrl: './base-navigation.component.html',
  styleUrls: ['./base-navigation.component.css']
})
export class BaseNavigationComponent implements OnInit {

  constructor(private router: Router, private callerService: CallerService, private store: Store<EventState>) { }

  ngOnInit(): void {
  }

  // should be a shared service
  logOutUser(): void {
    this.callerService.logOutUser().subscribe({
      next: (res) => {
        sessionStorage.removeItem('domini_user_details')
        this.store.dispatch(clearEvent())
        this.router.navigate(['/'])
      },
      error: (err) => {
        this.router.navigate(['/']) // maybe show a message
      }
    })
    
  }

  get showLogOut(): boolean {
    return this.router.url.includes('/dashboard')
  }

  get showDashboardLink(): boolean {
    return sessionStorage.getItem('domini_user_details') && !this.router.url.includes('/dashboard') ? true : false;
  }

}
