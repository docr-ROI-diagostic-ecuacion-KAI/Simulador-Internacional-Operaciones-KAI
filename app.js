const seed = {
  mercados: [
    { pais: 'Mexico', demanda: 8.8, arancel: 5, logistica: 7, estabilidad: 6.6, competencia: 6.5, lead: 18, acuerdo: 'UE-Mexico modernizado/en negociacion' },
    { pais: 'Marruecos', demanda: 7.2, arancel: 0, logistica: 8.6, estabilidad: 7, competencia: 5.3, lead: 6, acuerdo: 'Acuerdo Asociacion UE-Marruecos' },
    { pais: 'Chile', demanda: 7.4, arancel: 0, logistica: 6.5, estabilidad: 8, competencia: 5.9, lead: 23, acuerdo: 'Acuerdo UE-Chile' },
    { pais: 'Estados Unidos', demanda: 9.4, arancel: 3.2, logistica: 7.3, estabilidad: 7.2, competencia: 8.8, lead: 14, acuerdo: 'Sin FTA UE-US general' },
    { pais: 'Alemania', demanda: 8.1, arancel: 0, logistica: 9.2, estabilidad: 8.6, competencia: 8.2, lead: 3, acuerdo: 'Mercado unico UE' },
    { pais: 'Reino Unido', demanda: 8, arancel: 0, logistica: 8, estabilidad: 7.6, competencia: 7.8, lead: 4, acuerdo: 'Acuerdo Comercio y Cooperacion UE-UK' }
  ],
  costes: [
    { hs: '330499', pais: 'Mexico', arancel: 10, iva: 16, despacho: 190, seguro: 0.006, flete: 850, docs: 120 },
    { hs: '330499', pais: 'Marruecos', arancel: 2.5, iva: 20, despacho: 150, seguro: 0.006, flete: 420, docs: 90 },
    { hs: '330499', pais: 'Chile', arancel: 6, iva: 19, despacho: 200, seguro: 0.006, flete: 1050, docs: 115 },
    { hs: '220421', pais: 'Mexico', arancel: 8, iva: 16, despacho: 180, seguro: 0.004, flete: 980, docs: 95 },
    { hs: '940360', pais: 'Mexico', arancel: 15, iva: 16, despacho: 240, seguro: 0.005, flete: 1350, docs: 140 }
  ],
  rutas: [
    { id: 'R1', origen: 'Madrid', destino: 'Marruecos', modo: 'Terrestre + ferry', coste: 620, dias: 5, fiabilidad: 8.2, riesgo: 3, co2: 420, docs: 5 },
    { id: 'R2', origen: 'Madrid', destino: 'Marruecos', modo: 'Aereo', coste: 1850, dias: 2, fiabilidad: 8.8, riesgo: 2.4, co2: 920, docs: 5 },
    { id: 'R3', origen: 'Valencia', destino: 'Mexico', modo: 'Maritimo FCL/LCL', coste: 1480, dias: 21, fiabilidad: 7.1, riesgo: 4.3, co2: 1300, docs: 7 },
    { id: 'R4', origen: 'Madrid', destino: 'Mexico', modo: 'Aereo', coste: 4200, dias: 4, fiabilidad: 8.6, riesgo: 3.1, co2: 2900, docs: 6.5 },
    { id: 'R5', origen: 'Valencia', destino: 'Chile', modo: 'Maritimo', coste: 1720, dias: 27, fiabilidad: 6.9, riesgo: 4.6, co2: 1600, docs: 7.2 },
    { id: 'R7', origen: 'Barcelona', destino: 'Alemania', modo: 'Terrestre grupaje', coste: 520, dias: 3, fiabilidad: 8.9, riesgo: 2, co2: 350, docs: 2 }
  ],
  fuentes: [
    ['Access2Markets', 'Aranceles, reglas de origen y requisitos de importacion', 'Consulta manual o HTTP'],
    ['TARIC', 'Medidas arancelarias y restricciones UE', 'Consulta manual o HTTP'],
    ['Frankfurter FX', 'Tipo de cambio demo sin API key', 'HTTP publico'],
    ['World Bank API', 'Indicadores pais macro/riesgo', 'HTTP publico']
  ]
};

