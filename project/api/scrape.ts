export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { url } = req.body;
  if (!url || !url.includes('standvirtual.com')) {
    return res.status(400).json({ error: 'URL inválido' });
  }

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'pt-PT,pt;q=0.9',
        'Cache-Control': 'no-cache',
      }
    });

    const html = await response.text();

    const match = html.match(/<script[^>]*id="__NEXT_DATA__"[^>]*>(.+?)<\/script>/s);
    if (!match) return res.status(422).json({ error: 'Estrutura não encontrada' });

    const nextData = JSON.parse(match[1]);
    const pageProps = nextData?.props?.pageProps;
    const ad = pageProps?.advert || pageProps?.ad;

    if (!ad) return res.status(422).json({ error: 'Anúncio não encontrado' });

    const dict = ad.parametersDict || {};
    const getParam = (key: string) => dict[key]?.values?.[0]?.label || dict[key]?.values?.[0]?.value || '';

    const images = (ad.images?.photos || [])
      .map((img: any) => img?.url)
      .filter((u: any) => u && !u.includes(';s='));

    const cleanDescription = (ad.description || '')
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    return res.status(200).json({
      brand: getParam('make'),
      model: getParam('model'),
      year: parseInt(getParam('first_registration_year')) || null,
      price: parseFloat(ad.price?.value) || null,
      mileage: parseInt(getParam('mileage')?.replace(/\s/g, '')) || null,
      fuel_type: getParam('fuel_type'),
      transmission: getParam('gearbox'),
      power: parseInt(getParam('engine_power')) || null,
      description: cleanDescription,
      main_image: images[0] || '',
      gallery_images: images,
    });

  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}