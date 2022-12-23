import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { RestService } from './../rest.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-subir-imagen',
  templateUrl: './subir-imagen.component.html',
  styleUrls: ['./subir-imagen.component.css']
})
export class SubirImagenComponent implements OnInit{
  public visualizarIMG: string|undefined;
  public archivos: any = []
  //public loading: boolean

  constructor(private sanitizer: DomSanitizer, private rest: RestService){};
  ngOnInit(): void {
  }

  obtenerIMG(event: any) {
    const img = event.target.files[0]
    this.extraerBase64(img).then((imagen: any) => {
      this.visualizarIMG = imagen.base;
      console.log(imagen)
    })
    this.archivos.push(img)

  }


  extraerBase64 = async ($event: any) => new Promise((resolve, reject):any => {
    try {
      const obtURL = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(obtURL);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };

    } catch (e) {
      return null;
    }
  })

  postIMG(): any {
    console.log('subir img')
    try {
      const formularioDeDatos = new FormData();
      this.archivos.forEach(archivo => {
        formularioDeDatos.append('files', archivo)
      })
      let heades = new HttpHeaders()
      this.rest.post(`https://apitest-bt.herokuapp.com/api/v1/imagenes`, formularioDeDatos)
        .subscribe(res => {
          console.log('Respuesta del servidor', res);
        }, () => {
          alert('Error');
        })
    } catch (e) {
      console.log('ERROR', e);

    }
  }

}
