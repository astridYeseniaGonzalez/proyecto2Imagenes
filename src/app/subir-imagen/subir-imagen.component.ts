import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { RestService } from './../rest.service';

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
    })
    this.archivos.push(img)

  }


  extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
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

}
