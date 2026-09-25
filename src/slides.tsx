import { useState, type ComponentType } from 'react';
import { ArrowDown, ArrowRight, BookOpenText, ChevronRight, Languages, Sparkles } from 'lucide-react';
import { Annotation, QuoteCard, SlideFrame, SourceBadge, TermCard } from './components';

export type PageNumber = 316 | 317 | 318;
export type SlideProps = { onJump: (index: number) => void; onSource: (page: PageNumber) => void };
export type SlideDefinition = { title: string; component: ComponentType<SlideProps>; speakerNotes: string };

const members = [
  ['Faiz Syihab', '125241046'],
  ['Brama Alifio Gusnanda', '125141057'],
  ['Nisrina Humayra', '125241070'],
  ['Raffa Joeta Ilham Arrahman', '125241093'],
];

function TitleSlide() {
  return <article className="slide hero-slide">
    <div className="slide-masthead"><span>TEKS · BAHASA · KONSEP</span><span>HALAMAN 316—318</span></div>
    <div className="hero-copy">
      <div className="eyebrow"><span className="small-rule" /> PRESENTASI AKADEMIK / 2026</div>
      <h1 lang="ja">『バガヴァッド・<br/>ギーター』<em>4.8</em></h1>
      <div className="hero-bottom"><div className="gold-stroke" /><p>Transliterasi ilmiah, makna,<br/>dan kosakata non-Jepang</p></div>
    </div>
    <div className="hero-orbit" aria-hidden="true"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="orbit orbit-three" /><div className="orbit-core">धर्म</div><span className="orbit-word w1">dharma</span><span className="orbit-word w2">sādhu</span><span className="orbit-word w3">avatāra</span><span className="orbit-word w4">saṅkīrtana</span></div>
    <div className="hero-caption">01 / 18 <span>→</span> GUNAKAN PANAH ATAU SPASI UNTUK MELANJUTKAN</div>
  </article>;
}

function MembersSlide() {
  return <SlideFrame number="02" section="Kelompok" title="Anggota kelompok" className="members-slide">
    <div className="members-intro"><p>Empat anggota,<br/>satu ruang untuk belajar.</p><div className="loop-symbol" aria-hidden="true"><i/><i/><i/><i/></div><small>BAHASA & SASTRA JEPANG</small></div>
    <div className="members-list"><div className="member-head"><span>NAMA</span><span>NIM</span></div>{members.map(([name, nim], i) => <div className="member-row" key={nim}><span className="member-index">0{i+1}</span><strong>{name}</strong><span>{nim}</span></div>)}</div>
  </SlideFrame>;
}

function AgendaSlide({ onJump }: SlideProps) {
  const items = [
    ['01', 'Konteks teks', 'Bhagavad-gītā 4.8 dan posisi halaman 316–318', 3],
    ['02', 'Transliterasi', 'Dari katakana Jepang ke bentuk IAST', 5],
    ['03', 'Pembahasan isi', 'Dharma, sādhu, dan kemunculan avatāra', 6],
    ['04', 'Kosakata', 'Istilah Sanskerta, Bengali, dan nama tokoh', 14],
  ] as const;
  return <SlideFrame number="03" section="Rute pembacaan" title="Agenda pembahasan" subtitle="Empat pintu masuk untuk membaca satu ayat dan komentarnya.">
    <div className="agenda-grid">{items.map(([n, name, desc, target]) => <button type="button" className="agenda-item" key={n} onClick={() => onJump(target)}><span>{n}</span><strong>{name}</strong><small>{desc}</small><ChevronRight size={24}/></button>)}</div>
    <div className="process-ribbon"><span lang="ja">日本語</span><ArrowRight/><span>Katakana</span><ArrowRight/><span>IAST</span><ArrowRight/><span>Makna</span><ArrowRight/><span>Konsep</span></div>
  </SlideFrame>;
}

