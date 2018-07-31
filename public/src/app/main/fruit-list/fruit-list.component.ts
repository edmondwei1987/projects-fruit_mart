import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../http.service';

declare var $:any;

@Component({
  selector: 'app-fruit-list',
  templateUrl: './fruit-list.component.html',
  styleUrls: ['./fruit-list.component.css','../../app.component.css']
})
export class FruitListComponent implements OnInit {
  fruits:any;
  noSearchResult='';
  constructor(private _route:ActivatedRoute,private _router:Router,private _httpService:HttpService) { 
    this.fruits=[];
    this._httpService.getFruitList().subscribe((data:any)=>{
      if(data.error){
        this._router.navigate(['/']);
      }else{
        this.fruits=data;
      }
    });
  }

  ngOnInit() {
  }

  onKey(event:any){
    var zipcode=event.target.value;
    if(zipcode.length==5){
      this._httpService.getFruitListWithZipcode(zipcode).subscribe((data:any)=>{
        this.fruits=data;
        if(data.length==0){
          this.noSearchResult='No Fruits Result in this Area'
        }else{
          this.noSearchResult='';
        }
      });
    }else if(zipcode.length>0){
      this.noSearchResult='No Fruits Result in this Area'
    }else{
      this.noSearchResult='';
    }
  }

  flipCard(event){
    $('#'+event.target.id).parents('.flipcard-container').find('.front').toggleClass('front-flipped');
    $('#'+event.target.id).parents('.flipcard-container').find('.back').toggleClass('back-flipped');
  }

  confirmPickup(event){
    this._httpService.confirmPickUp(event.target.id).subscribe((data:any)=>{
      if(data.error){
        console.log(data.error);
      }else{
        this._httpService.getFruitList().subscribe((data:any)=>{
          if(data.error){
            this._router.navigate(['/']);
          }else{
            this.fruits=data;
          }
        });
      }
    });
  }
}
