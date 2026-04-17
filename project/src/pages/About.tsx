import { Award, Users, Heart } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-[#0B0B0B] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Sobre Nós
          </h1>
          <p className="text-[#B8B8B8] text-lg">
            Conheça a história e os valores da MOTORODRI
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
            <img
              src="https://hbgpvkvsiiwpnkkqmofi.supabase.co/storage/v1/object/public/motorcycles/mota%20motorodri.png"
              alt="MOTORODRI Showroom"
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h2 className="text-3xl font-bold text-white mb-6">
              A Nossa História
            </h2>
            <p className="text-[#B8B8B8] text-lg leading-relaxed mb-4">
              Fundada com a missão de oferecer aos entusiastas automóveis uma experiência única
              na aquisição de Motos premium, a MOTORODRI estabeleceu-se como referência no
              mercado de Motos de alta gama em Portugal.
            </p>
            <p className="text-[#B8B8B8] text-lg leading-relaxed mb-4">
              Especializamo-nos na seleção criteriosa de Motos desportivas, clássicas e
              premium, garantindo que cada moto no nosso stock passa por uma rigorosa
              inspeção de qualidade e autenticidade.
            </p>
            <p className="text-[#B8B8B8] text-lg leading-relaxed">
              A nossa paixão pelo mundo motos reflete-se em cada detalhe do nosso serviço,
              desde a apresentação dos veículos até ao acompanhamento personalizado de cada cliente.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-8 text-center hover:border-[#FF6B35] transition-colors">
            <div className="w-16 h-16 bg-[#FF6B35]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Award size={32} className="text-[#FF6B35]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Experiência</h3>
            <p className="text-[#B8B8B8] leading-relaxed">
              Anos de experiência no setor motos, com conhecimento profundo do mercado
              de veículos premium e clássicos.
            </p>
          </div>

          <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-8 text-center hover:border-[#FF6B35] transition-colors">
            <div className="w-16 h-16 bg-[#FF6B35]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users size={32} className="text-[#FF6B35]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Atendimento Personalizado</h3>
            <p className="text-[#B8B8B8] leading-relaxed">
              Cada cliente é único. Oferecemos um serviço personalizado e dedicado para
              encontrar o veículo perfeito para si.
            </p>
          </div>

          <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-8 text-center hover:border-[#FF6B35] transition-colors">
            <div className="w-16 h-16 bg-[#FF6B35]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart size={32} className="text-[#FF6B35]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Paixão Automóvel</h3>
            <p className="text-[#B8B8B8] leading-relaxed">
              A paixão por automóveis está no centro de tudo o que fazemos. Cada veículo
              é escolhido com amor e cuidado.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-[#1A1A1A] rounded-lg p-8 md:p-12">
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">
              O Nosso Compromisso
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-[#FF6B35] rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-[#B8B8B8] leading-relaxed">
                  <strong className="text-white">Qualidade Garantida:</strong> Todos os nossos
                  veículos passam por uma inspeção rigorosa antes de serem apresentados.
                </p>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-[#FF6B35] rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-[#B8B8B8] leading-relaxed">
                  <strong className="text-white">Transparência Total:</strong> Fornecemos toda a
                  informação e histórico completo de cada motos.
                </p>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-[#FF6B35] rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-[#B8B8B8] leading-relaxed">
                  <strong className="text-white">Acompanhamento Personalizado:</strong> Desde a
                  primeira visita até à entrega do veículo, estamos sempre disponíveis.
                </p>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-[#FF6B35] rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-[#B8B8B8] leading-relaxed">
                  <strong className="text-white">Pós-Venda Dedicado:</strong> O nosso compromisso
                  não termina com a venda. Estamos aqui para apoiar sempre que precisar.
                </p>
              </li>
            </ul>
          </div>

          <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
            <img
              src="https://hbgpvkvsiiwpnkkqmofi.supabase.co/storage/v1/object/public/motorcycles/pexels-omkar-dhamdhere-3030546-13149299.jpg"
              alt="Compromisso MOTORODRI"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
