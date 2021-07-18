import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatePipe } from './state.pipe';
import { SafePipe } from './safe.pipe';
import { ConversationNamePipe } from './conversation-name.pipe';

@NgModule({
  declarations: [
      StatePipe,
      SafePipe,
      ConversationNamePipe
  ],
  imports: [
    CommonModule,
  ],
  exports:[
    StatePipe,
    SafePipe,
    ConversationNamePipe
  ]
})
export class PipesModule {}
