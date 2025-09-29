import { useState, useRef, type DragEvent, type ChangeEvent } from "react";
import { FileArrowUpIcon, FileTextIcon } from "@phosphor-icons/react";
import { formatFileSizeUtil } from "../utils/format-file-size-util";

interface FileInputProps {
  selectedFile: File | undefined
  onFileSelect?: (file: File | undefined) => void;
  maxSize?: number;
  disabled: boolean;
}

export function FileInput({ selectedFile, onFileSelect, maxSize, disabled }: FileInputProps) {
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null): void => {
    if (!files || files.length === 0) return;

    const file = files[0];
    setError("");

    if (file.type !== "text/plain" && file.type !== "application/pdf") {
      setError("Por favor, selecione apenas arquivos .txt ou .pdf");
      return;
    }

    const fileSizeInMB = file.size / (1024 * 1024);
    if (typeof maxSize === "number" && fileSizeInMB > maxSize) {
      setError(`Arquivo muito grande. Tamanho máximo: ${maxSize}MB`);
      return;
    }

    onFileSelect?.(file);
  };

  function handleDrag(e: DragEvent<HTMLDivElement>): void {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }

  function handleDrop(e: DragEvent<HTMLDivElement>): void {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>): void {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  }

  function openFileExplorer(): void {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }

  function removeFile(): void {
    setError("");
    onFileSelect?.(undefined);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        className="hidden "
        accept=".txt,.pdf"
        onChange={handleFileChange}
        disabled={disabled}
      />
      <div
        data-active={dragActive}
        data-disabled={disabled}
        className="
          w-full border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer
          border-emerald-300 data-[disabled=false]:hover:border-emerald-500 hover:bg-emerald-50
          data-[active=true]:border-emerald-500 data-[active=true]:bg-emerald-50
          data-[disabled=true]:cursor-not-allowed data-[disabled=true]:bg-zinc-100/95
        "
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={openFileExplorer}
      >
        {selectedFile ? (
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-2 text-emerald-700">
              <FileTextIcon size={32} />
              <span className="font-medium w-3xs max-w-[260px] truncate inline-block">
                {selectedFile.name}
              </span>
            </div>
            <div className="text-sm text-gray-500">
              {formatFileSizeUtil(selectedFile.size)}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeFile();
              }}
              type="button"
              className="text-red-500 hover:text-red-700 text-sm underline cursor-pointer"
            >
              Remover arquivo
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <FileArrowUpIcon className="text-emerald-700" size={40} />
            <div className="text-emerald-700">
              <p className="font-medium">
                Clique para selecionar ou arraste o arquivo aqui
              </p>
              <p className="text-sm text-gray-500 ">
                Apenas arquivos .txt ou .pdf
              </p>
            </div>
          </div>
        )}
      </div>

      {error &&  (
        <div className="w-full p-3 bg-red-50 border border-red-200 rounded-lg mt-3">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}
    </div>
  );
}