const practices = {
  P1: {
    kicker: 'Practica 1', title: 'Radar de mercados internacionales', short: 'Comparar paises y priorizar mercado.',
    intro: 'El alumno compara mercados con demanda, arancel, logistica, estabilidad y competencia. El ranking ordena evidencias para discutir una decision.',
    demo: { alumno: 'Equipo 1', producto: 'Cosmetica natural premium', hs_code: '330499', pais_origen: 'Espana', paises_objetivo: 'Mexico,Marruecos,Chile', riesgo_maximo_0_10: 6, margen_objetivo_pct: 30 },
    fields: [
      ['alumno','Equipo / alumno','text','Identifica quien realiza la practica.'], ['producto','Producto','text','Define que se exporta y condiciona el analisis.'], ['hs_code','Codigo HS','select','Clasificacion arancelaria simulada.',['330499','220421','940360']], ['pais_origen','Pais de origen','text','Origen para acuerdos, reglas y logistica.'], ['paises_objetivo','Paises objetivo','text','Lista separada por comas para filtrar mercados.'], ['riesgo_maximo_0_10','Riesgo maximo aceptado','number','Umbral docente de revision.'], ['margen_objetivo_pct','Margen objetivo (%)','number','Contexto comercial para debatir atractivo.']
    ],
    process: ['Se normalizan paises y numeros.', 'Se cruzan paises con la tabla Mercados.', 'Se ponderan demanda, logistica, estabilidad, arancel y competencia.', 'Se propone ranking y semaforo docente.'], run: runRadar
  },
  P2: {
    kicker: 'Practica 2', title: 'Landed cost + ROI exportador', short: 'Calcular coste puesto en destino y precio.',
    intro: 'El alumno ve como el precio EXW se transforma en coste total: flete, seguro, arancel, despacho y documentacion.',
    demo: { alumno: 'Equipo 2', producto: 'Cosmetica natural premium', hs_code: '330499', pais_destino: 'Mexico', incoterm: 'EXW', unidades: 1000, precio_exw_unit_eur: 8.5, margen_objetivo_pct: 30 },
    fields: [
      ['alumno','Equipo / alumno','text','Asocia la simulacion al grupo.'], ['producto','Producto','text','Producto exportado.'], ['hs_code','Codigo HS','select','Codigo para recuperar aranceles y costes.',['330499','220421','940360']], ['pais_destino','Pais destino','select','Mercado de importacion.',['Mexico','Marruecos','Chile']], ['incoterm','Incoterm','select','Marco de reparto de costes.',['EXW','FCA','CIF','DAP']], ['unidades','Unidades','number','Cantidad exportada.'], ['precio_exw_unit_eur','Precio EXW unitario (EUR)','number','Precio antes de costes internacionales.'], ['margen_objetivo_pct','Margen objetivo (%)','number','Margen esperado para recomendar precio.']
    ],
    process: ['Se normalizan precio, unidades y margen.', 'HS y destino recuperan costes simulados.', 'Se calcula base aduana, arancel, despacho y documentacion.', 'Se obtiene coste unitario, precio recomendado y ROI.'], run: runLanded
  },
  P3: {
    kicker: 'Practica 3', title: 'Ruta logistica inteligente', short: 'Elegir ruta por coste, plazo, riesgo y CO2.',
    intro: 'El alumno compara rutas y entiende trade-offs entre coste, rapidez, fiabilidad, riesgo y sostenibilidad.',
    demo: { alumno: 'Equipo 3', producto: 'Cosmetica natural premium', origen: 'Madrid', destino: 'Mexico', prioridad: 'equilibrada', valor_mercancia_eur: 8500, peso_kg: 450, urgencia_dias_max: 20 },
    fields: [
      ['alumno','Equipo / alumno','text','Grupo que toma la decision.'], ['producto','Producto','text','Producto transportado.'], ['origen','Origen','select','Ciudad de salida simulada.',['Madrid','Valencia','Barcelona']], ['destino','Destino','select','Pais destino.',['Mexico','Marruecos','Chile','Alemania','Reino Unido']], ['prioridad','Prioridad','select','Criterio dominante.',['equilibrada','coste','rapidez']], ['valor_mercancia_eur','Valor mercancia (EUR)','number','Valor expuesto al transporte.'], ['peso_kg','Peso (kg)','number','Variable operativa para razonar modo.'], ['urgencia_dias_max','Urgencia maxima (dias)','number','Plazo limite del cliente.']
    ],
    process: ['Se normaliza destino, urgencia y prioridad.', 'Se filtran rutas candidatas.', 'La prioridad cambia los pesos del score.', 'Se recomienda ruta y trade-off.'], run: runRuta
  },
  P4: {
    kicker: 'Practica 4', title: 'Agente integrador con fuentes externas', short: 'Unir mercado, coste, ruta y validaciones.',
    intro: 'El alumno simula una decision completa y separa lo calculado de lo que debe validarse con fuentes externas.',
    demo: { alumno: 'Equipo 4', objetivo: 'Decidir lanzamiento piloto', producto: 'Cosmetica natural premium', hs_code: '330499', pais_origen: 'Espana', pais_destino: 'Mexico', unidades: 1000, precio_exw_unit_eur: 8.5, prioridad_logistica: 'equilibrada', pregunta_usuario: 'Lanzamos operacion piloto a Mexico?' },
    fields: [
      ['alumno','Equipo / alumno','text','Quien presenta la decision.'], ['objetivo','Objetivo de negocio','text','Pregunta que guia el analisis.'], ['producto','Producto','text','Producto de la decision.'], ['hs_code','Codigo HS','select','Clasificacion arancelaria.',['330499','220421','940360']], ['pais_origen','Pais origen','text','Origen para reglas y acuerdos.'], ['pais_destino','Pais destino','select','Mercado final.',['Mexico','Marruecos','Chile','Alemania','Reino Unido']], ['unidades','Unidades','number','Cantidad para coste unitario.'], ['precio_exw_unit_eur','Precio EXW unitario (EUR)','number','Precio base.'], ['prioridad_logistica','Prioridad logistica','select','Criterio de ruta.',['equilibrada','coste','rapidez']], ['pregunta_usuario','Pregunta al agente','textarea','Consulta de negocio que debe responderse con evidencias.']
    ],
    process: ['Se convierte la pregunta en caso de decision.', 'Se integran mercado, coste, ruta y fuentes.', 'Se separa calculado de pendiente de validar.', 'Se recomienda APTO, APTO CON VALIDACION o REPLANTEAR.'], run: runIntegrador
  }
};

