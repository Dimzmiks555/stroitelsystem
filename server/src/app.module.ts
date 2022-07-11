import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ObjectsModule } from './objects/objects.module';
import { NotesModule } from './notes/notes.module';
import { ContragentsModule } from './contragents/contragents.module';
import { TendersModule } from './tenders/tenders.module';
import { OrdersModule } from './orders/orders.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from './orders/entities/order.entity';
import { Contragent } from './contragents/entities/contragent.entity';
import { NomenklaturaModule } from './nomenklatura/nomenklatura.module';
import { Nomenklatura } from './nomenklatura/entities/nomenklatura.entity';
import { ObjectsModel } from './objects/entities/object.entity';
import { RealisationsModule } from './realisations/realisations.module';
import { CheckoutsModule } from './checkouts/checkouts.module';
import { CheckoutsProductsModule } from './checkouts-products/checkouts-products.module';
import { Checkout } from './checkouts/entities/checkout.entity';
import { CheckoutsProduct } from './checkouts-products/entities/checkouts-product.entity';
import { Note } from './notes/entities/note.entity';
import { NoteProductsModule } from './note-products/note-products.module';
import { NoteProduct } from './note-products/entities/note-product.entity';
import { PeopleModule } from './people/people.module';
import { Person } from './people/entities/person.entity';
import { DocumentModule } from './document/document.module';
import { Document } from './document/entities/document.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ContractsModule } from './contracts/contracts.module';
import { Contract } from './contracts/entities/contract.entity';
import { DealsModule } from './deals/deals.module';
import { Deal } from './deals/entities/deal.entity';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { PaymentModule } from './payment/payment.module';
import { Payment } from './payment/entities/payment.entity';
import { BankAccountModule } from './bank-account/bank-account.module';
import { BankAccount } from './bank-account/entities/bank-account.entity';
import { AvanseModule } from './avanse/avanse.module';
import { Avanse } from './avanse/entities/avanse.entity';
import { PriceModule } from './price/price.module';
import { Price } from './price/entities/price.entity';
import { ExpenseModule } from './expense/expense.module';
import { EventModule } from './event/event.module';
import { Event } from './event/entities/event.entity';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      serveRoot: '/public',
      rootPath: join(__dirname, '..', 'uploads'),
    }),
    SequelizeModule.forFeature([User]),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      // host: '192.168.1.75',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'stroitel_system',
      sync: {alter: true},
      synchronize: true,
      autoLoadModels: true,
      models: [
        Order,
        Contragent,
        Nomenklatura,
        ObjectsModel,
        Checkout,
        CheckoutsProduct,
        Note,
        NoteProduct,
        Person,
        Document,
        Contract,
        Deal,
        User,
        Payment,
        BankAccount,
        Avanse,
        Price,
        Event
      ],
    }),
    ObjectsModule, 
    NotesModule, 
    ContragentsModule, 
    TendersModule, 
    OrdersModule,
    NomenklaturaModule,
    RealisationsModule,
    CheckoutsModule,
    CheckoutsProductsModule,
    NoteProductsModule,
    PeopleModule,
    DocumentModule,
    ContractsModule,
    DealsModule,
    AuthModule,
    UsersModule,
    PaymentModule,
    BankAccountModule,
    AvanseModule,
    PriceModule,
    ExpenseModule,
    EventModule,
  ],
  controllers: [AppController],
  providers: [AppService, UsersService],
})
export class AppModule {}
