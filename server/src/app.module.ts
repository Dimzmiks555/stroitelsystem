import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ObjectsModule } from './objects/objects.module';
import { NotesModule } from './notes/notes.module';
import { ApplicationsModule } from './applications/applications.module';
import { ContragentsModule } from './contragents/contragents.module';
import { TendersModule } from './tenders/tenders.module';
import { OrdersModule } from './orders/orders.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from './orders/entities/order.entity';

@Module({
  imports: [
    ObjectsModule, 
    NotesModule, 
    ApplicationsModule, 
    ContragentsModule, 
    TendersModule, 
    OrdersModule,
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'stroitel_system',
      sync: {alter: true},
      synchronize: true,
      autoLoadModels: true,
      models: [
        Order
      ],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
