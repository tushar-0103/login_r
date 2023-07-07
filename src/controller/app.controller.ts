import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AppService } from '../app.service';
import { LocalAuthGuard } from '../auth/guards/local-auth.guard';
import { AuthenticatedGugard } from '../auth/guards/authenticated.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Request() req) {
    return req.user;
  }

  @Get('/protected')
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(AuthenticatedGugard)
  @Get('profile')
  profile(@Request() req) {
    return {
      msg: 'You an authorised user',
      user: req.user,
    };
  }

  @Post('logout')
  logout(@Request() req) {
    req.session.destroy();
    return { msg: ' You are logged out' };
  }
}
