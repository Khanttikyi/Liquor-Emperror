import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../loading-toast/alert-model/alert.service';

@Component({
  selector: 'app-error1',
  templateUrl: './error1.component.html',
})
export class Error1Component implements OnInit {
  constructor(private alert: AlertService, private location: Location) { }

  ngOnInit(): void {
    this.alert.activate("View is now under development", "Warning Message")
    this.location.back()
  }
}
