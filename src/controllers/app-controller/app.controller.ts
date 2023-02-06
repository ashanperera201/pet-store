import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('App')
@Controller('api/app')
export class AppController {

  constructor() { }

  @Get()
  getWelcomeMessage(): string {
    return "Welcome to the pet store API"
  }
}
