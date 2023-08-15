import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AccesoriosComponent } from './components/accesorios/accesorios.component';
import { ServiciosComponent } from './components/servicios/servicios.component';
import { RepuestosComponent } from './components/repuestos/repuestos.component';
import { ParatiComponent } from './components/parati/parati.component';
import { BuscadorComponent } from './components/buscador/buscador.component';

const routes: Routes = [
  /** Define la ruta de los dos modulos usando carga perezosa */
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'buscador',
    component: BuscadorComponent,
  },
  {
    path: 'accesorios',
    component: AccesoriosComponent,
  },
  {
    path: 'servicios',
    component: ServiciosComponent,
  },
  {
    path: 'repuestos',
    component: RepuestosComponent,
  },
  {
    path: 'parati',
    component: ParatiComponent,
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.module').then((module) => module.AuthModule),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./protected/protected.module').then(
        (module) => module.ProtectedModule
      ),
  },
  {
    path: '**',
    redirectTo: 'auth',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
