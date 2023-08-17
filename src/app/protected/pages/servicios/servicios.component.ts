import { Component, OnInit } from '@angular/core';
import { ServiciosService } from 'src/app/services/servicios.service';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit{
  servicios!: any;
  constructor(private servicio: ServiciosService) { }
  ngOnInit(): void {
    this.servicio.getAllServicios().subscribe(res => {
      this.servicios = res;
      console.log(res);
    })
  }

}
