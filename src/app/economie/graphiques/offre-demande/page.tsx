"use client";

import Link from "next/link";
import { ArrowLeft, BarChart3 } from "lucide-react";
import {
  LineChart as RLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
  Legend,
  Area
} from "recharts";
import { useState } from "react";

// Génère les données pour l'offre et la demande
function generateData(demandShift = 0, offerShift = 0): { quantite: number; Demande: number; Offre: number }[] {
  const data = [];
  for (let q = 0; q <= 10; q++) {
    // Demande décroissante : P = 12 - (Q + décalage)
    const demande = Math.max(0, 12 - (q + demandShift));
    // Offre croissante : P = 2 + 0.8Q + décalage vertical
    const offre = 2 + 0.8 * q + offerShift;
    data.push({
      quantite: q,
      Demande: demande,
      Offre: offre,
    });
  }
  return data;
}

function findEquilibre(data: { quantite: number; Demande: number; Offre: number }[]): { quantite: number; prix: number } {
  // Cherche l'intersection la plus proche
  let minDiff = Infinity;
  let eq = { quantite: 0, prix: 0 };
  for (const d of data) {
    const diff = Math.abs(d.Demande - d.Offre);
    if (diff < minDiff) {
      minDiff = diff;
      eq = { quantite: d.quantite, prix: (d.Demande + d.Offre) / 2 };
    }
  }
  return eq;
}

// Calcul du surplus du consommateur (aire sous la courbe de demande au-dessus du prix d'équilibre)
function calculSurplusConso(data: { quantite: number; Demande: number; Offre: number }[], eq: { quantite: number; prix: number }) {
  // Aire du triangle : (prix max - prix eq) * q eq / 2
  const prixMax = data[0].Demande;
  return ((prixMax - eq.prix) * eq.quantite) / 2;
}
// Calcul du surplus du producteur (aire au-dessus de la courbe d'offre sous le prix d'équilibre)
function calculSurplusProd(data: { quantite: number; Demande: number; Offre: number }[], eq: { quantite: number; prix: number }) {
  // Aire du triangle : (prix eq - prix min) * q eq / 2
  const prixMin = data[0].Offre;
  return ((eq.prix - prixMin) * eq.quantite) / 2;
}

