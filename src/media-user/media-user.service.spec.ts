import { Test, TestingModule } from '@nestjs/testing';
import { MediaUserService } from './media-user.service';

describe('MediaUserService', () => {
  let service: MediaUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MediaUserService],
    }).compile();

    service = module.get<MediaUserService>(MediaUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
