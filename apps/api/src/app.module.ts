import { Module } from '@nestjs/common';
import { SeoController } from './seo.controller.js';
import { SeoService } from './seo.service.js';

@Module({
  imports: [],
  controllers: [SeoController],
  providers: [SeoService]
})
export class AppModule {}
