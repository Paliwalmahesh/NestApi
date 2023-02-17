import { BookmarkDTO } from './dto/bookmarkDTO';
import { Bookmark } from '@prisma/client';
import { PrismaService } from './../prisma/prisma.service';
// import { NotImplementedException } from '@nestjs/common/exceptions';
import { Injectable, NotImplementedException } from '@nestjs/common';

@Injectable()
export class BookmarkService {
  constructor(private readonly prismaService: PrismaService) {}
  getById(id: string): PromiseLike<Bookmark> {
    return this.prismaService.bookmark.findUnique({
      where: {
        id: id,
      },
    });
  }
  getAll(): Promise<Bookmark[]> {
    return this.prismaService.bookmark.findMany();
  }
  create(bookmark: BookmarkDTO) {
    return this.prismaService.bookmark.create({
      data: {
        ...bookmark,
      },
    });
  }
}
