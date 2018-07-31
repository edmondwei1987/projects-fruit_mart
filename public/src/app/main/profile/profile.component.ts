import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user:any;
  constructor(private _httpService:HttpService,private _router:Router) {
    this.user={email:'',username:'',phone:null};
    this._httpService.getUser().subscribe((data:any)=>{
      if(data.error){
        this._router.navigate(['/']);
      }else{
        this.user=data;
      }
    });
  }

  ngOnInit() {
  }
  updateUser(){
    this._httpService.updateUser(this.user).subscribe(data=>{
      // console.log(data);
      this.user=data;
    });
  }

}
