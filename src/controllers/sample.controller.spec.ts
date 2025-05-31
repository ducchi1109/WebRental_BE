import { Test, TestingModule } from '@nestjs/testing';
import { SampleController } from './sample.controller';
import { SampleService } from '@/modules/sample/sample.service';

describe('SampleController', () => {
  let sampleController: SampleController;
  const mockedSampleService = {
    getHello: jest.fn(),
  } as any;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SampleController],
      providers: [
        {
          provide: SampleService,
          useValue: mockedSampleService,
        },
      ],
    }).compile();

    sampleController = app.get<SampleController>(SampleController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      mockedSampleService.getHello.mockReturnValue('Hello World!');
      expect(sampleController.getHello()).toBe('Hello World!');
    });
  });
});
