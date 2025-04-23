import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable, Observer, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultimediaService {
  callback: EventEmitter<any> = new EventEmitter<any>()

  public trackInfo$: BehaviorSubject<any> = new BehaviorSubject(undefined)

  public audio!: HTMLAudioElement
  //myObservable1$: Subject<any> = new Subject()
 // myObservable1$: BehaviorSubject<any> = new BehaviorSubject('Tildess')
  constructor() {
   
    //this.myObservable1$ = new Observable(
      //(observer: Observer<any>) => {
        //observer.next('Tilde')

        //setTimeout(() => {
          //observer.complete()
        //}, 2500)

        //setTimeout(() => {
          //observer.next('2da Tilde')
        //}, 2500)

        //setTimeout(() => {
          //observer.error('3era Tilde')
        //}, 3500)
      //}
    //)
  }

  private listenAllEvents(): void{
    
  }
}
