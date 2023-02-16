import { Injectable, Global } from '@nestjs/common';

export type User = {
  id: string;
  email: string;
  password: string;
};

@Global()
@Injectable()
export class UserStrore {
  users: User[] = [];

  save(user: User): any {
    this.users.push(user);
    return {
      id: user.id,
      email: user.email,
    };
  }
  get(): User[] {
    return this.users;
  }

  getbyEmail(email: string): User {
    return this.users.find((user) => user.email == email);
  }

  getById(id: string): User {
    return this.users.find((user) => user.id == id);
  }
}
