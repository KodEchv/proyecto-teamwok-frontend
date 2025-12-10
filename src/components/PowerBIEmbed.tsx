import { useEffect, useRef, useState } from 'react';

interface PowerBIEmbedProps {
  url: string;
  title?: string;
  height?: string;
}

export const PowerBIEmbed: React.FC<PowerBIEmbedProps> = ({
  url,
  title = 'Power BI Report',
  height = '800px'
}) => {
  const [error, setError] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handleLoad = () => {
      setError(false);
    };

    const handleError = () => {
      setError(true);
    };

    const iframe = iframeRef.current;
    if (iframe) {
      iframe.addEventListener('load', handleLoad);
      iframe.addEventListener('error', handleError);

      return () => {
        iframe.removeEventListener('load', handleLoad);
        iframe.removeEventListener('error', handleError);
      };
    }
  }, []);

  if (error) {
    return (
      <div
        className="alert alert-warning"
        role="alert"
        style={{
          height: height,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '8px'
        }}
      >
        <div className="text-center">
          <h5>⚠️ No se pudo cargar Power BI</h5>
          <p className="mb-2">
            Si el navegador está bloqueando el contenido, abre directamente:
          </p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm"
          >
            🔗 Abrir en Nueva Pestaña
          </a>
        </div>
      </div>
    );
  }

  return (
    <iframe
      ref={iframeRef}
      src={url}
      title={title}
      style={{
        width: '100%',
        height: height,
        border: 'none',
        borderRadius: '8px',
        display: 'block'
      }}
      allow="fullscreen"
      sandbox="allow-same-origin allow-forms allow-scripts allow-popups allow-popups-to-escape-sandbox"
    />
  );
};
