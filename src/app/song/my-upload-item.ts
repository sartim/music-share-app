import { UploadItem } from '../_models/upload-item';

export class MyUploadItem extends UploadItem {
  constructor(file: any) {
    super();
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.url = 'https://promoh.herokuapp.com/api/v1/song/';
    this.headers = { 'Authorization': 'JWT '+currentUser.token };
    this.file = file;
  }
}
