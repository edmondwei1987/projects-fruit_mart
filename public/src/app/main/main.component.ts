import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  
  constructor(private _httpService:HttpService,private _router:Router) { }

  ngOnInit() {
  }
  logout(){
    this._httpService.logout().subscribe(data=>{
      this._router.navigate(['/']);
    });
  }

}
