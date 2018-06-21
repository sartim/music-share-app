import { UploadItem } from '../_models/upload-item';

export class MyUploadItem extends UploadItem {
  constructor(file: any, url: string) {
    super();
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.url = url;
    this.headers = { 'Authorization': 'JWT '+currentUser.token };
    this.file = file;
  }
}
