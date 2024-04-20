import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  apiDef(): object {
    return {
      name: 'Tmo Api',
      description: 'The Tmo API',
      version: '1.0.0',
      docs: '/docs',
    };
  }
}
