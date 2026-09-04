import { ArrowLeft, ArrowRight, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { conseilArticles } from '../articles';

export function GuidePage() {
  return (
    <main className="pt-28 pb-16 md:pt-36 md:pb-24 bg-stone-50 min-h-[70vh]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/conseil" className="inline-flex items-center text-sm font-medium text-emerald-700 hover:text-emerald-900 hover:underline mb-8">
          <ArrowLeft className="w-4 h-4 mr-1" /> Retour à l’accueil
        </Link>
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold tracking-wider uppercase mb-4"><BookOpen className="w-4 h-4" /> Ressources</div>
          <h1 className="text-3xl md:text-5xl font-bold text-stone-900 mb-5">Le guide Google du commerçant</h1>
          <p className="text-lg text-stone-600">Des repères simples, sourcés et applicables pour mieux présenter son établissement et demander des avis de manière saine.</p>
        </div>
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {conseilArticles.map((article) => (
            <Link key={article.slug} to={`/conseil/guide/${article.slug}`} className="group bg-white rounded-2xl p-6 border border-stone-200 shadow-sm hover:border-emerald-700 hover:shadow-md transition-all flex flex-col min-h-60">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-4">{article.category} · {article.readingTime}</span>
              <h2 className="text-xl font-bold text-stone-900 group-hover:text-emerald-800 transition-colors leading-tight">{article.title}</h2>
              <span className="mt-auto pt-7 flex items-center text-sm font-medium text-stone-600 group-hover:text-emerald-800">Lire l’article <ArrowRight className="ml-1 w-4 h-4" /></span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
