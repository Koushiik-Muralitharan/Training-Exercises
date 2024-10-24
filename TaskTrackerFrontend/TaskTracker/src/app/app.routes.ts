import { Routes } from '@angular/router';
import { AddTaskPageComponent } from './Components/add-task-page/add-task-page.component';
import { HomeComponent } from './Components/home/home.component';
import { SignInComponent } from './Components/sign-in/sign-in.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
export const routes: Routes = [
    {path:'', component:SignInComponent},
    {path:'register', component:SignUpComponent},
    {path:'home', component:HomeComponent},
    {path:'taskpage', component:AddTaskPageComponent}
];
