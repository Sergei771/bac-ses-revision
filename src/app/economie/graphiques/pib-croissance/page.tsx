"use client";

import Link from "next/link";
import { ArrowLeft, TrendingUp } from "lucide-react";
import {
  LineChart as RLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceArea
} from "recharts";
import { useState } from "react";

const PIB_DATA = {
  France: [
    { annee: 2010, PIB: 2100 },
    { annee: 2011, PIB: 2150 },
    { annee: 2012, PIB: 2170 },
    { annee: 2013, PIB: 2180 },
    { annee: 2014, PIB: 2200 },
    { annee: 2015, PIB: 2250 },
    { annee: 2016, PIB: 2300 },
    { annee: 2017, PIB: 2380 },
    { annee: 2018, PIB: 2450 },
    { annee: 2019, PIB: 2500 },
    { annee: 2020, PIB: 2400 },
    { annee: 2021, PIB: 2520 },
    { annee: 2022, PIB: 2600 },
  ],
  Allemagne: [
    { annee: 2010, PIB: 2500 },
    { annee: 2011, PIB: 2600 },
    { annee: 2012, PIB: 2650 },
    { annee: 2013, PIB: 2700 },
    { annee: 2014, PIB: 2750 },
    { annee: 2015, PIB: 2800 },
    { annee: 2016, PIB: 2850 },
    { annee: 2017, PIB: 2950 },
    { annee: 2018, PIB: 3050 },
    { annee: 2019, PIB: 3100 },
    { annee: 2020, PIB: 3000 },
    { annee: 2021, PIB: 3150 },
    { annee: 2022, PIB: 3250 },
  ],
  USA: [
    { annee: 2010, PIB: 14500 },
    { annee: 2011, PIB: 15000 },
    { annee: 2012, PIB: 15500 },
    { annee: 2013, PIB: 16000 },
    { annee: 2014, PIB: 16500 },
    { annee: 2015, PIB: 17000 },
    { annee: 2016, PIB: 17500 },
    { annee: 2017, PIB: 18200 },
    { annee: 2018, PIB: 19000 },
    { annee: 2019, PIB: 19500 },
    { annee: 2020, PIB: 18500 },
    { annee: 2021, PIB: 20000 },
    { annee: 2022, PIB: 21000 },
  ],
};

const PHASES = [
  { start: 2010, end: 2014, label: "Expansion", color: "#bbf7d0" },
  { start: 2015, end: 2016, label: "Ralentissement", color: "#fef9c3" },
  { start: 2017, end: 2019, label: "Expansion", color: "#bbf7d0" },
  { start: 2020, end: 2020, label: "Crise", color: "#fee2e2" },
  { start: 2021, end: 2022, label: "Reprise", color: "#dbeafe" },
];

function tauxCroissanceAnnuel(data: { annee: number; PIB: number }[]) {
  // Renvoie un tableau [{annee, taux}]
  return data.slice(1).map((d, i) => ({
    annee: d.annee,
    taux: ((d.PIB - data[i].PIB) / data[i].PIB) * 100,
  }));
}

function croissanceMoyenne(data: { annee: number; PIB: number }[], debut: number, fin: number) {
  const d0 = data.find(d => d.annee === debut);
  const d1 = data.find(d => d.annee === fin);
  if (!d0 || !d1 || debut === fin) return null;
  return ((d1.PIB - d0.PIB) / d0.PIB) / (fin - debut) * 100;
}

