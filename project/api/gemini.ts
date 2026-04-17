export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { brand, model, year, mileage, fuel_type, transmission, power, price } = req.body;

  if (!brand || !model) return res.status(400).json({ error: 'Dados insuficientes' });

const prompt = `És um copywriter especialista em motas premium e clássicas em Portugal.
Gera um anúncio profissional e apelativo em português europeu para a seguinte mota:

Marca: ${brand}
Modelo: ${model}
Ano: ${year || 'N/A'}
Quilómetros: ${mileage ? mileage + ' km' : 'N/A'}
Combustível: ${fuel_type || 'N/A'}
Transmissão: ${transmission || 'N/A'}
Cilindrada: ${power ? power + ' cc' : 'N/A'}
Preço: ${price ? price + ' €' : 'N/A'}

Usa EXATAMENTE este formato e NÃO inventes nenhuma especificação que não foi fornecida:

[MARCA] [MODELO] — [ANO]
[subtítulo curto e apelativo em itálico, máximo 8 palavras]

---

[Parágrafo introdutório emocional sobre a história/identidade desta mota específica, 2-3 frases]

**O que torna esta unidade especial**
[Parágrafo sobre o estado e quilómetros desta mota específica, 2-3 frases]

**Ficha Técnica**
- Ano: [ano]
- Cilindrada: [cilindrada]cc
- Combustível: [combustível]
- Transmissão: [transmissão]
- Quilómetros: [quilómetros] km

**Uma oportunidade que não se repete**
[Parágrafo final apelativo com chamada à ação subtil, 2-3 frases]

📍 Motorodri — Especialistas em Motociclos Clássicos e Premium
📞 Para visita ou mais informações, contacte-nos hoje.

Regras:
- Português europeu (não brasileiro)
- Não uses asteriscos duplos no output, usa apenas texto simples
- Não inventes especificações — usa só o que foi fornecido
- Se algum campo for N/A, omite essa linha da ficha técnica`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 8192,
          }
        })
      }
    );

    const data = await response.json() as { candidates?: { content?: { parts?: { text?: string }[] } }[] };
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
    console.error('Resposta da API:', JSON.stringify(data));
    console.error('API Key presente:', !!process.env.GEMINI_API_KEY);
    return res.status(500).json({ error: 'Sem resposta da IA', debug: data });
}

    return res.status(200).json({ description: text.trim() });

  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}