export default function OffreDemandeGraphiquePage() {
  const [demandShift, setDemandShift] = useState(0);
  const [offerShift, setOfferShift] = useState(0);
  const data = generateData(demandShift, offerShift);
  const equilibre = findEquilibre(data);
  const surplusConso = calculSurplusConso(data, equilibre);
  const surplusProd = calculSurplusProd(data, equilibre);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Link href="/economie/graphiques" className="flex items-center text-eco-blue hover:underline mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" /> Retour aux graphiques
      </Link>
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-8 mb-8">
        <div className="flex items-center mb-4">
          <BarChart3 className="h-8 w-8 text-eco-blue mr-3" />
          <h1 className="text-2xl md:text-3xl font-bold text-eco-blue">Graphique interactif : Offre et Demande</h1>
        </div>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Manipulez le graphique pour comprendre comment se forme l'équilibre du marché selon l'offre et la demande. Utilisez les curseurs pour déplacer les courbes et observez l'impact sur l'équilibre et les surplus.
        </p>
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 flex flex-col items-center justify-center min-h-[420px] mb-6 w-full">
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RLineChart data={data} margin={{ top: 20, right: 30, left: 10, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#c7d2fe" />
                <XAxis dataKey="quantite" label={{ value: "Quantité", position: "insideBottomRight", offset: -5 }} tick={{ fill: '#2563eb' }} />
                <YAxis label={{ value: "Prix", angle: -90, position: "insideLeft" }} tick={{ fill: '#2563eb' }} domain={[0, 14]} />
                <Tooltip
                  formatter={(value, name) => [`${value} €`, name]}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-2 text-xs">
                          <div><b>Quantité :</b> {payload[0].payload.quantite}</div>
                          <div><span className="text-orange-500">Demande</span> : {payload[0].payload.Demande} €</div>
                          <div><span className="text-blue-600">Offre</span> : {payload[0].payload.Offre} €</div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend verticalAlign="top" height={36} />
                {/* Surplus du consommateur (zone verte) */}
                <Area
                  type="monotone"
                  dataKey="Demande"
                  stroke="none"
                  fill="#bbf7d0"
                  fillOpacity={0.6}
                  isAnimationActive={true}
                  activeDot={false}
                  dot={false}
                  name="Surplus consommateur"
                  yAxisId={0}
                  connectNulls
                  // Affiche la zone entre la courbe de demande et le prix d'équilibre, jusqu'à la quantité d'équilibre
                  data={data.map(d => ({ ...d, Demande: d.quantite <= equilibre.quantite ? Math.max(d.Demande, equilibre.prix) : null }))}
                />
                {/* Surplus du producteur (zone bleue) */}
                <Area
                  type="monotone"
                  dataKey="Offre"
                  stroke="none"
                  fill="#dbeafe"
                  fillOpacity={0.7}
                  isAnimationActive={true}
                  activeDot={false}
                  dot={false}
                  name="Surplus producteur"
                  yAxisId={0}
                  connectNulls
                  data={data.map(d => ({ ...d, Offre: d.quantite <= equilibre.quantite ? Math.min(d.Offre, equilibre.prix) : null }))}
                />
                <Line type="monotone" dataKey="Demande" stroke="#f59e42" strokeWidth={3} dot={false} name="Demande" />
                <Line type="monotone" dataKey="Offre" stroke="#2563eb" strokeWidth={3} dot={false} name="Offre" />
                <ReferenceDot
                  x={equilibre.quantite}
                  y={equilibre.prix}
                  r={8}
                  fill="#10b981"
                  stroke="#fff"
                  strokeWidth={2}
                  label={{ value: `Équilibre (${equilibre.quantite}, ${equilibre.prix.toFixed(2)} €)`, position: "top", fill: '#10b981', fontWeight: 600 }}
                />
              </RLineChart>
            </ResponsiveContainer>
          </div>
          <div className="w-full flex flex-col md:flex-row items-center justify-center gap-8 mt-6">
            <div className="flex flex-col items-center">
              <label htmlFor="demand-shift" className="mb-1 text-sm text-eco-blue font-medium">Décalage de la demande</label>
              <input
                id="demand-shift"
                type="range"
                min={-4}
                max={4}
                value={demandShift}
                onChange={e => setDemandShift(Number(e.target.value))}
                className="w-48 accent-eco-blue"
              />
              <span className="text-xs text-gray-500 mt-1">Déplacez la courbe de demande vers la droite (augmentation) ou la gauche (diminution).</span>
            </div>
            <div className="flex flex-col items-center">
              <label htmlFor="offer-shift" className="mb-1 text-sm text-blue-700 font-medium">Décalage de l'offre</label>
              <input
                id="offer-shift"
                type="range"
                min={-4}
                max={4}
                value={offerShift}
                onChange={e => setOfferShift(Number(e.target.value))}
                className="w-48 accent-blue-700"
              />
              <span className="text-xs text-gray-500 mt-1">Déplacez la courbe d'offre vers le haut (coûts augmentent) ou le bas (coûts baissent).</span>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-8 mt-6 w-full justify-center">
            <div className="bg-green-100 dark:bg-green-900/30 rounded-lg px-4 py-2 text-green-800 dark:text-green-200 text-sm font-semibold flex-1 text-center">
              Surplus du consommateur : {surplusConso.toFixed(2)}
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/30 rounded-lg px-4 py-2 text-blue-800 dark:text-blue-200 text-sm font-semibold flex-1 text-center">
              Surplus du producteur : {surplusProd.toFixed(2)}
            </div>
          </div>
        </div>
        <div className="prose dark:prose-invert max-w-none">
          <h2>Comment lire ce graphique ?</h2>
          <ul>
            <li><strong>Courbe de demande</strong> : décroissante, elle montre que plus le prix est bas, plus la quantité demandée est élevée.</li>
            <li><strong>Courbe d'offre</strong> : croissante, elle montre que plus le prix est élevé, plus la quantité offerte est grande.</li>
            <li><strong>Point d'équilibre</strong> : intersection des deux courbes, il indique le prix et la quantité d'équilibre du marché.</li>
            <li><strong>Surplus du consommateur</strong> : zone verte, gain des acheteurs.</li>
            <li><strong>Surplus du producteur</strong> : zone bleue, gain des vendeurs.</li>
          </ul>
          <p className="mt-4">Utilisez les curseurs pour déplacer les courbes et observer comment l'équilibre et les surplus changent !</p>
        </div>
      </div>
      <div className="flex justify-end">
        <Link href="/economie/graphiques" className="text-eco-blue hover:underline text-sm flex items-center">
          Voir tous les graphiques <ArrowLeft className="h-3.5 w-3.5 ml-1 rotate-180" />
        </Link>
      </div>
    </div>
  );
} 