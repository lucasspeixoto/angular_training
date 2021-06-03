import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UploadFileService } from '../upload-file.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

  files: Set<File>

  constructor(
    private uploadFileService: UploadFileService
  ) { }

  ngOnInit(): void {
  }

  onChange(event: any) {
    const selectedFiles = <FileList>event.target.files
  
    const fileNames = []
    this.files = new Set()
    for (let file=0; file<selectedFiles.length; file++) {
      fileNames.push(selectedFiles[file].name)
      this.files.add(selectedFiles[file])
    }

    console.log(fileNames)
  }

  onUpload() {
    if (this.files && this.files.size > 0) {
      this.uploadFileService.upload(this.files, environment.BASE_URL +  '/uploads' )
      .subscribe(response => console.log('Upload Concluído'))
    }
  }
}
