import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPanelRoutingModule } from './admin-panel-routing-module';
import { Dashboard } from './dashboard/dashboard';
import { Layout } from './layout/layout';
import { Tracks } from './tracks/tracks';
import { SharedModule } from '../shared/shared.module';
import { DashboardCard } from './dashboard/components/dashboard-card/dashboard-card';
import { EditTrackModal } from './tracks/components/edit-track-modal/edit-track-modal';
import { TrackEditCard } from './tracks/components/track-edit-card/track-edit-card';

@NgModule({
  declarations: [
    Dashboard,
    Layout,
    Tracks,
    DashboardCard,
    EditTrackModal,
    TrackEditCard
  ],
  imports: [
    CommonModule,
    AdminPanelRoutingModule,
    SharedModule
  ]
})
export class AdminPanelModule { }
