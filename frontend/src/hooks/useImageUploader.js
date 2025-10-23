// ✅ HOOK: frontend/src/hooks/useImageUploader.js
// ----------------------------------------------------------
// Hook customizado para upload, preview e compressão de imagens.
// - Faz compressão leve usando browser-image-compression
// - Retorna estados de preview, loading e compressão
// - Faz cleanup automático de URLs temporárias
// ----------------------------------------------------------

import { useState, useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import imageCompression from "browser-image-compression";

export const useImageUploader = (compressionOptions = {}) => {
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);

  const toast = useToast();

  // ♻️ Cleanup para liberar URLs temporárias
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  // 📸 Lida com seleção e compressão da imagem
  const handleImageChange = async (e) => {
    const inputFile = e.target.files[0];
    if (!inputFile) {
      setPreview(null);
      setFile(null);
      return;
    }

    try {
      setIsImageLoading(true);
      setIsCompressing(true);

      // Preview instantâneo
      const tempUrl = URL.createObjectURL(inputFile);
      setPreview(tempUrl);
      setFile(inputFile);

      // Espera o próximo frame para renderizar
      await new Promise((resolve) => requestAnimationFrame(resolve));

      // Compressão
      const compressedFile = await imageCompression(inputFile, {
        maxSizeMB: 1,
        maxWidthOrHeight: 1280,
        useWebWorker: true,
        ...compressionOptions,
      });

      const compressedUrl = URL.createObjectURL(compressedFile);
      setPreview(compressedUrl);
      setFile(compressedFile);

      setIsImageLoading(false);
      setIsCompressing(false);
    } catch (error) {
      console.error("Erro ao comprimir imagem:", error);
      toast({
        title: "Erro ao processar imagem",
        description: "Tente novamente com uma imagem válida.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setIsImageLoading(false);
      setIsCompressing(false);
    }
  };

  return {
    preview,
    setPreview,
    file,
    setFile,
    isImageLoading,
    isCompressing,
    handleImageChange,
  };
};
