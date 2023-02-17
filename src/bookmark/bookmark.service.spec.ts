import { Bookmark } from '@prisma/client';
import { PrismaService } from './../prisma/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { BookmarkService } from './bookmark.service.';
import { BookmarkDTO } from './DTO/bookmarkDTO';

describe('Bookmark', () => {
  let provider: BookmarkService;
  let prisma: PrismaService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookmarkService,
        {
          provide: PrismaService,
          useFactory: () => {
            return {
              bookmark: {
                findMany: jest.fn(),
                create: jest.fn(),
                findUnique: jest.fn(),
              },
            };
          },
        },
      ],
    }).compile();

    provider = module.get<BookmarkService>(BookmarkService);
    prisma = module.get(PrismaService);
  });

  it('Should be get all Bookmarks', async () => {
    await provider.getAll();
    expect(await prisma.bookmark.findMany).toBeCalledTimes(1);
  });
  it('Should be get all Bookmarks', async () => {
    await provider.getById('');
    expect(await prisma.bookmark.findUnique).toBeCalledTimes(1);
  });
  it('should be create bookmark', async () => {
    const bookmarkDto: BookmarkDTO = {
      name: 'sample',
      url: 'sample.com',
      description: 'sample description',
      userId: 'sample,user',
    };
    await provider.create(bookmarkDto);
    expect(prisma.bookmark.create).toBeCalledTimes(1);
  });
});
