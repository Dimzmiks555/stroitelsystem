import { Test, TestingModule } from '@nestjs/testing';
import { ContragentsService } from './contragents.service';

describe('ContragentsService', () => {
  let service: ContragentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContragentsService],
    }).compile();

    service = module.get<ContragentsService>(ContragentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