function ContextSlide({ onSource }: SlideProps) {
  return <SlideFrame number="04" section="Konteks" title="Dari ayat ke konsep avatāra" subtitle="Ketiga halaman menjawab tiga pertanyaan secara berurutan." page={316} onSource={onSource}>
    <div className="context-steps"><div className="context-step"><span className="context-num">316</span><small>WHY / MENGAPA</small><strong>Mengapa Tuhan turun?</strong><p>Melindungi yang saleh dan menegakkan kembali <em>dharma</em>.</p></div><div className="context-step"><span className="context-num">317</span><small>FOR WHOM / UNTUK SIAPA</small><strong>Siapa yang dilindungi?</strong><p>Para penyembah yang mengalami penderitaan dan penganiayaan.</p></div><div className="context-step"><span className="context-num">318</span><small>WHAT / APA</small><strong>Apa itu avatāra?</strong><p>Manifestasi ilahi yang hadir di dunia, menurut komentar buku.</p></div></div>
    <div className="context-strip"><span>01 / DHARMA</span><span>02 / SĀDHU</span><span>03 / AVATĀRA</span></div>
  </SlideFrame>;
}

function VerseSlide({ onSource }: SlideProps) {
  return <SlideFrame number="05" section="Ayat 4.8" title="第八節 / Bhagavad-gītā 4.8" subtitle="Ayat dasar yang dijelaskan lebih lanjut pada halaman 316–318." page={316} onSource={onSource}>
    <div className="verse-layout"><div className="verse-japanese"><SourceBadge kind="gita"/><p lang="ja">正信正行の人々を救け<br/>異端邪信のともがらを打ち倒し<br/>宗教の法則を再び世に興すために<br/>私は、どの時代にも降臨する。</p><small>Terjemahan Jepang yang tercetak pada hlm. 316</small></div><div className="verse-roman"><div className="verse-lines">paritrāṇāya sādhūnāṁ<br/>vināśāya ca duṣkṛtām<br/>dharma-saṁsthāpanārthāya<br/>sambhavāmi yuge yuge</div><p>Melindungi orang saleh · mengatasi pelaku kejahatan · menegakkan kembali dharma.</p><small>IAST / Bhagavad-gītā 4.8 · terjemahan Indonesia berupa parafrasa</small></div></div>
    <div className="verse-points"><span>01 MELINDUNGI</span><span>02 MENGATASI KEJAHATAN</span><span>03 MENEGAKKAN DHARMA</span></div>
  </SlideFrame>;
}

const focusTerms = [
  { kana: 'クリシュナ', iast: 'Kṛṣṇa', plain: 'Krishna', meaning: 'Nama tokoh ilahi; ṛ, ṣ, dan ṇ menjaga perbedaan bunyi.', detail: 'ṛ · ṣ · ṇ' },
  { kana: 'サードゥ', iast: 'sādhu', plain: 'sadhu', meaning: 'Orang saleh atau praktisi spiritual.', detail: 'ā' },
  { kana: 'アヴァターラ', iast: 'avatāra', plain: 'avatara', meaning: 'Manifestasi ilahi yang “turun”.', detail: 'ā' },
  { kana: 'サンキールタン', iast: 'saṅkīrtana', plain: 'sankirtana', meaning: 'Pelantunan nama suci secara bersama.', detail: 'ṅ · ī' },
];
function TransliterationSlide({ onSource }: SlideProps) {
  const [selected, setSelected] = useState(0);
  const term = focusTerms[selected];
  return <SlideFrame number="06" section="Bahasa" title="Dari katakana ke IAST" subtitle="Pilih istilah di sebelah kiri untuk melihat apa yang dipertahankan oleh diakritik." page={318} onSource={onSource}>
    <div className="translit-layout"><div className="translit-list">{focusTerms.map((entry, i) => <button type="button" aria-pressed={selected === i} className={`translit-option ${selected === i ? 'selected' : ''}`} key={entry.iast} onClick={() => setSelected(i)}><span lang="ja">{entry.kana}</span><ArrowRight size={22}/><strong>{entry.iast}</strong></button>)}</div><div className="translit-spotlight" key={term.iast}><span className="mini-label">FOKUS / {String(selected+1).padStart(2,'0')}</span><div className="comparison"><span>{term.plain}</span><span>→</span><strong>{term.iast}</strong></div><div className="diacritic-chip">TANDA PENTING <b>{term.detail}</b></div><p>{term.meaning}</p><div className="translit-small">IAST = International Alphabet of Sanskrit Transliteration</div></div></div>
    <Annotation>Katakana mendekati pengucapan istilah asing; IAST mencatat perbedaan fonologis yang tidak selalu tampak pada katakana.</Annotation>
  </SlideFrame>;
}

