export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto py-20 px-6">
        <h1 className="text-5xl font-bold text-bleu-cobalt mb-6">
          Livret de Suivi Étudiant
        </h1>
        
        <p className="text-xl text-gray-600 mb-12">
          Plateforme de suivi des alternants – Tuteur & Référent Pédagogique
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 border border-gray-200 rounded-2xl hover:border-bleu-cyan transition-colors">
            <div className="w-12 h-12 bg-bleu-cyan/10 rounded-xl flex items-center justify-center mb-6">
              🏢
            </div>
            <h3 className="text-2xl font-semibold text-bleu-cobalt mb-3">Espace Tuteur</h3>
            <p className="text-gray-600">Remplissez la partie entreprise via lien unique.</p>
          </div>

          <div className="p-8 border border-gray-200 rounded-2xl hover:border-orange-brique transition-colors">
            <div className="w-12 h-12 bg-orange-brique/10 rounded-xl flex items-center justify-center mb-6">
              📚
            </div>
            <h3 className="text-2xl font-semibold text-bleu-cobalt mb-3">Espace Référent</h3>
            <p className="text-gray-600">Complétez la partie pédagogique et générez le PDF.</p>
          </div>

          <div className="p-8 border border-gray-200 rounded-2xl hover:border-bleu-cobalt transition-colors">
            <div className="w-12 h-12 bg-bleu-cobalt/10 rounded-xl flex items-center justify-center mb-6">
              📊 
            </div>
            <h3 className="text-2xl font-semibold text-bleu-cobalt mb-3">Admin</h3>
            <p className="text-gray-600">Gestion des étudiants, formations et livrets.</p>
          </div>
        </div>
      </div>
    </main>
  );
}