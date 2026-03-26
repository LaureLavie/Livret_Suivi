'use client';

import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { notFound } from 'next/navigation';

type Livret = any; // On typpera mieux plus tard

export default function LivretPage({ params }: { params: { token: string } }) {
  const [livret, setLivret] = useState<Livret | null>(null);
  const [loading, setLoading] = useState(true);
  const [isTuteur, setIsTuteur] = useState(true); // Pour l'instant on simule le tuteur (tu pourras ajouter un param ?mode=referent plus tard)

  const { register, handleSubmit, setValue, watch } = useForm();

  // Récupération du livret via le token
  useEffect(() => {
    const fetchLivret = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/livrets?filters[tokenAcces][$eq]=${params.token}&populate=deep`,
          { cache: 'no-store' }
        );

        if (!res.ok) throw new Error('Livret non trouvé');
        
        const { data } = await res.json();
        if (data.length === 0) return notFound();

        const livretData = data[0];
        setLivret(livretData);

        // Pré-remplir le formulaire avec les données existantes
        if (livretData.attributes.entreprise) {
          Object.keys(livretData.attributes.entreprise).forEach(key => {
            setValue(`entreprise.${key}`, livretData.attributes.entreprise[key]);
          });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchLivret();
  }, [params.token, setValue]);

  const onSubmit: SubmitHandler<any> = async (data) => {
    if (!livret) return;

    try {
      await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/livrets/${livret.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: {
            entreprise: data.entreprise,
            // Tu pourras ajouter ici d'autres champs selon le rôle
          }
        }),
      });

      alert('Livret mis à jour avec succès !');
    } catch (error) {
      alert('Erreur lors de la sauvegarde');
    }
  };

  if (loading) return <div className="text-center py-20">Chargement du livret...</div>;
  if (!livret) return notFound();

  const { etudiant, entreprise, suiviCompetences = [], bilansIntermediaires = [], bilanFinal, cahierLiaison } = livret.attributes;

  return (
    <div className="min-h-screen bg-gray-50 py-8 print:bg-white print:py-0">
      <div className="max-w-4xl mx-auto bg-white shadow-xl p-10 print:shadow-none print:p-8">

        {/* En-tête */}
        <header className="border-b-4 border-bleu-cobalt pb-6 mb-10">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold text-bleu-cobalt">LIVRET DE SUIVI EN ALTERNANCE</h1>
              <p className="text-2xl mt-2 text-gray-700">
                {etudiant?.data?.attributes?.prenom} {etudiant?.data?.attributes?.nom}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Année {etudiant?.data?.attributes?.formation?.data?.attributes?.annee}</p>
              <p className="font-medium text-bleu-cyan">CFA - Promotion 2025/2026</p>
            </div>
          </div>
        </header>

        {/* 1. Identification Apprenti */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-bleu-cobalt mb-4 border-l-4 border-bleu-cobalt pl-4">
            1. IDENTIFICATION DE L'APPRENTI
          </h2>
          <div className="grid grid-cols-2 gap-6 text-sm">
            <p><strong>Nom :</strong> {etudiant?.data?.attributes?.nom}</p>
            <p><strong>Prénom :</strong> {etudiant?.data?.attributes?.prenom}</p>
            <p><strong>Email :</strong> {etudiant?.data?.attributes?.email}</p>
            <p><strong>Téléphone :</strong> {etudiant?.data?.attributes?.telephone}</p>
          </div>
        </section>

        {/* 2. Entreprise d'accueil - À remplir par le TUTEUR */}
        <section className="mb-12 border border-bleu-cyan rounded-2xl p-8 bg-blue-50/30">
          <h2 className="text-2xl font-semibold text-bleu-cobalt mb-6 border-l-4 border-bleu-cyan pl-4">
            2. ENTREPRISE D'ACCUEIL (à remplir par le tuteur)
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">Dénomination de l'entreprise</label>
                <input 
                  {...register('entreprise.designation')} 
                  className="w-full border border-gray-300 rounded-lg p-3" 
                  placeholder="Nom de l'entreprise"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Adresse</label>
                <input 
                  {...register('entreprise.adresse')} 
                  className="w-full border border-gray-300 rounded-lg p-3" 
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">Nom du tuteur</label>
                <input {...register('entreprise.tuteurNom')} className="w-full border border-gray-300 rounded-lg p-3" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Fonction</label>
                <input {...register('entreprise.tuteurFonction')} className="w-full border border-gray-300 rounded-lg p-3" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">Téléphone tuteur</label>
                <input {...register('entreprise.tuteurTelephone')} className="w-full border border-gray-300 rounded-lg p-3" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email tuteur</label>
                <input type="email" {...register('entreprise.tuteurEmail')} className="w-full border border-gray-300 rounded-lg p-3" />
              </div>
            </div>

            <button 
              type="submit"
              className="bg-bleu-cobalt text-white px-10 py-4 rounded-xl font-medium hover:bg-blue-800 transition"
            >
              Enregistrer les informations entreprise
            </button>
          </form>
        </section>

        {/* 3. Suivi des compétences */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-bleu-cobalt mb-6">3. SUIVI DES COMPÉTENCES</h2>
          {suiviCompetences.map((bloc: any, index: number) => (
            <div key={index} className="mb-8 p-6 border rounded-xl">
              <h3 className="font-semibold mb-4">{bloc.competence}</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <p><strong>Niveau atteint :</strong> {bloc.niveauAtteint || 'Non renseigné'}</p>
                <p><strong>Commentaire Tuteur :</strong> {bloc.commentaireTuteur || '-'}</p>
                <p><strong>Commentaire Référent :</strong> {bloc.commentaireReferent || '-'}</p>
              </div>
            </div>
          ))}
        </section>

        {/* 4. Bilans intermédiaires */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-bleu-cobalt mb-6">4. BILANS INTERMÉDIAIRES</h2>
          {bilansIntermediaires.map((bilan: any, index: number) => (
            <div key={index} className="mb-8 border-l-4 border-orange-brique pl-6">
              <h3 className="font-medium">Bilan n°{bilan.numero} - {new Date(bilan.date).toLocaleDateString('fr-FR')}</h3>
              <p><strong>Missions :</strong> {bilan.missionsRealisees}</p>
              <p><strong>Points positifs :</strong> {bilan.pointsPositifs}</p>
              <p><strong>Difficultés :</strong> {bilan.difficultes}</p>
              <p><strong>Objectifs suivants :</strong> {bilan.objectifsSuivants}</p>
            </div>
          ))}
        </section>

        {/* Boutons en bas */}
        <div className="flex gap-4 print:hidden mt-16">
          <button 
            onClick={() => window.print()}
            className="bg-orange-brique text-white px-8 py-4 rounded-xl font-medium"
          >
            Générer le PDF
          </button>
          <button className="bg-gray-600 text-white px-8 py-4 rounded-xl font-medium">
            Retour
          </button>
        </div>
      </div>
    </div>
  );
}