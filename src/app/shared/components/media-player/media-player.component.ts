import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { MultimediaService } from '@shared/services/multimedia.service';
import { response } from 'express';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-media-player',
  standalone: false,
  templateUrl: './media-player.component.html',
  styleUrl: './media-player.component.css'
})
export class MediaPlayerComponent implements OnInit, OnDestroy{
  listObservers$: Array<Subscription> = [];
  mockCover!: TrackModel;
  constructor(public multimediaService: MultimediaService){}

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    this.listObservers$.forEach( u => u.unsubscribe())
    console.log('BOOMMMMM media-playes.component.tssssssss!');
  }
}
