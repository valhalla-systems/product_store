// ✅ ARQUIVO: backend/middlewares/upload.middleware.js
//----------------------------------------------------------
// Descrição: Middleware para upload de imagens usando Multer e Cloudinary
//----------------------------------------------------------

import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

// 🧩 Configuração de armazenamento no Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "products", // pasta padrão no painel Cloudinary
    upload_preset: "Valhalla", // preset configurado manualmente no Cloudinary
    allowed_formats: ["jpg", "jpeg", "png", "webp"], // tipos aceitos
    transformation: [{ width: 800, height: 800, crop: "limit" }], // redimensionamento opcional
  },
});

// 🧱 Criação do middleware multer
const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // limite de 50 MB por imagem
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      cb(new Error("Apenas arquivos de imagem são permitidos!"), false);
    } else {
      cb(null, true);
    }
  },
});

// 🚀 Exporta o middleware
export default upload;

/*
📘 NOTAS:
1. O preset “Valhalla” (modo signed) já define:
   • overwrite: true
   • use_filename: true
   • unique_filename: true
   • display_name baseado no nome do arquivo
   Assim, não precisamos repetir essas chaves aqui.

2. Exemplo de uso em rota:
   router.post("/upload", upload.single("image"), (req, res) => {
     res.json({ url: req.file.path });
   });

3. Quando usado em createProduct, o campo enviado no FormData
   deve ser `image` (mesmo nome passado ao upload.single()).
*/
