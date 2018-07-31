import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css','../app.component.css']
})
export class RegisterComponent implements OnInit {
  user:any;
  errors:any;
  constructor(private _httpService:HttpService,private _router:Router) { 
    this.user={
      username:'',
      email:'',
      password:'',
      cpassword:'',
    }
    this.errors=[];
  }

  ngOnInit() {
  }

  register(){
    this._httpService.register(this.user).subscribe((data:any)=>{
      if(data.errors){
        // console.log(data.errors);
        this.errors=data.errors;
      }else{
        this._router.navigate(['/login']);
      }
    });
  }
}
