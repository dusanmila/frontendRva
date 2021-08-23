import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './components/core/about/about.component';
import { AuthorComponent } from './components/core/author/author.component';
import { HomeComponent } from './components/core/home/home.component';
import { GrupaComponent } from './components/grupa/grupa.component';
import { ProjekatComponent } from './components/projekat/projekat.component';
import { SmerComponent } from './components/smer/smer.component';

//ovde dodajemo rute
const routes: Routes = [

 { path: 'smer', component: SmerComponent},
 {path: 'grupa', component: GrupaComponent},
 {path: 'projekat', component: ProjekatComponent},
 {path: 'home', component: HomeComponent},
 {path: 'about', component: AboutComponent},
 {path: 'author', component: AuthorComponent},
 { path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
