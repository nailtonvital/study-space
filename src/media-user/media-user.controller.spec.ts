import { Test, TestingModule } from '@nestjs/testing';
import { MediaUserController } from './media-user.controller';
import { MediaUserService } from './media-user.service';

describe('MediaUserController', () => {
  let controller: MediaUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MediaUserController],
      providers: [MediaUserService],
    }).compile();

    controller = module.get<MediaUserController>(MediaUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
