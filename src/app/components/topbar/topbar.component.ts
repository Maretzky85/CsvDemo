import {Component, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  isNavbarCollapsed = true;

  constructor(public data: DataService) {
  }

  ngOnInit() {
  }

  fileChange(event) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      const formData: FormData = new FormData();
      formData.append('file', file, file.name);
      this.data.uploadFile(formData).subscribe(value => {
        event.target.files = null;
        this.data.getUsers(this.data.getCurrentInputParams());
      }, error => {
        alert('error uploading file');
      });
    }
  }

}