let currentPractice = 'P1';
let lastSummary = '';
const nav = document.querySelector('#practiceNav');
const form = document.querySelector('#simulatorForm');
const resultView = document.querySelector('#resultView');
const processView = document.querySelector('#processView');

function money(v){ return Number(v).toLocaleString('es-ES',{maximumFractionDigits:2}) + ' EUR'; }
function pct(v){ return Number(v).toLocaleString('es-ES',{maximumFractionDigits:1}) + '%'; }
function num(v){ return Number(v).toLocaleString('es-ES',{maximumFractionDigits:2}); }
function asNumber(v){ const n = Number(String(v).replace(',','.')); return Number.isFinite(n) ? n : 0; }
function norm(v){ return String(v || '').trim().toLowerCase(); }

function renderNav(){
  nav.innerHTML = Object.entries(practices).map(([id,p]) => `<button class='practice-tab ${id === currentPractice ? 'active' : ''}' data-practice='${id}' type='button'><strong>${p.kicker}</strong><span>${p.short}</span></button>`).join('');
}

function renderPractice(){
  const p = practices[currentPractice];
  document.querySelector('#practiceKicker').textContent = p.kicker;
  document.querySelector('#practiceTitle').textContent = p.title;
  document.querySelector('#practiceIntro').textContent = p.intro;
  form.innerHTML = p.fields.map(([name,label,type,help,options]) => fieldTemplate(name,label,type,help,options,p.demo[name])).join('');
  renderProcess(p.process);
  runCurrent();
}

