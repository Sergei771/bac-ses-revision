import Link from "next/link";
import { ArrowLeft, BookOpen, Clock, Loader2, Star } from "lucide-react";
import QuizPageClient from "./quiz-page-client";

// Cette fonction est appelée au moment du build pour générer toutes les routes statiques
export function generateStaticParams() {
  return [
    // Économie
    { subject: 'economie', slug: 'marche-prix' },
    { subject: 'economie', slug: 'comportement-consommateur' },
    { subject: 'economie', slug: 'concurrence' },
    { subject: 'economie', slug: 'defaillances-marche' },
    { subject: 'economie', slug: 'croissance-economique' },
    { subject: 'economie', slug: 'fluctuations' },
    { subject: 'economie', slug: 'chomage-inflation' },
    { subject: 'economie', slug: 'politiques-stabilisation' },
    { subject: 'economie', slug: 'fondements-commerce' },
    { subject: 'economie', slug: 'firmes-multinationales' },
    { subject: 'economie', slug: 'desequilibres-mondiaux' },
    { subject: 'economie', slug: 'globalisation-financiere' },
    { subject: 'economie', slug: 'politique-budgetaire' },
    { subject: 'economie', slug: 'politique-monetaire' },
    { subject: 'economie', slug: 'politiques-emploi' },
    { subject: 'economie', slug: 'regulation-economique' },
    
    // Sociologie
    { subject: 'sociologie', slug: 'socialisation-primaire-secondaire' },
    { subject: 'sociologie', slug: 'instances-socialisation' },
    { subject: 'sociologie', slug: 'diversite-socialisation' },
    { subject: 'sociologie', slug: 'lien-social-integration' },
    { subject: 'sociologie', slug: 'definition-typologie' },
    { subject: 'sociologie', slug: 'reseaux-capital-social' },
    { subject: 'sociologie', slug: 'sociabilite-numerique' },
    { subject: 'sociologie', slug: 'normes-deviance' },
    { subject: 'sociologie', slug: 'classes-sociales' },
    
    // Science Politique
    { subject: 'science-politique', slug: 'pouvoir-politique' },
    { subject: 'science-politique', slug: 'democratie' },
    { subject: 'science-politique', slug: 'action-publique' }
  ];
}

export default function QuizPage({
  params
}: {
  params: { subject: string; slug: string }
}) {
  return <QuizPageClient subject={params.subject} slug={params.slug} />;
}
