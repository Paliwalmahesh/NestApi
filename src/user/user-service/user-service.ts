import { Injectable } from '@nestjs/common';
import { UserStrore } from '../../store/user-strore/user-strore';

@Injectable()
export class UserService {
  constructor(private readonly userStore: UserStrore) {}

  getall() {
    return this.userStore.get();
  }
}
