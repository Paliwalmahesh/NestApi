import { BookmarkDTO } from './DTO/bookmarkDTO';
import { BookmarkService } from './bookmark.service.';
import { Controller, Get, Param, Post, HttpCode } from '@nestjs/common';
import { NotImplementedException } from '@nestjs/common/exceptions';
import { Bookmark } from '@prisma/client';
import { HttpStatus } from '@nestjs/common/enums';

@Controller('bookmark')
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getById(@Param('id') id: string): Promise<Bookmark> {
    return await this.bookmarkService.getById(id);
  }
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(): Promise<Bookmark[]> {
    console.log('called');

    return await this.bookmarkService.getAll();
  }
  @Post()
  createBookmark(bookmark: BookmarkDTO) {
    this.bookmarkService.create(bookmark);
  }
}
