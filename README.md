# EduBot RAG

EduBot RAG es un proyecto integrador que implementa una API backend con un flujo completo de **RAG (Retrieval-Augmented Generation)**. La aplicación procesa e indexa documentos (PDF/TXT), genera vectores semánticos (embeddings) usando modelos de **Google Gemini** y recupera el contexto relevante desde una base de datos vectorial en **Supabase** (pgvector) para responder preguntas con un asistente virtual impulsado por inteligencia artificial.

## ✨ Características Principales

- **Ingesta de Documentos**: Subida de archivos (Multer + PDF Parse), extracción de texto y segmentación (chunking).
- **IA Generativa y Embeddings**: Integración nativa con la API de Google Gemini.
- **Base de Datos Vectorial**: Uso de Supabase y `pgvector` para realizar búsquedas por similitud semántica.
- **Historial de Chats**: Persistencia de las conversaciones configurable a través de archivos locales o base de datos remota con **MongoDB**.
- **Autenticación y Seguridad**: Rutas protegidas mediante JSON Web Tokens (JWT).
- **Documentación de la API**: Interfaz interactiva de Swagger disponible en la ruta `/docs`.
- **Despliegue Serverless**: Optimizado para funcionar sobre Vercel sirviendo la web estática y la API simultáneamente.

---

## 🛠 Requisitos Previos

Antes de ejecutar este proyecto, necesitas contar con lo siguiente:

- **Node.js** v18 o superior (el proyecto usa ES Modules nativos).
- Una cuenta en **MongoDB Atlas** (o una base de datos local) para el historial de chats.
- Un proyecto en **Supabase** configurado con pgvector (y credenciales correspondientes).
- Una **API Key de Google Gemini** generada desde Google AI Studio.

---

## 🚀 Instalación y Configuración Local

1. **Clonar el repositorio e ingresar a la carpeta del proyecto:**
   ```bash
   git clone <url-del-repositorio>
   cd edubot-rag
   ```

2. **Instalar las dependencias:**
   ```bash
   npm install
   ```

3. **Configurar las variables de entorno:**
   Crea un archivo llamado `.env` en la raíz del proyecto. Puedes tomar como base el siguiente formato:

   ```env
   # API Keys y Seguridad
   GOOGLE_API_KEY=tu_api_key_de_gemini
   JWT_TOKEN_SECRET=tu_secreto_para_jwt

   # Modelos de Inteligencia Artificial (Ejemplos)
   MODEL_LLM=gemini-1.5-pro
   MODEL_EMBEDDING=text-embedding-004
   MODEL_EMBEDDING_DIM=768

   # Configuración de almacenamiento de Chats (opciones: "mongo" o "file")
   CHAT_STORAGE=mongo
   MONGO_URI=mongodb+srv://usuario:password@cluster.mongodb.net/edubot
   MONGODB_COLLECTION=chat_history

   # Configuración de Archivos y Base Vectorial (Supabase)
   ACCEPTED_FILE_TYPES=application/pdf,text/plain
   SUPABASE_URL=https://tu_proyecto.supabase.co
   SUPABASE_SERVICE_KEY=tu_service_key_de_supabase
   SUPABASE_BUCKET_NAME=nombre_del_bucket
   ```

4. **Regenerar la documentación (Opcional):**
   Si agregaste o modificaste algún endpoint, regenera el archivo `swagger-output.json` ejecutando:
   ```bash
   npm run swagger
   ```

---

## 💻 Ejecución en Desarrollo Local

Para levantar el servidor localmente, el proyecto cuenta con un script que carga automáticamente las variables desde `.env` usando banderas nativas de Node:

```bash
npm run dev
```

Una vez que el servidor esté en marcha, podrás:
- **Ver la Landing Page**: Accediendo a la ruta raíz desde tu navegador (`http://localhost:<PUERTO>/`).
- **Explorar la API y hacer peticiones**: Entrando a la ruta `http://localhost:<PUERTO>/docs` para visualizar el panel de Swagger UI.

---

## ☁️ Despliegue en Vercel

La arquitectura del proyecto está pensada para ser completamente compatible con plataformas sin servidor (Serverless) como Vercel.

### Pasos y advertencias de Despliegue:
1. Asegúrate de configurar la variable de entorno `CHAT_STORAGE` siempre con el valor `mongo` en el panel de control de Vercel. Al desplegar una función Serverless, los archivos locales son de solo lectura y el uso de `CHAT_STORAGE=file` fallará en producción.
2. Añade todas las demás variables de entorno desde la interfaz de Vercel antes del despliegue.
3. El archivo `vercel.json` ya se encarga automáticamente de enrutar los assets estáticos a la CDN nativa y las peticiones a la API directamente al controlador de Express de forma eficiente.
