import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ObjectsModule } from './objects/objects.module';
import { NotesModule } from './notes/notes.module';
import { ApplicationsModule } from './applications/applications.module';
import { ContragentsModule } from './contragents/contragents.module';
import { TendersModule } from './tenders/tenders.module';

@Module({
  imports: [ObjectsModule, NotesModule, ApplicationsModule, ContragentsModule, TendersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
