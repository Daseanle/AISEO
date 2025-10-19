import { useState } from 'react';

interface Suggestion {
  title: string;
  description: string;
  h1: string;
  outline: string[];
  keywords: string[];
}

export default function Home() {
  const [topic, setTopic] = useState('AI SEO');
  const [keywords, setKeywords] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Suggestion | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const params = new URLSearchParams({ topic });
      if (keywords.trim()) params.set('keywords', keywords);
      const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const res = await fetch(`${base}/seo/suggest?${params.toString()}`);
      if (!res.ok) throw new Error(await res.text());
      const json = (await res.json()) as Suggestion;
      setData(json);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : '请求失败';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ maxWidth: 720, margin: '2rem auto', fontFamily: 'system-ui, sans-serif' }}>
      <h1>AISEO 工具（MVP）</h1>
      <p>输入一个主题/关键词，生成 SEO 标题、描述、结构化大纲等建议。</p>
      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12, marginTop: 12 }}>
        <label>
          主题
          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="例如：AI 写作、跨境电商"
            style={{ width: '100%', padding: 8, marginTop: 4 }}
          />
        </label>
        <label>
          关键词（可选，逗号分隔）
          <input
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="AI 写作, SEO, 内容生成"
            style={{ width: '100%', padding: 8, marginTop: 4 }}
          />
        </label>
        <button type="submit" disabled={loading} style={{ padding: '8px 12px' }}>
          {loading ? '生成中…' : '生成建议'}
        </button>
      </form>

      {error && (
        <p style={{ color: 'crimson', marginTop: 16 }}>出错了：{error}</p>
      )}

      {data && (
        <section style={{ marginTop: 24 }}>
          <h2>结果</h2>
          <div style={{ padding: 12, border: '1px solid #ddd', borderRadius: 8 }}>
            <p>
              <strong>Title：</strong>
              {data.title}
            </p>
            <p>
              <strong>Description：</strong>
              {data.description}
            </p>
            <p>
              <strong>H1：</strong>
              {data.h1}
            </p>
            <p>
              <strong>Keywords：</strong>
              {data.keywords.join('、')}
            </p>
            <div>
              <strong>Outline：</strong>
              <ol>
                {data.outline.map((it, i) => (
                  <li key={i}>{it}</li>
                ))}
              </ol>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
