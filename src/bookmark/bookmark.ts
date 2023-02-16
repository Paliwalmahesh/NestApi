// import { Bookmark } from '@prisma/client';

import { Injectable } from '@nestjs/common';
import {
  BookmarkEntity,
  BookmarkStore,
} from 'src/store/bookmark-store/bookmark-store';
import { bookmarkDTO } from './dto/bookmarkDTO';
import { UserStrore } from 'src/store/user-strore/user-strore';
import { PrismaService } from 'src/prisma/prisma.service';
import { Bookmark } from '@prisma/client';

@Injectable()
export class BookmarkService {
  constructor(
    private readonly bookStore: BookmarkStore,
    private readonly UserStrore: UserStrore,
    private readonly prismaService: PrismaService,
  ) {}
  async get(id: string): Promise<Bookmark[]> {
    return await this.prismaService.bookmark.findMany({
      where: {
        userId: id,
      },
    });
  }

  async save(Bookmark: bookmarkDTO) {
    return await this.prismaService.bookmark.create({
      data: {
        url: Bookmark.url,
        userId: Bookmark.userId,
        name: Bookmark.name,
        description: Bookmark.description,
      },
    });
  }

  async getbyId(id: string) {
    return await this.prismaService.bookmark.findFirst({
      where: {
        id: id,
      },
    });
  }

  async deleteById(id: string) {
    return await this.prismaService.bookmark.delete({
      where: {
        id: id,
      },
    });
  }

  update(id: string, Bookmark: bookmarkDTO) {}
}
