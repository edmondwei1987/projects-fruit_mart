import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class FileUploadService {

  constructor(private _http:HttpClient) { }
  upload(picture,fruitId){
    var formData = new FormData();
    formData.append('picture', picture, picture.name);
    return this._http.post('/upload/'+fruitId,formData);
  }
}
