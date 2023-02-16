import { Global, Module } from '@nestjs/common';
import { PowerController } from './power.controller';
import { PowerService } from './power.service';

@Global()
@Module({
  controllers: [PowerController],
  providers: [PowerService],
  exports: [PowerService],
})
export class PowerModule {}
