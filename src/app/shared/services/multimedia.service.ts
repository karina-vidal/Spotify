import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { response } from 'express';
import { BehaviorSubject, Observable, Observer, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultimediaService {
  callback: EventEmitter<any> = new EventEmitter<any>()

  public trackInfo$: BehaviorSubject<any> = new BehaviorSubject(undefined)
  public audio!: HTMLAudioElement
  public timeElapsed$: BehaviorSubject<any> = new BehaviorSubject('00:00')
  public timeRemaining$: BehaviorSubject<any> = new BehaviorSubject('-00:00')
  public playerStatus$: BehaviorSubject<any> = new BehaviorSubject('paused')
  public playerPercentage$: BehaviorSubject<any> = new BehaviorSubject(0)
  
  constructor() {
    this.audio = new Audio()
    this.trackInfo$.subscribe(responseOk => {
      if(responseOk){
        this.setAudio(responseOk)
        console.log('estas en el constructor', responseOk)
      }
     })
    this.listenAllEvents()
  }

  private listenAllEvents(): void{
    this.audio.addEventListener('timeupdate', this.calculateTime, false)
    this.audio.addEventListener('playing', this.setPlayerStatus, false)
    this.audio.addEventListener('play', this.setPlayerStatus, false)
    this.audio.addEventListener('pause', this.setPlayerStatus, false)
    this.audio.addEventListener('ended', this.calculateTime, false)
  }

  private setPlayerStatus = (state: any) => {
    console.log(':o', state)
    switch(state.type) {
      case 'play':
        this.playerStatus$.next('play')
        break
      case 'playing': 
        this.playerStatus$.next('playing')
        break
      case 'ended':
        this.playerStatus$.next('ended')
        break
      default: 
       this.playerStatus$.next('paused')
       break;
    }
  }

  private calculateTime = () => {
    const { duration, currentTime } = this.audio
    this.setTimeElapsed(currentTime)
    this.setRemaining(currentTime, duration)
    this.setPercentage(currentTime, duration)
  }

  private setPercentage(currentTime: number, duration: number): void{
    //TODO 
    let percentage = (currentTime * 100)/duration;
    this.playerPercentage$.next(percentage)
  }
  
  private setTimeElapsed(currentTime: number): void {
    let seconds = Math.floor(currentTime % 60) //TODO 1,2,3
    let minutes = Math.floor((currentTime / 60) % 60)
    //TODO  00:00 ---> 01:05 --> 10:15
    const displaySeconds = (seconds < 10) ? `0${seconds}` : seconds;
    const displayMinutes = (minutes < 10) ? `0${minutes}` : minutes;
    const displayFormat = `${displayMinutes}:${displaySeconds}`
    this.timeElapsed$.next(displayFormat)
  }

  private setRemaining(currentTime: number, duration: number): void {
    let timeLeft = duration - currentTime;
    let seconds = Math.floor(currentTime % 60) //TODO 1,2,3
    let minutes = Math.floor((currentTime / 60) % 60)
    //TODO  00:00 ---> 01:05 --> 10:15
    const displaySeconds = (seconds < 10) ? `0${seconds}` : seconds;
    const displayMinutes = (minutes < 10) ? `0${minutes}` : minutes;
    const displayFormat = `-${displayMinutes}:${displaySeconds}`
    this.timeRemaining$.next(displayFormat)
  }

  public setAudio(track: TrackModel): void {
    this.audio.src = `http://localhost:3001/${track.url.replace(/^\/+/, '')}` 
    console.log('🐱‍🏍🐱‍🏍🐱‍🏍🐱‍🏍🐱‍🏍', track);
    this.audio.play()
  }

  public togglePlayer(): void{
    (this.audio.paused) ? this.audio.play() : this.audio.pause()
  }
}
