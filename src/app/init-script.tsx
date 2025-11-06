// Script de inicialização seguro que garante que a página sempre carregue
export function InitScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            'use strict';
            
            // Garantir que a página sempre renderize, mesmo com erros
            try {
              // Verificar se React está carregando
              var checkReact = setInterval(function() {
                if (document.body && document.body.children.length > 0) {
                  clearInterval(checkReact);
                }
              }, 100);
              
              // Timeout de segurança - se nada renderizar em 10s, mostrar mensagem
              setTimeout(function() {
                if (document.body && document.body.children.length === 0) {
                  document.body.innerHTML = '<div style="padding: 20px; text-align: center; font-family: sans-serif;"><h1>Carregando...</h1><p>Se esta mensagem persistir, tente recarregar a página.</p></div>';
                }
              }, 10000);
              
              // Prevenir erros não tratados de quebrar a página
              window.addEventListener('error', function(e) {
                console.error('Unhandled error:', e.error);
                // Não impedir renderização por erros
                return true;
              });
              
              // Prevenir promises rejeitadas de quebrar
              window.addEventListener('unhandledrejection', function(e) {
                console.error('Unhandled promise rejection:', e.reason);
                e.preventDefault();
              });
              
            } catch(e) {
              console.error('Init script error:', e);
            }
          })();
        `,
      }}
    />
  )
}

