import { FileInput } from "./FileInput";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SpinnerIcon } from "@phosphor-icons/react";
import { toast } from "sonner";
import {
  analyzeEmailContent,
  analyzeEmailFile,
} from "../services/EmailService";

interface UploadEmailForm {
  handleSetEmailAnalysis: (emailAnalysis: EmailAnalysisResponse | null) => void;
}

export function UploadEmailForm({ handleSetEmailAnalysis }: UploadEmailForm) {
  const uploadEmailSchema = z
    .object({
      emailContent: z.string().optional(),
      file: z.instanceof(File).optional(),
    })
    .refine(
      (data) => {
        const hasContent =
          data.emailContent && data.emailContent.trim().length > 0;
        const hasFile = data.file instanceof File;
        return hasContent || hasFile;
      },
      {
        message: "Por favor, envie um arquivo ou digite o conteúdo do e-mail",
        path: ["emailContent"],
      }
    )
    .refine(
      (data) => {
        const hasContent =
          data.emailContent && data.emailContent.trim().length > 0;
        const hasFile = data.file instanceof File;
        return hasContent || hasFile;
      },
      {
        message: "Por favor, envie um arquivo ou digite o conteúdo do e-mail",
        path: ["file"],
      }
    )
    .refine(
      (data) => {
        const hasFile = data.file instanceof File;

        if (hasFile) return true;

        if (data.emailContent) {
          return data.emailContent.trim().length >= 10;
        }

        return true;
      },
      {
        message: "E-mail deve ter no mínino 10 caracteres.",
        path: ["emailContent"],
      }
    );

  type UploadEmailType = z.infer<typeof uploadEmailSchema>;

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<UploadEmailType>({
    resolver: zodResolver(uploadEmailSchema),
  });

  const selectedFile = watch("file");
  const typedText = watch("emailContent");

  async function handleSendEmailContent(formData: UploadEmailType) {
    try {
      if (formData.file) {
        const response = await analyzeEmailFile(formData.file);

        if (response.data) {
          handleSetEmailAnalysis(response.data);

          toast.success("Análise do e-mail efetuada com sucesso!");
        } else if (response.type === "error") {
          handleSetEmailAnalysis(null);
          toast.error("Erro ao analisar arquivo!");
        }
      } else if (formData.emailContent && formData.emailContent.trim()) {
        const response = await analyzeEmailContent(formData.emailContent);

        if (response.data) {
          handleSetEmailAnalysis(response.data);

          toast.success("Análise do e-mail efetuada com sucesso!");
        } else if (response.type === "error") {
          handleSetEmailAnalysis(null);
          toast.error("Erro ao analisar texto!");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Erro ao analisar e-mail!");
    } finally {
      reset();
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleSendEmailContent)}
      className="flex flex-col items-center"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-4xl">
        <div className="bg-white p-6 rounded flex flex-col gap-4 items-center justify-center border-2 border-zinc-200">
          <h3 className="text-blue-900 text-xl font-medium">
            Upload de arquivo
          </h3>
          <Controller
            name="file"
            control={control}
            render={({ field: { onChange, value, ...field } }) => (
              <FileInput
                {...field}
                selectedFile={value}
                onFileSelect={(file) => {
                  if (file) {
                    setValue("emailContent", "");
                  }
                  onChange(file);
                }}
                maxSize={5}
                disabled={!!typedText}
              />
            )}
          />
        </div>

        <div className=" bg-white p-6 rounded flex flex-col gap-4 border-2 border-zinc-200">
          <h3 className="text-blue-900 text-xl font-medium">
            Ou cole o texto do e-mail aqui
          </h3>

          <textarea
            className="
              bg-zinc-50 p-4 text-sm border border-gray-200 rounded-lg resize-none 
              focus:outline-none focus:ring-2 focus:ring-emerald-500
              disabled:cursor-not-allowed disabled:bg-zinc-200/85
            "
            rows={8}
            placeholder="Cole o conteúdo do seu e-mail aqui..."
            {...register("emailContent")}
            disabled={!!selectedFile}
          />

          {errors.emailContent &&
            !errors.file &&
            typedText &&
            typedText.trim().length > 0 && (
              <div className="w-full p-3 bg-red-50 border border-red-200 rounded-lg mt-4">
                <p className="text-red-600 text-sm text-center">
                  {errors.emailContent.message}
                </p>
              </div>
            )}
        </div>
      </div>

      {errors.file &&
        errors.emailContent &&
        errors.file.message === errors.emailContent.message && (
          <div className="w-full p-3 bg-red-50 border border-red-200 rounded-lg mt-4">
            <p className="text-red-600 text-sm text-center">
              {errors.file.message}
            </p>
          </div>
        )}

      <button
        className="bg-emerald-700 px-16 py-3 rounded-xl text-white cursor-pointer disabled:cursor-not-allowed disabled:bg-emerald-700/90 hover:bg-emerald-800 mt-8"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <div className="flex gap-2 items-center">
            <SpinnerIcon className="animate-spin" size={16} />
            <span>Carregando...</span>
          </div>
        ) : (
          <span>Classificar e-mail</span>
        )}
      </button>
    </form>
  );
}
