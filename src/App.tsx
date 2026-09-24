import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpenText, Expand, FileText, HelpCircle, Minimize, Play, X } from 'lucide-react';
import { slides, type PageNumber } from './slides';

const WIDTH = 1600;
const HEIGHT = 900;
const DURATION = 440;

type Motion = { from: number; to: number; direction: 'forward' | 'back' };

function useStageScale() {
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const update = () => setScale(Math.min((window.innerWidth - 36) / WIDTH, (window.innerHeight - 72) / HEIGHT, 1.28));
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return scale;
}

export default function App() {
  const [index, setIndex] = useState(0);
  const [motion, setMotion] = useState<Motion | null>(null);
  const [notesOpen, setNotesOpen] = useState(false);
  const [sourcePage, setSourcePage] = useState<PageNumber | null>(null);
  const [helpOpen, setHelpOpen] = useState(false);
  const [presenting, setPresenting] = useState(false);
  const [idle, setIdle] = useState(false);
  const stageScale = useStageScale();
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const go = useCallback((target: number) => {
    if (target < 0 || target >= slides.length || target === index || motion) return;
    setMotion({ from: index, to: target, direction: target > index ? 'forward' : 'back' });
    setIndex(target);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setMotion(null), DURATION);
  }, [index, motion]);

  const toggleFullscreen = useCallback(async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await document.documentElement.requestFullscreen();
    } catch {
      // Browser may disallow fullscreen; slide navigation remains available.
    }
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) return;
      if (event.key === 'Escape') {
        if (sourcePage) setSourcePage(null);
        else if (helpOpen) setHelpOpen(false);
        else if (notesOpen) setNotesOpen(false);
        else if (document.fullscreenElement) void document.exitFullscreen();
        return;
      }
      if (sourcePage || helpOpen) return;
      if (event.key === 'ArrowRight' || event.key === 'PageDown' || event.key === ' ') { event.preventDefault(); go(index + 1); }
      if (event.key === 'ArrowLeft' || event.key === 'PageUp') { event.preventDefault(); go(index - 1); }
      if (event.key === 'Home') { event.preventDefault(); go(0); }
      if (event.key === 'End') { event.preventDefault(); go(slides.length - 1); }
      if (event.key.toLowerCase() === 'f' && !event.repeat) void toggleFullscreen();
      if (event.key.toLowerCase() === 'n' && !event.repeat) setNotesOpen(v => !v);
      if (event.key.toLowerCase() === 's' && !event.repeat) setSourcePage(316);
      if (event.key === '?' && !event.repeat) setHelpOpen(true);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, helpOpen, index, notesOpen, sourcePage, toggleFullscreen]);

  useEffect(() => {
    const move = () => {
      setIdle(false);
      if (idleTimer.current) clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => setIdle(true), 2600);
    };
    window.addEventListener('pointermove', move);
    return () => { window.removeEventListener('pointermove', move); if (idleTimer.current) clearTimeout(idleTimer.current); };
  }, []);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const renderSlide = (slideIndex: number, role: 'active' | 'enter' | 'exit') => {
    const Slide = slides[slideIndex].component;
    const dirClass = motion ? (role === 'enter' ? `enter-${motion.direction}` : role === 'exit' ? `exit-${motion.direction}` : '') : '';
    return <div key={`${slideIndex}-${role}`} className={`slide-layer ${dirClass}`} aria-hidden={role === 'exit'}><Slide onJump={go} onSource={setSourcePage}/></div>;
  };

  return <div className={`presentation-shell ${presenting ? 'presenting' : ''} ${presenting && idle ? 'idle' : ''}`}>
    <div className="ambient-grid" aria-hidden="true" />
    <div className="stage-viewport" style={{ width: WIDTH * stageScale, height: HEIGHT * stageScale }}>
      <main className="stage" aria-label={`Slide ${index + 1} dari ${slides.length}: ${slides[index].title}`} style={{ transform: `scale(${stageScale})` }}>
        {motion ? <>{renderSlide(motion.from, 'exit')}{renderSlide(motion.to, 'enter')}</> : renderSlide(index, 'active')}
      </main>
    </div>
    <div className="progress-track" role="progressbar" aria-valuenow={index + 1} aria-valuemin={1} aria-valuemax={slides.length} aria-label="Kemajuan presentasi"><div style={{ width: `${(index + 1) / slides.length * 100}%` }} /></div>
    <nav className="controls" aria-label="Navigasi presentasi">
      <div className="control-group"><button type="button" title="Slide sebelumnya (←)" aria-label="Slide sebelumnya" disabled={index === 0} onClick={() => go(index-1)}><ArrowLeft size={19}/></button><span className="counter">{String(index+1).padStart(2,'0')} <span>/</span> {String(slides.length).padStart(2,'0')}</span><button type="button" title="Slide berikutnya (→)" aria-label="Slide berikutnya" disabled={index === slides.length-1} onClick={() => go(index+1)}><ArrowRight size={19}/></button></div>
      <div className="control-group secondary"><button type="button" title="Foto halaman sumber (S)" aria-label="Buka halaman sumber" onClick={() => setSourcePage(316)}><BookOpenText size={19}/><span>Sumber</span></button><button type="button" title="Catatan pembicara (N)" aria-label="Catatan pembicara" aria-pressed={notesOpen} onClick={() => setNotesOpen(!notesOpen)}><FileText size={18}/><span>Catatan</span></button><button type="button" title="Bantuan (?)" aria-label="Bantuan pintasan" onClick={() => setHelpOpen(true)}><HelpCircle size={18}/></button><button type="button" title="Layar penuh (F)" aria-label="Ubah layar penuh" onClick={() => void toggleFullscreen()}>{document.fullscreenElement ? <Minimize size={18}/> : <Expand size={18}/>}</button><button type="button" className="present-button" aria-pressed={presenting} onClick={() => setPresenting(!presenting)}><Play size={16} fill="currentColor"/> {presenting ? 'Selesai' : 'Present'}</button></div>
    </nav>

    {notesOpen && <aside className="notes-panel" aria-label="Catatan pembicara"><div className="panel-head"><span>CATATAN PEMBICARA · {String(index+1).padStart(2,'0')}</span><button type="button" aria-label="Tutup catatan" onClick={() => setNotesOpen(false)}><X size={20}/></button></div><h2>{slides[index].title}</h2><p>{slides[index].speakerNotes}</p><small>TEKAN N UNTUK MENUTUP</small></aside>}

    {sourcePage && <div className="overlay" role="dialog" aria-modal="true" aria-label={`Foto halaman ${sourcePage}`} onClick={() => setSourcePage(null)}><div className="source-dialog" onClick={event => event.stopPropagation()}><div className="dialog-header"><div><span>FOTO SUMBER ASLI</span><h2>Halaman {sourcePage}</h2></div><button type="button" aria-label="Tutup sumber" onClick={() => setSourcePage(null)}><X size={25}/></button></div><div className="page-switcher">{([316,317,318] as const).map(page => <button type="button" key={page} aria-pressed={page === sourcePage} onClick={() => setSourcePage(page)}>{page}</button>)}</div><img src={`${import.meta.env.BASE_URL}pages/p${sourcePage}.jpg`} alt={`Foto buku, halaman ${sourcePage}, dengan teks Jepang Bhagavad-gītā`}/><div className="dialog-footer">Foto halaman yang diberikan untuk presentasi · Esc untuk menutup</div></div></div>}

    {helpOpen && <div className="overlay" role="dialog" aria-modal="true" aria-label="Bantuan navigasi" onClick={() => setHelpOpen(false)}><div className="help-dialog" onClick={event => event.stopPropagation()}><button className="help-close" type="button" aria-label="Tutup bantuan" onClick={() => setHelpOpen(false)}><X/></button><span className="mini-label">PRESENTATION CONTROLS</span><h2>Pintasan keyboard</h2><div className="shortcuts"><span>Berikutnya</span><b>→ / Spasi</b><span>Sebelumnya</span><b>←</b><span>Awal / akhir</span><b>Home / End</b><span>Layar penuh</span><b>F</b><span>Catatan pembicara</span><b>N</b><span>Halaman sumber</span><b>S</b><span>Tutup panel</span><b>Esc</b></div></div></div>}
  </div>;
}
