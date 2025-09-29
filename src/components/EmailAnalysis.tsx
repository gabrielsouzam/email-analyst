import {
  BroomIcon,
  CopySimpleIcon,
  RocketLaunchIcon,
  SparkleIcon,
} from "@phosphor-icons/react";
import { toast } from "sonner";

interface EmailAnalysisProps {
  emailAnalysis: EmailAnalysisResponse;
}

export function EmailAnalysis({ emailAnalysis }: EmailAnalysisProps) {
  const isProductive = emailAnalysis.category === "productive";

   async function handleCopy() {
    try {
      await navigator.clipboard.writeText(emailAnalysis.response);
      toast.success('Copiado para a área de transferência!');
    } catch (err) {
      console.error("Erro ao copiar: ", err);
      toast.error('Erro ao copiar');
    }
  };

  return (
    <div
      className="mt-8 flex w-full items-center flex-col max-w-4xl bg-zinc-50 border-2 border-zinc-200 py-6 px-2
      opacity-0 scale-95 animate-fade-in rounded"
    >
      <h2 className="text-2xl font-semibold text-blue-950 mb-3">
        Resultado da análise
      </h2>

      <div className="flex items-center justify-center gap-8 bg-zinc-50 border-2 border-zinc-200 rounded px-4 py-4 w-1/2 text-lg">
        <span className="font-light text-zinc-700 text-lg">CLASSIFICAÇÃO</span>
        <div
          data-productive={isProductive}
          className="
            flex items-center gap-2 p-3 rounded text-zinc-100 
            data-[productive=true]:bg-blue-600 
            data-[productive=false]:bg-zinc-600
          "
        >
          {isProductive ? (
            <>
              <RocketLaunchIcon size={24} weight="bold" />
              <span className="font-medium text-lg">Produtivo</span>
            </>
          ) : (
            <>
              <BroomIcon size={24} weight="bold" />
              <span className="font-medium text-lg">Improdutivo</span>
            </>
          )}
        </div>
      </div>

      <div className="bg-emerald-100 max-w-3xl w-full p-10 mt-10 border-2 border-emerald-200 rounded-2xl">
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-2 items-center">
            <SparkleIcon className="text-amber-400" weight="fill" size={24} />
            <span className="text-lg">Resposta Sugerida</span>
          </div>

          <button 
            onClick={handleCopy}
            className="flex items-center gap-1 px-3 py-2 bg-white rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <CopySimpleIcon />
            <span className="text-sm">Copiar</span>
          </button>
        </div>

        <div className="bg-white/70 p-4 rounded-lg">
          <p className="text-gray-700 whitespace-pre-wrap font-mono text-sm leading-relaxed">
            {emailAnalysis.response}
          </p>
        </div>
      </div>
    </div>
  );
}
