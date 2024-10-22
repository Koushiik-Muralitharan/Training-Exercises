import { Routes } from '@angular/router';
import { MainPageComponent } from './Components/main-page/main-page.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { SignInComponent } from './Components/sign-in/sign-in.component';
export const routes: Routes = [
    {path:'', component:SignInComponent},
    {path:'register', component:SignUpComponent},
    {path:'home', component:MainPageComponent}
];
