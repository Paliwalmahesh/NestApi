import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { BookmarkService } from './bookmark';
import { randomUUID } from 'crypto';
import { bookmarkDTO } from './dto/bookmarkDTO';
import { IRequest } from 'src/type';
import { NextFunction, Response } from 'express';

@Controller('/bookmark')
export class BookmarkController {
  constructor(private readonly appService: BookmarkService) {}

  @Get('')
  getall(@Req() request: IRequest) {
    return this.appService.get(request.userData.id);
  }

  @Post('')
  saveBookmark(@Req() request: IRequest) {
    const bookmark = {
      url: request.body.url,
      description: request.body.description,
      name: request.body.name,
      userId: request.userData.id,
    };
    return this.appService.save(bookmark);
  }

  @Get(':id')
  getbyId(@Param('id') id: string) {
    console.log('----' + id);

    return this.appService.getbyId(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appService.deleteById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() bookmark: bookmarkDTO) {
    return this.appService.update(id, bookmark);
  }
}