function Page316Slide({ onSource }: SlideProps) {
  return <SlideFrame number="07" section="Halaman 316" title="Sādhu, dharma, dan tujuan kemunculan" subtitle="Dari isi ayat menuju cara komentar menafsirkan tujuannya." page={316} onSource={onSource}>
    <QuoteCard japanese="神の化身たちの全目的は、人々のクリシュナ意識を目覚めさせることである。" translation="Tujuan semua manifestasi Tuhan adalah membangkitkan kesadaran Kṛṣṇa dalam diri manusia." page={316} onSource={onSource}/>
    <div className="two-term-row"><TermCard index="01 / AYAT" japanese="サードゥ" roman="sādhu" meaning="Orang saleh / praktisi spiritual" detail="Pada ayat: pihak yang dilindungi."/><TermCard index="02 / AYAT" japanese="ドゥシュクリターン" roman="duṣkṛtām" meaning="Para pelaku perbuatan buruk" detail="duṣ- (buruk) + √kṛ (melakukan); bentuk dalam ayat."/></div>
    <Annotation>“Kesadaran Kṛṣṇa” adalah penekanan teologis komentar Vaiṣṇava pada halaman ini. Jangan sajikan sebagai satu-satunya tafsir seluruh tradisi Hindu.</Annotation>
  </SlideFrame>;
}

function Page317Slide({ onSource }: SlideProps) {
  return <SlideFrame number="08" section="Halaman 317" title="Perlindungan yang bersifat personal" subtitle="Komentar mengutamakan penghiburan para penyembah, selain penindakan terhadap kejahatan." page={317} onSource={onSource}>
    <QuoteCard japanese="純粋な献身者たちを慰め満足させるために降臨なさる" translation="Ia turun untuk menghibur dan memuaskan para penyembah yang murni." page={317} onSource={onSource}/>
    <div className="lexicon"><span><b lang="ja">純粋な</b><small>murni</small></span><span><b lang="ja">献身者</b><small>penyembah</small></span><span><b lang="ja">慰める</b><small>menghibur</small></span><span><b lang="ja">満足させる</b><small>memuaskan</small></span><span><b lang="ja">降臨する</b><small>turun secara ilahi</small></span></div>
    <div className="big-idea"><span>AVATĀRA</span><ArrowRight/><span>PERLINDUNGAN</span><ArrowRight/><span>PENGHIBURAN</span></div>
  </SlideFrame>;
}

function CharactersSlide({ onSource }: SlideProps) {
  return <SlideFrame number="09" section="Narasi" title="Ketika perlindungan menjadi konkret" subtitle="Dua contoh naratif dalam komentar halaman 317." page={317} onSource={onSource}>
    <div className="characters-grid"><div className="character-card"><span className="eyebrow">KISAH 01</span><strong>Prahlāda</strong><span className="japanese-term" lang="ja">プラフラーダ</span><p>Penyembah yang dianiaya oleh ayahnya, <em>Hiraṇyakaśipu</em> (ヒラニャカシプ).</p><span className="card-bottom">IMAN DI TENGAH PENGANIAYAAN</span></div><div className="character-card"><span className="eyebrow">KISAH 02</span><strong>Devakī</strong><span className="japanese-term" lang="ja">デーヴァキー</span><p>Bersama <em>Vasudeva</em> (ヴァスデーヴァ), ia mengalami penganiayaan dari <em>Kaṁsa</em> (カンサ).</p><span className="card-bottom">PERLINDUNGAN PENYEMBAH</span></div></div>
    <QuoteCard japanese="デーヴァキーを救けるために、出現されたのである。" translation="[Kṛṣṇa] muncul demi menyelamatkan Devakī." page={317} onSource={onSource} compact/>
  </SlideFrame>;
}

