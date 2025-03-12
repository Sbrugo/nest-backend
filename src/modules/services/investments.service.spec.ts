import { Test, TestingModule } from '@nestjs/testing';
import { InvestmentsService } from '@services/investments.service';

describe('InvestmentsService', () => {
  let service: InvestmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvestmentsService],
    }).compile();

    service = module.get<InvestmentsService>(InvestmentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add an investment', () => {
    const result = service.create({
      principal: 1000,
      rate: 0.05,
      years: 5,
    });
    expect(result).toBe('Investment added!');
  });
});