function fieldTemplate(name,label,type,help,options,value){
  if(type === 'select') return `<div class='field-row'><label for='${name}'>${label}</label><select id='${name}' name='${name}'>${options.map(o => `<option value='${o}' ${o === value ? 'selected' : ''}>${o}</option>`).join('')}</select><p class='field-help'>${help}</p></div>`;
  if(type === 'textarea') return `<div class='field-row'><label for='${name}'>${label}</label><textarea id='${name}' name='${name}'>${value ?? ''}</textarea><p class='field-help'>${help}</p></div>`;
  return `<div class='field-row'><label for='${name}'>${label}</label><input id='${name}' name='${name}' type='${type}' value='${value ?? ''}' ${type === 'number' ? 'step=any' : ''}><p class='field-help'>${help}</p></div>`;
}

function formData(){ return Object.fromEntries(new FormData(form).entries()); }
function loadDemo(){ Object.entries(practices[currentPractice].demo).forEach(([k,v]) => { if(form.elements[k]) form.elements[k].value = v; }); runCurrent(); }
function renderProcess(steps){ processView.innerHTML = steps.map((s,i) => `<article class='process-step'><span>${i+1}</span><div><strong>${['Entrada','Dato','Calculo','Salida'][i]}</strong><p>${s}</p></div></article>`).join(''); }
function runCurrent(){ const out = practices[currentPractice].run(formData()); resultView.innerHTML = out.html; lastSummary = out.summary; }
function statusClass(t){ return /descartar|replantear|revisar|no cumple/i.test(t) ? 'status-bad' : /validacion|riesgo/i.test(t) ? 'status-warn' : 'status-ok'; }

function runRadar(raw){
  const targets = String(raw.paises_objetivo || '').split(',').map(norm).filter(Boolean);
  const selected = seed.mercados.filter(m => targets.includes(norm(m.pais)));
  const rows = (selected.length ? selected : seed.mercados).map(m => {
    const score = m.demanda*.35 + m.logistica*.2 + m.estabilidad*.2 + Math.max(0,10-m.arancel/2)*.15 + Math.max(0,10-m.competencia)*.1;
    const riesgo = Math.max(0,10-m.estabilidad+m.competencia/10);
    return { ...m, score: Number(score.toFixed(2)), semaforo: riesgo <= asNumber(raw.riesgo_maximo_0_10) ? 'APTO' : 'REVISAR RIESGO' };
  }).sort((a,b) => b.score-a.score);
  const best = rows[0];
  const summary = `Radar de mercados: ${best.pais} queda como prioridad con score ${best.score}/10. Semaforo: ${best.semaforo}.`;
  return { summary, html: decision(summary, `${best.score}/10`) + metrics([['Pais recomendado',best.pais],['Lead time',`${best.lead} dias`],['Acuerdo',best.acuerdo],['Demanda',`${best.demanda}/10`],['Arancel',pct(best.arancel)],['Competencia',`${best.competencia}/10`]]) + table(['Pais','Score','Arancel','Lead time','Semaforo'], rows.map(r => [r.pais,`${r.score}/10`,pct(r.arancel),`${r.lead} dias`,`<strong class='${statusClass(r.semaforo)}'>${r.semaforo}</strong>`])) + explain(['Demanda pesa 35% porque representa potencial comercial.','Logistica y estabilidad pesan 20% cada una porque afectan ejecucion y riesgo.','El arancel se transforma en score inverso.','La competencia tambien se invierte: mucha competencia reduce espacio de entrada.']) };
}