function BengaliSlide({ onSource }: SlideProps) {
  return <SlideFrame number="10" section="Sumber lain" title="Bukan semua Sanskerta" subtitle="Halaman 317 mengutip bait Bengali yang sarat kosakata asal Sanskerta." page={317} onSource={onSource}>
    <div className="bengali-layout"><div className="bengali-poem"><SourceBadge kind="bengali"/><div className="poem-lines">sṛṣṭi-hetu yei mūrti prapañce avatāre<br/>sei īśvara-mūrti 'avatāra' nāma dhare<br/><br/>māyātīta paravyome sabāra avasthāna<br/>viśve avatari' dhare 'avatāra' nāma</div><small>Empat baris sebagaimana tercetak pada hlm. 317</small></div><div className="bengali-gloss"><span className="mini-label">BACA DENGAN HATI-HATI</span><h2>Bengali ≠<br/>Sanskerta murni.</h2><p>Bentuk kalimatnya Bengali. Banyak unsurnya merupakan kosakata dari Sanskerta.</p><div className="gloss-pairs"><span><b>sṛṣṭi</b> penciptaan</span><span><b>mūrti</b> bentuk</span><span><b>īśvara</b> Tuhan</span><span><b>viśva</b> dunia</span></div></div></div>
    <Annotation>Dalam buku, bait ini dihubungkan dengan <em>Caitanya-caritāmṛta</em> (Madhya 20.263–264). Makna ringkasnya: manifestasi ilahi yang hadir di dunia disebut <em>avatāra</em>.</Annotation>
  </SlideFrame>;
}

function Page318Slide({ onSource }: SlideProps) {
  return <SlideFrame number="11" section="Halaman 318" title="Apa yang dimaksud avatāra?" subtitle="Perhatikan perbedaan antara bentuk Jepang dan konsep yang diwakilinya." page={318} onSource={onSource}>
    <div className="avatara-hero"><span lang="ja">アヴァターラ</span><ArrowDown size={28}/><strong>avatāra</strong><small>“TURUN” / MANIFESTASI ILAHI</small></div>
    <QuoteCard japanese="神の化身は神の国から降って、この世に誕生する。" translation="Manifestasi Tuhan turun dari alam Tuhan dan lahir di dunia ini." page={318} onSource={onSource} compact/>
    <div className="jp-concepts"><span><b lang="ja">化身</b><small>perwujudan</small></span><span><b lang="ja">降臨</b><small>turun secara ilahi</small></span><span><b lang="ja">出現</b><small>kemunculan</small></span></div>
    <div className="inline-note"><SourceBadge kind="interpretation"/> <span><em>ava-</em> mengarah pada gagasan “ke bawah”; istilah “inkarnasi” perlu dibaca sesuai konteks teologinya.</span></div>
  </SlideFrame>;
}

function BhagavanSlide({ onSource }: SlideProps) {
  return <SlideFrame number="12" section="Istilah kunci" title="Bhagavān" subtitle="Satu kata, dua lapisan: bentuk bahasa dan kedudukan teologis." page={318} onSource={onSource}>
    <div className="bhagavan-layout"><div className="bhagavan-term"><span lang="ja">バガヴァーン</span><ArrowDown size={34}/><strong>Bhagavān</strong><p>Istilah Sanskerta untuk Tuhan atau sosok yang memiliki keagungan ilahi.</p></div><div className="morphology"><div><span>01 / UNSUR MAKNA</span><strong>bhaga</strong><p>kemuliaan · keagungan</p></div><div><span>02 / AKHIRAN</span><strong>-vān</strong><p>yang memiliki</p></div><Annotation>Pemecahan ini disederhanakan untuk keperluan presentasi, bukan analisis filologis lengkap.</Annotation></div></div>
  </SlideFrame>;
}

