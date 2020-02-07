import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
{ path: '', redirectTo: '/hom', pathMatch: 'full'},
{ path: 'family-member', loadChildren: () => import('./family-member/family-member.module').then(m => m.FamilyMemberModule) },
{ path: 'feature-start', loadChildren: () => import('./feature-start/feature-start.module').then(m => m.FeatureStartModule) },
{ path: 'login-page',loadChildren: () => import('./login-page/login-page.module').then(m => m.LoginPageModule) },
{ path: '', redirectTo: '' , pathMatch: 'full'},
{ path: 'stepper-page', loadChildren: () => import('./stepperpage/stepperpage.module').then(m => m.StepperpageModule) },
{ path: 'database', loadChildren: () => import('./database/database.module').then(m => m.DatabaseModule) }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