function landedCalc(raw){
  const row = seed.costes.find(x => x.hs === raw.hs_code && norm(x.pais) === norm(raw.pais_destino)) || seed.costes.find(x => x.hs === raw.hs_code) || seed.costes[0];
  const unidades = Math.max(1, asNumber(raw.unidades));
  const valor = asNumber(raw.precio_exw_unit_eur) * unidades;
  const seguro = valor * row.seguro;
  const base = valor + row.flete + seguro;
  const arancel = base * row.arancel / 100;
  const total = base + arancel + row.despacho + row.docs;
  const iva = total * row.iva / 100;
  const unit = total / unidades;
  const price = unit * (1 + asNumber(raw.margen_objetivo_pct || 30) / 100);
  const roi = (price - unit) / unit * 100;
  return { row, valor, seguro, base, arancel, iva, total, unit, price, roi };
}

function runLanded(raw){
  const c = landedCalc(raw);
  const sem = c.roi >= asNumber(raw.margen_objetivo_pct) ? 'MARGEN OK' : 'REVISAR PRECIO/COSTE';
  const summary = `Landed cost: coste unitario ${money(c.unit)}, precio recomendado ${money(c.price)} y ROI operativo ${pct(c.roi)}.`;
  return { summary, html: decision(summary, sem) + metrics([['Valor mercancia',money(c.valor)],['Flete',money(c.row.flete)],['Seguro',money(c.seguro)],['Arancel',money(c.arancel)],['IVA importacion',money(c.iva)],['Coste unitario',money(c.unit)],['Precio recomendado',money(c.price)],['ROI operativo',pct(c.roi)],['Semaforo',sem]]) + explain(['La base de aduana suma mercancia, flete y seguro.','El arancel se calcula sobre esa base.','Despacho y documentacion son costes fijos repartidos por unidad.','El IVA se muestra para entender caja/importacion en el modelo docente.']) };
}

function scoreRoutes(raw){
  const weights = { coste:{coste:.45,rapidez:.15,fiabilidad:.15,riesgo:.2,co2:.05}, rapidez:{coste:.15,rapidez:.45,fiabilidad:.2,riesgo:.15,co2:.05}, equilibrada:{coste:.25,rapidez:.25,fiabilidad:.2,riesgo:.2,co2:.1} }[raw.prioridad || raw.prioridad_logistica] || {coste:.25,rapidez:.25,fiabilidad:.2,riesgo:.2,co2:.1};
  const routes = seed.rutas.filter(r => norm(r.destino).includes(norm(raw.destino || raw.pais_destino)) || norm(raw.destino || raw.pais_destino).includes(norm(r.destino)));
  const list = routes.length ? routes : seed.rutas;
  const maxCost = Math.max(...list.map(r => r.coste)), maxDays = Math.max(...list.map(r => r.dias)), maxCo2 = Math.max(...list.map(r => r.co2));
  return list.map(r => {
    const score = (10-r.coste/maxCost*10)*weights.coste + (10-r.dias/maxDays*10)*weights.rapidez + r.fiabilidad*weights.fiabilidad + (10-r.riesgo)*weights.riesgo + (10-r.co2/maxCo2*10)*weights.co2;
    return { ...r, score:Number(score.toFixed(2)), cumple: r.dias <= asNumber(raw.urgencia_dias_max || 20) ? 'CUMPLE' : 'NO CUMPLE' };
  }).sort((a,b) => b.score-a.score);
}

