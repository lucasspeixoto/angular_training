import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(
    private http: HttpClient
  ) { }

  upload(files: Set<File>, url: string) {

    const formData = new FormData()
    files.forEach(file => formData.append('file', file, file.name))

    //Opção 1
    /* const request = new HttpRequest('POST', url, formData)
    return this.http.request(request) */

    //Opção 2
    return this.http.post(url, formData, {
      observe: 'events',
      reportProgress: true
    })
  }

  download(url: string) {
    return this.http.get(url, {
      responseType: 'blob' as 'json'
      //reportProgress: Backend tem que setar o content-length pois o Angular só vai saber após terminar o download.
      //content-length:
    })
  }

  handleFile(res: any, fileName: string) {
      const file = new Blob([res], {
        type: res.type
      })

      //IE
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(file)
      }

      const blob = window.URL.createObjectURL(file)

      const link = document.createElement('a')
      link.href = blob
      link.download = fileName

      //link.click() 
      //OU -->
      link.dispatchEvent(new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window
      }))

      setTimeout(() => { //Timeout necessário no firefox
        window.URL.revokeObjectURL(blob)
        link.remove()
      }, 200);

    }
  
  
}