const avatarTypes = [
  ['puruṣa-avatāra','プルシャーヴァターラ','fungsi kosmis'],
  ['guṇa-avatāra','グナーヴァターラ','konsep guṇa'],
  ['līlā-avatāra','リーラーヴァターラ','aktivitas ilahi'],
  ['śaktyāveśa-avatāra','シャクティヤーヴェーシャ・アヴァターラ','pemberdayaan ilahi'],
  ['manvantara-avatāra','マンヴァンタラ・アヴァターラ','periode manvantara'],
  ['yuga-avatāra','ユガーヴァターラ','suatu zaman / yuga'],
];
function TypesSlide({ onSource }: SlideProps) {
  const [selected, setSelected] = useState<number | null>(null);
  return <SlideFrame number="13" section="Klasifikasi" title="Berbagai jenis avatāra" subtitle="Pilih salah satu bentuk untuk melihat penjelasan singkatnya." page={318} onSource={onSource}>
    <div className="types-grid">{avatarTypes.map(([roman, kana, meaning], i) => <button type="button" aria-pressed={selected === i} onClick={() => setSelected(selected === i ? null : i)} className={`type-card ${selected === i ? 'active' : ''}`} key={roman}><span>0{i+1} / JENIS</span><strong>{roman}</strong><small lang="ja">{kana}</small><p>{selected === i ? `Dalam komentar: berkaitan dengan ${meaning}.` : meaning}</p></button>)}</div>
    <div className="types-foot"><span><b>līlā</b> aktivitas ilahi</span><span><b>śakti</b> daya / kekuatan</span><span><b>yuga</b> zaman</span></div>
  </SlideFrame>;
}

function KaliSlide({ onSource }: SlideProps) {
  return <SlideFrame number="14" section="Tradisi" title="Kali-yuga & saṅkīrtana" subtitle="Dari klasifikasi zaman ke praktik yang ditekankan dalam komentar." page={318} onSource={onSource}>
    <div className="kali-flow"><div><span lang="ja">カリ時代</span><strong>Kali-yuga</strong><small>zaman / era</small></div><ArrowRight/><div><span lang="ja">チャイタンニャ・マハープラブ</span><strong>Caitanya Mahāprabhu</strong><small>mahā = agung · prabhu = tuan</small></div><ArrowRight/><div><span lang="ja">サンキールタン</span><strong>saṅkīrtana</strong><small>pelantunan kolektif</small></div></div>
    <div className="kali-quote"><SourceBadge kind="commentary"/><span lang="ja">「聖名の集合詠唱」</span><strong>Pelantunan nama suci secara bersama.</strong></div>
    <Annotation>Hubungan Caitanya Mahāprabhu dengan avatāra pada Kali-yuga dipaparkan menurut perspektif teologis Vaiṣṇava dalam komentar buku.</Annotation>
  </SlideFrame>;
}

const vocabulary = [
  ['クリシュナ','Kṛṣṇa','nama tokoh ilahi'], ['サードゥ','sādhu','orang saleh'], ['アヴァターラ','avatāra','manifestasi ilahi'],
  ['バガヴァーン','Bhagavān','Tuhan / yang agung'], ['ダルマ','dharma','tatanan / kewajiban'], ['リーラー','līlā','aktivitas ilahi'],
  ['シャクティ','śakti','kekuatan'], ['ユガ','yuga','zaman'], ['マーヤー','māyā','daya material'],
  ['サンキールタン','saṅkīrtana','pelantunan bersama'], ['ヴリンダーヴァナ','Vṛndāvana','nama tempat'], ['チャイタンニャ','Caitanya','nama tokoh'],
  ['プラフラーダ','Prahlāda','nama tokoh'], ['カンサ','Kaṁsa','nama tokoh'], ['デーヴァキー','Devakī','nama tokoh'],
] as const;
function VocabularySlide({ onSource }: SlideProps) {
  const [active, setActive] = useState(0);
  return <SlideFrame number="15" section="Glosarium" title="Kosakata non-Jepang" subtitle="Pilih istilah untuk melihat relasi katakana, transliterasi, dan maknanya." page={318} onSource={onSource}>
    <div className="vocab-layout"><div className="vocab-list">{vocabulary.map(([kana, roman], i) => <button type="button" aria-pressed={active === i} onClick={() => setActive(i)} className={active === i ? 'active' : ''} key={roman}><span lang="ja">{kana}</span><strong>{roman}</strong></button>)}</div><div className="vocab-feature" key={active}><span className="mini-label">ISTILAH {String(active+1).padStart(2,'0')} / {vocabulary.length}</span><span lang="ja" className="vocab-jp">{vocabulary[active][0]}</span><ArrowDown size={30}/><strong>{vocabulary[active][1]}</strong><p>{vocabulary[active][2]}</p><div className="source-mini"><Languages size={20}/> KATAKANA → IAST → MAKNA</div></div></div>
  </SlideFrame>;
}