function runRuta(raw){
  const rows = scoreRoutes(raw); const best = rows[0];
  const summary = `Ruta recomendada: ${best.modo}, ${best.dias} dias, ${money(best.coste)}, score ${best.score}/10.`;
  return { summary, html: decision(summary, `${best.score}/10`) + metrics([['Ruta',best.id],['Modo',best.modo],['Coste',money(best.coste)],['Plazo',`${best.dias} dias`],['Fiabilidad',`${best.fiabilidad}/10`],['Riesgo',`${best.riesgo}/10`],['CO2',`${num(best.co2)} kg`],['Urgencia',best.cumple],['Complejidad docs',`${best.docs}/10`]]) + table(['Ruta','Modo','Coste','Dias','Score','Urgencia'], rows.map(r => [r.id,r.modo,money(r.coste),r.dias,`${r.score}/10`,`<strong class='${statusClass(r.cumple)}'>${r.cumple}</strong>`])) + explain(['Si la prioridad es coste, el coste pesa mas que la rapidez.','Si la prioridad es rapidez, el plazo domina.','Riesgo y fiabilidad evitan elegir solo por precio.','CO2 abre debate de sostenibilidad.']) };
}

function runIntegrador(raw){
  const mercado = seed.mercados.find(m => norm(m.pais) === norm(raw.pais_destino)) || seed.mercados[0];
  const c = landedCalc({ ...raw, margen_objetivo_pct: 30 });
  const route = scoreRoutes({ destino: raw.pais_destino, prioridad: raw.prioridad_logistica, urgencia_dias_max: 20 })[0];
  const score = mercado.demanda*.35 + mercado.logistica*.2 + mercado.estabilidad*.2 + Math.max(0,10-c.row.arancel/2)*.15 + Math.max(0,10-mercado.competencia)*.1;
  const dec = score >= 7.5 && c.row.arancel <= 10 ? 'APTO' : score < 5.5 ? 'REPLANTEAR' : 'APTO CON VALIDACION';
  const summary = `${dec}. Score integrado ${num(score)}/10. Landed unitario estimado ${money(c.unit)}. Validar arancel, reglas de origen y tipo de cambio.`;
  return { summary, html: decision(summary, `${num(score)}/10`) + metrics([['Decision',dec],['Mercado',mercado.pais],['Demanda',`${mercado.demanda}/10`],['Landed unitario',money(c.unit)],['Arancel simulado',pct(c.row.arancel)],['Ruta',`${route.modo}, ${route.dias} dias`],['Pregunta',raw.pregunta_usuario || 'Sin pregunta'],['Dato calculado','Mercado + coste + ruta'],['Dato a validar','Fuentes externas']]) + table(['Fuente','Para que sirve','Tipo'], seed.fuentes) + explain(['El agente separa datos simulados de datos reales pendientes.','Access2Markets y TARIC sirven para contrastar aranceles y reglas.','La decision final exige defender supuestos, no solo aceptar el semaforo.']) };
}

function decision(text, score){ return `<section class='decision-strip'><strong>${text}</strong><div class='score-pill'>${score}</div></section>`; }
function metrics(items){ return `<section class='metric-grid'>${items.map(([l,v]) => `<article class='metric'><span>${l}</span><strong>${v}</strong></article>`).join('')}</section>`; }
function explain(items){ return `<section class='explain-list'>${items.map((it,i) => `<article class='explain-item'><span>${i+1}</span><p>${it}</p></article>`).join('')}</section>`; }
function table(headers, rows){ return `<table class='ranking-table'><thead><tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table>`; }

nav.addEventListener('click', e => { const tab = e.target.closest('[data-practice]'); if(!tab) return; currentPractice = tab.dataset.practice; renderNav(); renderPractice(); });
document.querySelector('#loadDemo').addEventListener('click', loadDemo);
document.querySelector('#runSimulation').addEventListener('click', runCurrent);
document.querySelector('#copySummary').addEventListener('click', async () => { try { await navigator.clipboard.writeText(lastSummary); document.querySelector('#copySummary').textContent = 'Resumen copiado'; } catch { document.querySelector('#copySummary').textContent = 'Copia no disponible'; } setTimeout(() => document.querySelector('#copySummary').textContent = 'Copiar resumen', 1400); });

renderNav();
renderPractice();
