import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  fruits:any;
  constructor(private _httpService:HttpService) {
    this.fruits=[];
    this._httpService.getPickupFruits().subscribe((data:any)=>{
      this.fruits=data;
    });
  }

  ngOnInit() {
  }

}