function SynthesisSlide({ onSource }: SlideProps) {
  return <SlideFrame number="16" section="Sintesis" title="Tiga halaman, satu alur" subtitle="Hubungan ide dapat ditelusuri langsung ke halaman sumber." page={316} onSource={onSource}>
    <div className="synthesis-grid"><button onClick={() => onSource(316)}><small>316 · WHY</small><strong>Mengapa turun?</strong><span>Melindungi sādhu dan menegakkan dharma.</span><b>LIHAT HALAMAN <ArrowRight size={16}/></b></button><button onClick={() => onSource(317)}><small>317 · FOR WHOM</small><strong>Untuk siapa?</strong><span>Para penyembah yang membutuhkan perlindungan.</span><b>LIHAT HALAMAN <ArrowRight size={16}/></b></button><button onClick={() => onSource(318)}><small>318 · WHAT</small><strong>Avatāra itu apa?</strong><span>Manifestasi ilahi yang turun dan hadir di dunia.</span><b>LIHAT HALAMAN <ArrowRight size={16}/></b></button></div>
    <div className="synthesis-chain"><span>dharma</span><ChevronRight/><span>sādhu</span><ChevronRight/><span>avatāra</span><ChevronRight/><span>bhakti</span><ChevronRight/><span>saṅkīrtana</span></div>
  </SlideFrame>;
}

function ConclusionSlide() {
  return <SlideFrame number="17" section="Penutup" title="Kesimpulan" subtitle="Tiga gagasan untuk dibawa pulang.">
    <div className="conclusion-grid"><div><span>01 / DHARMA</span><strong>Tujuan kemunculan</strong><p>Ayat 4.8 menghubungkan kemunculan Tuhan dengan perlindungan orang saleh dan pemulihan dharma.</p></div><div><span>02 / AVATĀRA</span><strong>Makna “turun”</strong><p>Komentar menggambarkan manifestasi ilahi yang hadir di dunia bagi para penyembah.</p></div><div><span>03 / BAHASA</span><strong>Bentuk ilmiah</strong><p>IAST menjaga detail bunyi yang tidak selalu dipertahankan oleh penulisan katakana.</p></div></div>
    <div className="conclusion-statement"><Sparkles size={24}/><span>Memahami istilah aslinya membantu kita membaca konsep di balik terjemahan.</span></div>
  </SlideFrame>;
}

function ThanksSlide({ onJump }: SlideProps) {
  return <article className="slide thanks-slide"><div className="slide-masthead"><span>BG / 4.8</span><span>END / 18</span></div><div className="thanks-content"><span className="thanks-ornament" aria-hidden="true">✦</span><h1 lang="ja">ありがとうございました</h1><p>Terima kasih</p><div className="thanks-rule"/><span lang="ja">ご質問はありますか。</span><small>Ada pertanyaan?</small></div><button type="button" className="restart" onClick={() => onJump(0)}>ULANGI PRESENTASI <ArrowRight size={18}/></button><div className="thanks-label"><BookOpenText size={18}/> Bhagavad-gītā 4.8 · halaman 316–318</div></article>;
}

