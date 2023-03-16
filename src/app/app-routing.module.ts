import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MainContainerComponent } from './main-container/main-container.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  // { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '', component: HomePageComponent, pathMatch: 'full' },
  {
    path: 'questionnaire',
    component: MainContainerComponent,
    pathMatch: 'full',
  },
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent },
  // { path: 'flowpage', component: FlowMainContainerComponent },
  // { path: 'contentMang', component: ContentManagmentComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
