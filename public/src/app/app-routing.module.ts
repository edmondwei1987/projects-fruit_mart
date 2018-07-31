import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ScheduleComponent } from './main/schedule/schedule.component';
import { MainComponent } from './main/main.component';
import { MyFruitComponent } from './main/my-fruit/my-fruit.component';
import { FruitListComponent } from './main/fruit-list/fruit-list.component';
import { ProfileComponent } from './main/profile/profile.component';
import { SellComponent } from './main/sell/sell.component';

const routes: Routes = [
  {path:'',pathMatch:'full',redirectTo:'login'},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'schedule',component:ScheduleComponent},
  {path:'main',component:MainComponent,children:[
    {path:'myfruit',component:MyFruitComponent},
    {path:'profile',component:ProfileComponent},
    {path:'fruitlist',component:FruitListComponent},
    {path:'schedule',component:ScheduleComponent}, 
    {path:'sell',component:SellComponent},  
    {path:'mypickups',component:ScheduleComponent}      
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
