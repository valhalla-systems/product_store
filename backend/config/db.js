// ✅ ARQUIVO: backend/config/db.js
//----------------------------------------------------------
// Descrição: Configuração da conexão com o banco de dados MongoDB
//----------------------------------------------------------

import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB conectado: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Erro: ${error.message}`);
    process.exit(1); // 1 = falha, 0 = sucesso
  }
};

//----------------------------------------------------------
// Fim do arquivo backend/config/db.js
//----------------------------------------------------------