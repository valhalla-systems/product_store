// ✅ NOVO ARQUIVO: backend/config/cloudinary.js
// --------------------------------------------------
// Este módulo configura e exporta a instância do Cloudinary,
// já pronta para uso nos controladores e middlewares de upload.
//
// O modo “signed” e as opções definidas no preset “Valhalla”
// estão refletidas aqui de forma simplificada, mantendo segurança
// e compatibilidade com multer-storage-cloudinary.
//
// --------------------------------------------------

import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config(); // garante leitura das variáveis de ambiente

// ⚙️ Configuração do Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Exporta a instância configurada
export default cloudinary;

/*
📘 NOTAS:
1. As variáveis CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY e CLOUDINARY_API_SECRET
   devem estar definidas no arquivo .env.

2. Exemplo de .env:
   CLOUDINARY_CLOUD_NAME=seu_nome_cloud
   CLOUDINARY_API_KEY=1234567890abcdef
   CLOUDINARY_API_SECRET=abcDEF1234567890abcdef

3. O “preset” Valhalla com Unique filename e Use filename: true
   já é aplicado no painel Cloudinary. Aqui não há necessidade
   de especificar novamente essas opções, pois elas são herdadas
   automaticamente na hora do upload.
*/
