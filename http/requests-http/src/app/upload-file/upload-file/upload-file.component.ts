import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { filterResponse, uploadProgress } from 'src/app/shared/rxjs-operators';
import { environment } from 'src/environments/environment';
import { UploadFileService } from '../upload-file.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

  files: Set<File>

  progress: number = 0

  constructor(
    private uploadFileService: UploadFileService
  ) { }

  ngOnInit(): void {
  }

  onChange(event: any) {

    const selectedFiles = <FileList>event.target.files
    const fileNames = []
    this.files = new Set()
    for (let file = 0; file < selectedFiles.length; file++) {
      fileNames.push(selectedFiles[file].name)
      this.files.add(selectedFiles[file])
    }
    this.progress = 0
    //console.log(fileNames)
  }

  onUpload() {
    if (this.files && this.files.size > 0) {
      this.uploadFileService.upload(this.files, environment.BASE_URL + '/uploads')
        .pipe(
          uploadProgress(progress => {
            console.log(progress)
            this.progress = progress
          }),
          filterResponse()
        )
        .subscribe(response => console.log('Upload Concluído'))
      /**
      .subscribe((event: any) => {
        console.log(event)
        if (event.type === HttpEventType.Response) {
          console.log('Upload Concluído');
        }
        else if (event.type === HttpEventType.UploadProgress){
          const percentDone = Math.round((event.loaded * 100) / event.total);
          console.log(`Progresso: ${percentDone}`)
          this.progress = percentDone
        }
      }
      )
      **/
    }
  }

  downFile(name: string, ext: string) {
    if (ext === 'xlsx') {
      var path = '/downloadExcel'
    } else {
      var path = '/downloadPDF'
    }
    this.uploadFileService.download(environment.BASE_URL + path)
      .subscribe((res: any) => {
        this.uploadFileService.handleFile(res, `${name}.${ext}`)
      })
  }
 
  downExcel() {
   this.downFile('report', 'xlsx')
  }


  downPDF() {
    this.downFile('report', 'pdf')
  }
}
