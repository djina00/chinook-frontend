import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TracksRoutingModule } from './tracks-routing.module';
import { TrackCard } from './components/track-card/track-card';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    TrackCard
  ],
  imports: [
    CommonModule,
    TracksRoutingModule,
    SharedModule
  ],
  exports: [
    TrackCard
  ]
})
export class TracksModule { }