export default function PIBCroissanceGraphiquePage() {
  const [pays, setPays] = useState<"France" | "Allemagne" | "USA">("France");
  const [selectStart, setSelectStart] = useState<number | null>(null);
  const [selectEnd, setSelectEnd] = useState<number | null>(null);
  const data = PIB_DATA[pays];
  const tauxAnnuel = tauxCroissanceAnnuel(data);
  const selectionValide = selectStart !== null && selectEnd !== null && selectStart !== selectEnd;
  const debut = selectionValide ? Math.min(selectStart!, selectEnd!) : null;
  const fin = selectionValide ? Math.max(selectStart!, selectEnd!) : null;
  const croissance = (debut && fin) ? croissanceMoyenne(data, debut, fin) : null;

  const currencySymbol = pays === "USA" ? "$" : "€";

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Link href="/economie/graphiques" className="flex items-center text-eco-blue hover:underline mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" /> Retour aux graphiques
      </Link>
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-8 mb-8">
        <div className="flex items-center mb-4">
          <TrendingUp className="h-8 w-8 text-eco-blue mr-3" />
          <h1 className="text-2xl md:text-3xl font-bold text-eco-blue">Graphique interactif : PIB et croissance</h1>
        </div>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Explorez l'évolution du PIB et des indicateurs macroéconomiques à travers ce graphique interactif. Sélectionnez un pays ou une période pour comparer les trajectoires et calculer la croissance.
        </p>
        <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
          <label htmlFor="pays-select" className="text-eco-blue font-medium">Pays :</label>
          <select
            id="pays-select"
            value={pays}
            onChange={e => { setPays(e.target.value as "France" | "Allemagne" | "USA"); setSelectStart(null); setSelectEnd(null); }}
            className="rounded-lg border border-eco-blue px-3 py-1 text-eco-blue bg-white dark:bg-gray-800"
          >
            <option value="France">France</option>
            <option value="Allemagne">Allemagne</option>
            <option value="USA">USA</option>
          </select>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6 flex flex-col items-center justify-center min-h-[380px] mb-6 w-full">
          <ResponsiveContainer width="100%" height={300}>
            <RLineChart
              data={data}
              margin={{ top: 20, right: 30, left: 10, bottom: 10 }}
              onMouseDown={e => { if (e && e.activeLabel) setSelectStart(Number(e.activeLabel)); }}
              onMouseUp={e => { if (e && e.activeLabel) setSelectEnd(Number(e.activeLabel)); }}
              onMouseLeave={() => { setSelectStart(null); setSelectEnd(null); }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#c7d2fe" />
              <XAxis dataKey="annee" label={{ value: "Année", position: "insideBottomRight", offset: -5 }} tick={{ fill: '#7c3aed' }} />
              <YAxis label={{ value: `PIB (Mds ${currencySymbol})`, angle: -90, position: "insideLeft" }} tick={{ fill: '#7c3aed' }} />
              <Tooltip
                formatter={(value, name, props) => {
                  if (name === 'PIB') return [`${value} Mds ${currencySymbol}`, `PIB ${pays}`];
                  if (name === 'Taux') return [`${Number(value).toFixed(2)} %`, 'Taux de croissance annuel'];
                  return [value, name];
                }}
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const taux = tauxAnnuel.find(t => t.annee === label)?.taux;
                    return (
                      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-2 text-xs">
                        <div><b>Année :</b> {label}</div>
                        <div><span className="text-purple-600">PIB</span> : {Number(payload[0].value).toFixed(0)} Mds {currencySymbol}</div>
                        {taux !== undefined && <div><span className="text-blue-600">Taux de croissance</span> : {Number(taux).toFixed(2)} %</div>}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend verticalAlign="top" height={36} />
              {/* Phases */}
              {PHASES.map((phase, i) => (
                <ReferenceArea key={i} x1={phase.start} x2={phase.end} y1={0} y2={"auto"} fill={phase.color} fillOpacity={0.25} label={phase.label} />
              ))}
              {/* Sélection de période */}
              {selectionValide && (
                <ReferenceArea x1={debut!} x2={fin!} y1={0} y2={"auto"} fill="#f472b6" fillOpacity={0.18} />
              )}
              <Line type="monotone" dataKey="PIB" stroke="#7c3aed" strokeWidth={3} dot={{ r: 4 }} name={`PIB ${pays}`} isAnimationActive={true} />
            </RLineChart>
          </ResponsiveContainer>
          {selectionValide && croissance !== null && (
            <div className="mt-4 bg-pink-100 dark:bg-pink-900/30 rounded-lg px-4 py-2 text-pink-800 dark:text-pink-200 text-sm font-semibold text-center animate-fade-in">
              Croissance moyenne de {debut} à {fin} : {croissance.toFixed(2)} %/an
            </div>
          )}
        </div>
        <div className="prose dark:prose-invert max-w-none">
          <h2>Comment lire ce graphique ?</h2>
          <ul>
            <li><strong>Courbe du PIB</strong> : montre l'évolution de la production de richesses dans le temps.</li>
            <li><strong>Phases du cycle</strong> : expansion, crise, récession, reprise (zones colorées).</li>
            <li><strong>Comparaisons</strong> : sélectionnez un pays ou une période pour comparer les trajectoires.</li>
            <li><strong>Taux de croissance annuel</strong> : affiché dans le tooltip pour chaque année.</li>
            <li><strong>Croissance moyenne</strong> : sélectionnez une période pour la calculer.</li>
          </ul>
          <p className="mt-4">Survolez la courbe pour voir la valeur du PIB et le taux de croissance chaque année. Sélectionnez une période à la souris pour calculer la croissance moyenne.</p>
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