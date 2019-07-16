import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'first-use', loadChildren: './first-use/first-use.module#FirstUsePageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'user', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'user/profile/user-details', loadChildren: './user-details/user-details.module#UserDetailsPageModule' },
  { path: 'user/profile/insurance-details', loadChildren: './insurance-details/insurance-details.module#InsuranceDetailsPageModule' },
  { path: 'user/profile/pair-watch', loadChildren: './pair-watch/pair-watch.module#PairWatchPageModule' },
  { path: 'user/profile/faq', loadChildren: './faq/faq.module#FaqPageModule' }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
