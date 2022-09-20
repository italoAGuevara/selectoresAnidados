import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap, tap } from 'rxjs';
import { PaisSmall } from '../../interfaces/paises.interfaces';
import { PaisesService } from '../../services/paises.service';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styleUrls: ['./selector-page.component.scss']
})
export class SelectorPageComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    region: ['', Validators.required ],
    pais: ['', Validators.required ],
    frontera: ['', Validators.required ],
  })

  //Llenar selectores
  regiones: string[] = []
  paises : PaisSmall[] = []
  fronteras : string[] = []

  //UI
  cargando : boolean = false
  

  constructor( private fb : FormBuilder ,
               private paisesService : PaisesService ) { }

  ngOnInit(): void {

    this.regiones = this.paisesService.regiones

    //cuando cambie la region
    this.miFormulario.get('region')?.valueChanges
      .pipe(
        tap( ( _ ) => {
          this.miFormulario.get( 'pais' )?.reset( '' )
          this.cargando = true
        }),
        switchMap( region => this.paisesService.getPaisesPorRegion( region ) )
      )
      .subscribe( valor => {
        this.cargando = false
        this.paises = valor
      })

    //cuando cambia el pais 
    this.miFormulario.get('pais')?.valueChanges
      .pipe(
        tap( ( _ ) => {
          this.miFormulario.get( 'frontera' )?.reset( '' )
        }),
        switchMap( codigo=> this.paisesService.getFronteras( codigo ))
      )
      .subscribe( pais => {
        console.log( pais )
        this.fronteras = pais?.borders || []
      }) 

  }

  guardar(){
    console.log( this.miFormulario.value )
  }

}
