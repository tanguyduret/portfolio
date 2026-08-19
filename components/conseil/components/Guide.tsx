import { BookOpen, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { conseilArticles } from '../articles';

export function Guide() {
  return (
    <section className="py-16 md:py-24 bg-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-200 text-stone-700 text-xs font-bold tracking-wider uppercase mb-4">
              <BookOpen className="w-4 h-4" />
              Ressources
            </div>
            <h2 className="text-3xl font-bold text-stone-900 mb-4">Le guide Google du commerçant</h2>
            <p className="text-lg text-stone-600">
              Des articles simples pour comprendre comment améliorer votre présence locale.
            </p>
          </div>
          <Link to="/conseil/guide" className="hidden md:inline-flex items-center font-medium text-emerald-800 hover:text-emerald-900 transition-colors">
            Voir tous les articles <ArrowRight className="ml-1 w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {conseilArticles.map((article) => (
            <Link key={article.slug} to={`/conseil/guide/${article.slug}`} className="group bg-white rounded-2xl p-6 border border-stone-200 shadow-sm hover:border-emerald-700 hover:shadow-md transition-all flex flex-col justify-between h-48">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-3 block">{article.category}</span>
                <h3 className="text-lg font-bold text-stone-900 group-hover:text-emerald-800 transition-colors leading-tight">
                  {article.title}
                </h3>
              </div>
              <div className="flex items-center text-sm font-medium text-stone-500 group-hover:text-emerald-800 transition-colors">
                Lire l'article <ArrowRight className="ml-1 w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
