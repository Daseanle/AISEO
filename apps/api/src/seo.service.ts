import { Injectable } from '@nestjs/common';

export interface SeoSuggestion {
  title: string;
  description: string;
  h1: string;
  outline: string[];
  keywords: string[];
}

@Injectable()
export class SeoService {
  suggest(topic: string, inputKeywords?: string[]): SeoSuggestion {
    const base = topic.trim();

    const keywords = this.generateKeywords(base, inputKeywords);
    const title = this.generateTitle(base, keywords);
    const description = this.generateDescription(base, keywords);
    const h1 = this.generateH1(base);
    const outline = this.generateOutline(base, keywords);

    return {
      title,
      description,
      h1,
      outline,
      keywords
    };
  }

  private generateKeywords(topic: string, provided?: string[]): string[] {
    const seed = [topic.toLowerCase()];
    const extras = [
      `${topic} 指南`,
      `${topic} 教程`,
      `${topic} 最佳实践`,
      `${topic} SEO`,
      `${topic} 技巧`
    ];
    const merged = [...(provided ?? []), ...seed, ...extras].map((k) => k.trim());
    // unique & limit
    return Array.from(new Set(merged)).slice(0, 8);
  }

  private generateTitle(topic: string, keywords: string[]): string {
    const k = keywords[0] ?? topic;
    return `${topic}：完整指南与最佳实践（${k}）`;
  }

  private generateDescription(topic: string, keywords: string[]): string {
    const top = keywords.slice(0, 3).join('、');
    return `这是一篇关于“${topic}”的实用指南，涵盖 ${top} 等核心要点，帮助你快速理解并应用到实际场景。`;
  }

  private generateH1(topic: string): string {
    return `${topic}：从入门到进阶`;
  }

  private generateOutline(topic: string, keywords: string[]): string[] {
    return [
      `什么是 ${topic}`,
      `${topic} 的核心概念`,
      `${topic} 的常见误区`,
      `${topic} 的最佳实践`,
      `如何开始使用 ${topic}`,
      `延伸阅读：${keywords.slice(0, 5).join('、')}`
    ];
  }
}
