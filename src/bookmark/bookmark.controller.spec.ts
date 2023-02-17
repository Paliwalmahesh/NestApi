import { BookmarkDTO } from './DTO/bookmarkDTO';
import { Controller } from '@nestjs/common';
import { BookmarkService } from './bookmark.service.';
import { Test, TestingModule } from '@nestjs/testing';
import { BookmarkController } from './bookmark.controller';

describe('BookmarkController', () => {
  let controller: BookmarkController;
  let service: BookmarkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: BookmarkService,
          useFactory: () => {
            return { getAll: jest.fn(), create: jest.fn(), getById: jest.fn() };
          },
        },
      ],
      controllers: [BookmarkController],
    }).compile();

    controller = module.get<BookmarkController>(BookmarkController);
    service = module.get(BookmarkService);
  });

  it('should be called', () => {
    expect(controller).toBeDefined();
  });

  it(' shoud get All  ', async () => {
    await controller.getAll();
    expect(service.getById).toBeCalledTimes(1);
  });
  it(' shoud get by id  ', async () => {
    await controller.getById('');
    expect(service.getAll).toBeCalledTimes(1);
  });

  it('should create bookmark', async () => {
    const bookmarkDto: BookmarkDTO = {
      name: 'sample',
      url: 'sample.com',
      description: 'sample description',
      userId: 'sample,user',
    };
    jest
      .spyOn(service, 'create')
      .mockResolvedValueOnce({ id: 'fejeoie', ...bookmarkDto });
    await controller.createBookmark(bookmarkDto);
    expect(service.create).toBeCalledWith(bookmarkDto);
    expect(service.create).toBeCalledTimes(1);
  });
});
