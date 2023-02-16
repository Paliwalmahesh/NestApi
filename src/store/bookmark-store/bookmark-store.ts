import { Global, Injectable } from '@nestjs/common';

export type BookmarkEntity = {
  id: string;
  url: string;
  description: string;
  name: string;
  userId: string;
};
@Global()
@Injectable()
export class BookmarkStore {
  bookmarks: BookmarkEntity[] = [];

  get(id: string): BookmarkEntity[] {
    return this.bookmarks.filter((bookmarkentity: BookmarkEntity) => {
      if (bookmarkentity.userId == id) {
        return bookmarkentity;
      }
    });
  }
  getall(): BookmarkEntity[] {
    return this.bookmarks;
  }

  save(bookmark: BookmarkEntity) {
    this.bookmarks.push(bookmark);
    return {
      id: bookmark.id,
      name: bookmark.name,
      describe: bookmark.description,
      userId: bookmark.userId,
      url: bookmark.url,
    };
  }
  getById(id: string): BookmarkEntity {
    return this.bookmarks.find((bookmark) => bookmark.id == id);
  }

  deletebyId(id: string): BookmarkEntity[] {
    return this.bookmarks.filter((bookmark) => bookmark.id !== id);
  }
}
