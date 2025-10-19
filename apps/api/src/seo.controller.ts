import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { SeoService, SeoSuggestion } from './seo.service.js';

@Controller('seo')
export class SeoController {
  constructor(private readonly seo: SeoService) {}

  @Get('suggest')
  suggest(@Query('topic') topic?: string, @Query('keywords') keywords?: string): SeoSuggestion {
    if (!topic || topic.trim().length === 0) {
      // simple validation; in real app, use class-validator DTOs
      throw new BadRequestException('topic is required');
    }
    const kw = (keywords ?? '')
      .split(',')
      .map((k) => k.trim())
      .filter(Boolean);
    return this.seo.suggest(topic, kw);
  }

  @Get('health')
  health() {
    return { ok: true };
  }
}
