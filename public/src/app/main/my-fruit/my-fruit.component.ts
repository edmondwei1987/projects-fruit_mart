import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';
import { Router } from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-my-fruit',
  templateUrl: './my-fruit.component.html',
  styleUrls: ['./my-fruit.component.css','../../app.component.css']
})
export class MyFruitComponent implements OnInit {
  fruits:any;
  constructor(private _httpService:HttpService,private _router:Router) { 
    this._httpService.getMyFruitList().subscribe((data:any)=>{
      this.fruits=data;
    });
  }

  ngOnInit() {
  }
  flipCard(event){
    $('#'+event.target.id).parents('.flipcard-container').find('.front').toggleClass('front-flipped');
    $('#'+event.target.id).parents('.flipcard-container').find('.back').toggleClass('back-flipped');
  }
  flipCardUpdate(event){
    for(var i=0;i<this.fruits.length;i++){
      if(this.fruits[i]._id==event.target.id){
        console.log(this.fruits[i]);
        this._httpService.updateFruit(this.fruits[i]).subscribe(data=>{
        });
        $('#'+event.target.id).parents('.flipcard-container').find('.front').toggleClass('front-flipped');
        $('#'+event.target.id).parents('.flipcard-container').find('.back').toggleClass('back-flipped');
        break;
      }
    }
    
  }

  deleteFruit(event){
    this._httpService.deleteFruit(event.target.name).subscribe((data:any)=>{
      for(var i=0;i<this.fruits.length;i++){
        if(this.fruits[i]._id==event.target.name){
          this.fruits.splice(i,1);
        }
      }
      // this._router.navigate(['/main/myfruit']);
    });
  }

}
