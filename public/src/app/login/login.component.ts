import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css','../app.component.css']
})
export class LoginComponent implements OnInit {
  user:any;
  error:any;
  constructor(private _httpService:HttpService,private _router:Router) { 
    this.user={
      username:'',
      password:'',
    }
    this.error='';
  }

  ngOnInit() {
  }
  login(){
    this._httpService.login(this.user).subscribe((data:any)=>{
      if(data.errors){
        console.log(data.errors);
        this.error='wrong username or password'
      }else if(data.msg){
        this.error=data.msg;
      }else{
        this._router.navigate(['/main/fruitlist']);
      }
    });
  }
}
