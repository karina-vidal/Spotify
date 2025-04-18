import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { TrackService } from '@modules/tracks/services/track.service';
import { TracksModule } from '@modules/tracks/tracks.module';
import { response } from 'express';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tracks-page',
  standalone: false,
  templateUrl: './tracks-page.component.html',
  styleUrl: './tracks-page.component.css'
})
export class TracksPageComponent implements OnInit, OnDestroy{
  tracksTrending: Array<TrackModel> = []
  tracksRandom: Array<TrackModel> = []

  listObservers$: Array<Subscription> = []

  constructor(private trackService: TrackService){}

  ngOnInit(): void{
    this.trackService.getAllTracks$()
     .subscribe((response: TrackModel[]) => {
       this.tracksTrending = response
     })
     this.trackService.getAllRandom$()
     .subscribe((response: TrackModel[]) => {
       this.tracksTrending = response
     })
  }

  ngOnDestroy(): void {
  }
}
