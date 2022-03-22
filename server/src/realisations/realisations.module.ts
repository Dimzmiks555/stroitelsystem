import { Module } from '@nestjs/common';
import { RealisationsService } from './realisations.service';
import { RealisationsController } from './realisations.controller';
import { HttpModule } from '@nestjs/axios'

@Module({
  imports: [HttpModule],
  controllers: [RealisationsController],
  providers: [RealisationsService]
})
export class RealisationsModule {}
