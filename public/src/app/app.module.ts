import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HttpService } from './http.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule} from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MainComponent } from './main/main.component';
import { FruitListComponent } from './main/fruit-list/fruit-list.component';
import { MyFruitComponent } from './main/my-fruit/my-fruit.component';
import { ScheduleComponent } from './main/schedule/schedule.component';
import { ProfileComponent } from './main/profile/profile.component';
import { SellComponent } from './main/sell/sell.component';
import { FileUploadService } from './file-upload.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MainComponent,
    FruitListComponent,
    MyFruitComponent,
    ScheduleComponent,
    ProfileComponent,
    SellComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [HttpService,FileUploadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
