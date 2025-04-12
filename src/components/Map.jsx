import { useEffect, useRef } from 'react';

export default function Map({ location }) {
  const iframeRef = useRef(null);
  const loadingIndicatorRef = useRef(null);
  const encodedLocation = encodeURIComponent(location);

  // Coordenadas para Cascavel, Paraná
  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=-53.5451,-25.0359,-53.3657,-24.8963&layer=mapnik&marker=-24.9577,-53.4590`;

  // URL para o Google Maps
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedLocation}`;

  useEffect(() => {
    const iframe = iframeRef.current;
    const loadingIndicator = loadingIndicatorRef.current;

    if (iframe) {
      iframe.addEventListener('load', () => {
        // Iframe carregado, mostre-o
        iframe.classList.remove('opacity-0');
        iframe.classList.add('opacity-100');

        // Oculte o indicador de carregamento
        if (loadingIndicator) {
          loadingIndicator.classList.add('hidden');
        }
      });
    }

    return () => {
      if (iframe) {
        iframe.removeEventListener('load', () => {});
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden shadow-lg bg-[var(--surface)]">
      {/* Iframe do OpenStreetMap */}
      <iframe
        ref={iframeRef}
        src={mapSrc}
        className="w-full h-full border-0 transition-opacity duration-500 opacity-0"
        loading="lazy"
        title={`Mapa de ${location}`}
        allowFullScreen
      ></iframe>

      {/* Estado de carregamento */}
      <div ref={loadingIndicatorRef} className="absolute inset-0 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <svg
            className="h-12 w-12 text-[var(--primary)] mb-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            ></path>
          </svg>
          <div className="h-4 w-32 bg-[var(--secondary)] rounded"></div>
        </div>
      </div>

      {/* Overlay com informações de localização */}
      <div className="absolute bottom-0 left-0 right-0 bg-[var(--background)]/80 backdrop-blur-sm p-4">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-[var(--text)] mb-1">Localização</h3>
          <p className="text-[var(--text-muted)]">{location}</p>
          <p className="mt-2 text-[var(--primary)]">Disponível para trabalhos remotos globais</p>
          <div className="mt-2">
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-4 py-2 bg-[var(--primary)] text-[var(--background)] text-sm rounded-md hover:bg-[var(--accent)] transition-colors"
            >
              Ver no Google Maps
              <svg
                className="w-3 h-3"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6m4-3h6v6m-11 5L21 3"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
