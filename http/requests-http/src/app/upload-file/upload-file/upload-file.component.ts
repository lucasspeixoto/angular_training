import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

  inputFileText: string

  constructor() { }

  ngOnInit(): void {
  }

  onChange(event: any) {
    const selectedFiles = <FileList>event.target.files
    console.log(selectedFiles)
   
    const fileNames = []
    for (let file=0; file<selectedFiles.length; file++) {
      fileNames.push(selectedFiles[file].name)
    }

    console.log(fileNames)
  }
}
