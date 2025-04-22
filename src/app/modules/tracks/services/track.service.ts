import { Injectable } from '@angular/core';
import { merge, Observable, of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { TrackModel } from '@core/models/tracks.model';


@Injectable({
  providedIn: 'root'
})
export class TrackService {
  private readonly URL = environment.api

  constructor(private http: HttpClient) { 
  } 
  private skipById(listTracks: TrackModel[], id: number): Promise<TrackModel[]> {
    return new Promise((resolve, reject) => {
      const listTmp = listTracks.filter(a => a._id !== id)
      resolve(listTmp)
    })
  }

  //Devolcer todas las canciones 
  getAllTracks$(): Observable<any> {
    return this.http.get(`${this.URL}/tracks`)
      .pipe(
        map(({ data }: any) => {
          return data
        }),
        catchError((err) => {
          const { status, statusText } = err;
          console.log('Algo paso en Tracks, Revisamee', [status, statusText]);
          return of([])
         })
      )
  }
  getAllRandom$(): Observable<any> {
    return this.http.get(`${this.URL}/tracks`)
      .pipe(
        mergeMap(({ data }: any) => this.skipById(data, 2)),
       // map((dataRevertida) => { //TODO: aplicar un filter comun de array
         // return dataRevertida.filter( (track: TrackModel) => track._id !== 1)
       // })
       tap(data => console.log('Ok Ok Ok', data)),
       catchError((err) => {
        const { status, statusText } = err;
        console.log('Algo paso en Random, Revisamee', [status, statusText]);
        return of([])
       })
      )
  }
}