export const slides: SlideDefinition[] = [
  {title:'Judul',component:TitleSlide,speakerNotes:'Perkenalkan ruang lingkup: tiga halaman komentar Jepang tentang Bhagavad-gītā 4.8. Fokus pada isi, istilah, dan bentuk ilmiah IAST.'},
  {title:'Anggota kelompok',component:MembersSlide,speakerNotes:'Perkenalkan lima anggota kelompok sesuai daftar nama dan NIM.'},
  {title:'Agenda pembahasan',component:AgendaSlide,speakerNotes:'Paparkan empat bagian utama presentasi. Setiap kartu agenda dapat diklik untuk melompat ke bagian terkait.'},
  {title:'Konteks teks',component:ContextSlide,speakerNotes:'Alur halaman: 316 menjawab mengapa Tuhan turun, 317 menjelaskan yang dilindungi, dan 318 mengembangkan konsep avatāra.'},
  {title:'Bhagavad-gītā 4.8',component:VerseSlide,speakerNotes:'Bedakan terjemahan Jepang yang ada pada halaman 316 dari transliterasi IAST ayat dan parafrasa Indonesia. Jangan menyamakan komentar dengan ayat.'},
  {title:'Dari katakana ke IAST',component:TransliterationSlide,speakerNotes:'Klik beberapa istilah. Tunjukkan bahwa garis di atas vokal dan titik pada huruf mewakili perbedaan bunyi; katakana tidak memetakan semua detail itu.'},
  {title:'Halaman 316',component:Page316Slide,speakerNotes:'Sādhu menjadi pihak yang dilindungi dalam ayat. Kutipan tentang kesadaran Kṛṣṇa berasal dari komentar berperspektif Vaiṣṇava, bukan bunyi ayat itu sendiri.'},
  {title:'Halaman 317',component:Page317Slide,speakerNotes:'Komentar menekankan motif penghiburan dan pemenuhan harapan para penyembah. Tunjukkan rangkaian istilah Jepang di bagian bawah slide.'},
  {title:'Prahlāda, Devakī, dan Kaṁsa',component:CharactersSlide,speakerNotes:'Contoh Prahlāda dan Devakī memperlihatkan konsep perlindungan dalam narasi. Kutipan Devakī diambil sebagai cuplikan dari halaman 317.'},
  {title:'Kutipan Bengali',component:BengaliSlide,speakerNotes:'Bacaan empat baris ini adalah Bengali dengan banyak unsur Sanskerta. Buku menautkannya ke Caitanya-caritāmṛta Madhya 20.263–264. Jangan menyebutnya Sanskerta murni.'},
  {title:'Halaman 318',component:Page318Slide,speakerNotes:'Bedakan 化身, 降臨, dan 出現. Penjelasan avatāra sebagai “turun” adalah ringkasan konsep; istilah inkarnasi tidak selalu setara sempurna.'},
  {title:'Bhagavān',component:BhagavanSlide,speakerNotes:'Jelaskan bentuk katakana dan IAST. Pemecahan bhaga dan -vān di slide merupakan penyederhanaan, bukan analisis etimologis menyeluruh.'},
  {title:'Jenis avatāra',component:TypesSlide,speakerNotes:'Halaman 318 menyebut beberapa klasifikasi. Kartu dapat diklik; tekankan bahwa istilah terkait fungsi, zaman, atau bentuk manifestasi berbeda.'},
  {title:'Kali-yuga dan saṅkīrtana',component:KaliSlide,speakerNotes:'Terangkan Kali-yuga, Caitanya Mahāprabhu, dan saṅkīrtana. Hubungan teologisnya adalah pandangan Vaiṣṇava dalam komentar buku.'},
  {title:'Kosakata non-Jepang',component:VocabularySlide,speakerNotes:'Klik daftar istilah sesuai pertanyaan audiens. Jelaskan relasi antara ejaan katakana, bentuk ilmiah, dan makna dengan contoh konkret.'},
  {title:'Benang merah halaman 316–318',component:SynthesisSlide,speakerNotes:'Rangkum tiga pertanyaan utama. Tiap kartu membuka foto halaman sumber agar audiens dapat memeriksa kaitannya.'},
  {title:'Kesimpulan',component:ConclusionSlide,speakerNotes:'Simpulkan penegakan dharma, konsep avatāra, dan fungsi IAST. Hubungkan pembacaan bahasa dengan pembacaan gagasan.'},
  {title:'Terima kasih',component:ThanksSlide,speakerNotes:'Buka sesi tanya jawab. Jika perlu, tekan N untuk membuka catatan pembicara dan S untuk melihat halaman sumber.'},
];
