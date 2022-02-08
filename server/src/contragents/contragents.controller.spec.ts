import { Test, TestingModule } from '@nestjs/testing';
import { ContragentsController } from './contragents.controller';
import { ContragentsService } from './contragents.service';

describe('ContragentsController', () => {
  let controller: ContragentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContragentsController],
      providers: [ContragentsService],
    }).compile();

    controller = module.get<ContragentsController>(ContragentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
