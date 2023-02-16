import { Injectable } from '@nestjs/common';
import {
  BookmarkEntity,
  BookmarkStore,
} from 'src/store/bookmark-store/bookmark-store';
import { randomUUID } from 'crypto';
import { bookmarkDTO } from './dto/bookmarkDTO';
import { userModule } from './../user/user.module';
import { Auth } from './../auth/auth';
import { user } from './../user/user.controller';
import { UserStrore } from 'src/store/user-strore/user-strore';

@Injectable()
export class Bookmark {
  constructor(
    private readonly bookStore: BookmarkStore,
    private readonly UserStrore: UserStrore,
  ) {}
  get(id: string) {
    return this.bookStore.get(id);
  }
  getall() {
    return this.bookStore.getall();
  }

  save(Bookmark: bookmarkDTO) {
    const id = randomUUID();
    const bookmark: BookmarkEntity = {
      id: id,
      url: Bookmark.url,
      description: Bookmark.description,
      name: Bookmark.name,
      userId: Bookmark.userId,
    };
    return this.bookStore.save(bookmark);
  }

  getbyId(id: string) {
    return this.bookStore.getById(id);
  }

  deleteById(id: string) {
    return this.bookStore.deletebyId(id);
  }

  update(id: string, Bookmark: bookmarkDTO) {}
}
