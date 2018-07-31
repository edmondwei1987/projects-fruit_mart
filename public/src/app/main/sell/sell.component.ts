import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';
import { FileUploadService } from '../../file-upload.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})
export class SellComponent implements OnInit {

  fruit:any;
  errors:any;

  constructor(private _httpService:HttpService,private _uploadService:FileUploadService,private _router:Router) { 
    this.fruit={name:'',description:'',price:'',unit:'',address:'',city:'',state:'',zipcode:'',picture:null,pickTimeFrom:null,pickTimeTo:null}
  }

  ngOnInit() {
  }
  addMyFruit(){
    this._httpService.addFruit(this.fruit).subscribe((data:any)=>{
      if(data.error){
         console.log(data.error);
         if(data.error=='unauthorized user'){
           this._router.navigate(['/']);
         }else{
           this.errors=data.error;
         }
      }else{
        this._uploadService.upload(this.fruit.picture,data._id).subscribe((data:any)=>{
          if(data.error){
            this.errors=['upload image failed!'];
          }else{
            this._router.navigate(['/main/myfruit']);
          }
        });
      }
    });
  }
  getImage(event){
    this.fruit.picture=event.target.files.item(0);
  }

}
