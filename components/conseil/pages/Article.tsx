import { ArrowLeft, ArrowRight, BookOpen, Clock } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { conseilArticleBySlug } from '../articles';

export function Article() {
  const article = conseilArticleBySlug(useParams().slug);

  if (!article) return <Navigate to="/conseil/guide" replace />;

  return (
    <main className="pt-28 pb-16 md:pt-36 md:pb-24 bg-stone-50">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/conseil/guide" className="inline-flex items-center text-sm font-medium text-emerald-700 hover:text-emerald-900 hover:underline mb-8">
          <ArrowLeft className="w-4 h-4 mr-1" /> Retour au guide
        </Link>

        <div className="flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-wider text-emerald-800 mb-5">
          <span className="inline-flex items-center gap-2"><BookOpen className="w-4 h-4" /> {article.category}</span>
          <span className="text-stone-400">•</span>
          <span className="inline-flex items-center gap-1"><Clock className="w-4 h-4" /> {article.readingTime} de lecture</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-stone-900 leading-tight mb-6">{article.title}</h1>
        <p className="text-xl leading-relaxed text-stone-600 border-l-4 border-emerald-700 pl-5 mb-12">{article.introduction}</p>

        <div className="space-y-10 text-stone-700 leading-relaxed text-[1.05rem]">
          {article.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-2xl font-bold text-stone-900 mb-4">{section.heading}</h2>
              <div className="space-y-4">
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              {section.bullets && (
                <ul className="mt-5 space-y-3 pl-1">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-700 flex-shrink-0" />{bullet}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        <section className="mt-14 rounded-2xl bg-emerald-800 p-6 md:p-8 text-white">
          <p className="text-sm font-bold uppercase tracking-wider text-emerald-100 mb-3">Besoin d’un regard sur votre fiche Google&nbsp;?</p>
          <h2 className="text-2xl font-bold mb-3">On échange simplement sur votre établissement.</h2>
          <p className="leading-relaxed text-emerald-50 max-w-2xl mb-6">Dites-moi ce que vous faites et où se situe votre établissement&nbsp;: je vous réponds sous 48&nbsp;heures ouvrées, sans engagement.</p>
          <Link to="/conseil#contact" className="inline-flex items-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-emerald-900 transition-colors hover:bg-emerald-50">
            Parler de mon établissement <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </section>

        <section className="mt-14 rounded-2xl bg-white border border-stone-200 p-6 md:p-8">
          <h2 className="text-xl font-bold text-stone-900 mb-4">Sources</h2>
          <ul className="space-y-3 text-sm">
            {article.sources.map((source) => (
              <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer" className="text-emerald-800 hover:text-emerald-900 underline underline-offset-4">{source.label}</a></li>
            ))}
          </ul>
        </section>
      </article>
    </main>
  );
}
