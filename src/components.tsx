import { useState, type ReactNode } from 'react';
import { ArrowDownRight, BookOpenText, ExternalLink } from 'lucide-react';

export type SourceKind = 'gita' | 'commentary' | 'bengali' | 'interpretation';

const sourceLabels: Record<SourceKind, string> = {
  gita: 'GĪTĀ 4.8',
  commentary: 'COMMENTARY',
  bengali: 'BENGALI / SANSKRIT TERMS',
  interpretation: 'INTERPRETASI',
};

export function SourceBadge({ kind }: { kind: SourceKind }) {
  return <span className={`source-badge source-${kind}`}>{kind === 'commentary' ? <span lang="ja"><ruby>日本語<rt>にほんご</rt></ruby><ruby>解説<rt>かいせつ</rt></ruby></span> : sourceLabels[kind]}</span>;
}

export function SlideFrame({ number, section, title, subtitle, page, onSource, children, className = '' }: {
  number: string;
  section: string;
  title: ReactNode;
  subtitle?: string;
  page?: 316 | 317 | 318;
  onSource?: (page: 316 | 317 | 318) => void;
  children: ReactNode;
  className?: string;
}) {
  return <article className={`slide frame ${className}`}>
    <div className="slide-masthead"><span>BG / 4.8</span><span>{section.toUpperCase()}</span></div>
    <header className="slide-heading">
      <div className="eyebrow"><span className="small-rule" /> {number} / {section}</div>
      <h1>{title}</h1>
      {subtitle && <p className="slide-subtitle">{subtitle}</p>}
    </header>
    <div className="slide-content">{children}</div>
    <footer className="slide-foot">
      <span>BHAGAVAD-GĪTĀ · PEMBACAAN TEKS JEPANG</span>
      {page && onSource ? <button type="button" onClick={() => onSource(page)} className="source-link"><BookOpenText size={18} /> Lihat sumber · hlm. {page} <ExternalLink size={14} /></button> : <span>HALAMAN 316—318</span>}
    </footer>
    <span className="edge-number" aria-hidden="true">{number}</span>
  </article>;
}

export function QuoteCard({ japanese, translation, page, kind = 'commentary', onSource, compact = false }: {
  japanese: ReactNode;
  translation: string;
  page: 316 | 317 | 318;
  kind?: SourceKind;
  onSource: (page: 316 | 317 | 318) => void;
  compact?: boolean;
}) {
  return <figure className={`quote-card ${compact ? 'compact' : ''}`}>
    <div className="quote-top"><SourceBadge kind={kind} /><span>TEKS SUMBER</span></div>
    <blockquote lang="ja">「{japanese}」</blockquote>
    <figcaption><span>{translation}</span><button type="button" onClick={() => onSource(page)}>p. {page} <ArrowDownRight size={16}/></button></figcaption>
  </figure>;
}

export function TermCard({ japanese, roman, meaning, detail, index }: {
  japanese: string;
  roman: string;
  meaning: string;
  detail?: string;
  index?: string;
}) {
  const [open, setOpen] = useState(false);
  return <button type="button" className={`term-card ${open ? 'term-card-open' : ''}`} aria-expanded={open} onClick={() => setOpen(!open)}>
    <span className="term-card-top"><span>{index ?? 'TERM'}</span><span>{open ? '−' : '+'}</span></span>
    <span className="term-katakana" lang="ja">{japanese}</span>
    <span className="term-line" aria-hidden="true" />
    <strong className="term-roman">{roman}</strong>
    <span className="term-meaning">{open && detail ? detail : meaning}</span>
  </button>;
}

export function Annotation({ children }: { children: ReactNode }) {
  return <div className="annotation"><span className="annotation-label">NOTE</span><span>{children}</span></div>;
}
