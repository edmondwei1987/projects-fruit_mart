import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private _http:HttpClient) { }
  register(user){
    return this._http.post('/api/users',user);
  }
  login(user){
    return this._http.post('/api/login',user);
  }
  getFruitList(){
    return this._http.get('/api/fruitlist');
  }
  logout(){
    return this._http.get('/api/logout');
  }
  getUser(){
    return this._http.get('/api/user');
  }
  updateUser(user){
    return this._http.patch('/api/user/'+user._id,user);
  }
  addFruit(fruit){
    return this._http.post('/api/fruits',fruit);
  }
  getMyFruitList(){
    return this._http.get('/api/myfruits');
  }
  getFruitListWithZipcode(zipcode){
    return this._http.get('/api/fruitlist/'+zipcode);
  }
  updateFruit(fruit){
    return this._http.patch('/api/fruits',fruit);
  }
  deleteFruit(fruit_id){
    return this._http.delete('/api/fruits/'+fruit_id);
  }
  confirmPickUp(fruit_id){
    return this._http.post('/api/confirmpickup',{fruit_id:fruit_id});
  }
  getPickupFruits(){
    return this._http.get('/api/pickupfruits');
  }
}