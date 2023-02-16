import { Body, Controller, Post } from '@nestjs/common';
import { Auth } from './auth';
import { authDto } from './dto/authDTO';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: Auth) {}

  @Post('/signup')
  async sigup(@Body() authdata: authDto) {
    // console.log("called");
    return this.authService.saveuser(authdata);
  }
  @Post('/signin')
  async sigin(@Body() authdata: authDto) {
    return this.authService.signin(authdata);
  }
}
