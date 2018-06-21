import { Component, OnInit } from '@angular/core';
import { VideoService } from '../_services';
import {Video} from "../_models";

@Component({
    templateUrl: 'video-list.component.html',
    styles: []
})

export class VideoListComponent implements OnInit {
    videos: Video[] = [];

    model: any = {};
    loading = false;

    private f = 0;

    constructor(
        private videoService: VideoService) { }

    ngOnInit() {
      this.loadAllFiles(0);
    }

    download(doc: string) {
      window.location.href = doc;
    }

    pageOffset() {
      const inc_offset = this.f += 50;
      this.loadAllFiles(inc_offset);
    }

    private loadAllFiles(offset) {
      const load_all_ = this.videoService.getAllVideos(offset);
      load_all_.subscribe(videos => { this.videos = videos; });
    }
}
