# Deploy — The Nerd Company

## 1. Instalar dependencias

```bash
npm install
```

## 2. Crear repositorio en GitHub

```bash
git init
git add .
git commit -m "init: the nerd company landing"
```

Ir a github.com → New repository → nombre: `tnc` (o el que quieras) → Create.

```bash
git remote add origin https://github.com/TU_USUARIO/tnc.git
git branch -M main
git push -u origin main
```

## 3. Conectar con Vercel

1. Ir a [vercel.com](https://vercel.com) → New Project
2. Importar el repo de GitHub
3. Framework: **Next.js** (lo detecta solo)
4. Click **Deploy**

## 4. Agregar Vercel KV (Upstash Redis)

1. En el dashboard del proyecto en Vercel → **Storage** tab
2. Click **Create Database** → **KV (Redis)**
3. Nombre: `tnc-waitlist` → Create
4. Click **Connect to Project**
5. Vercel agrega automáticamente `KV_REST_API_URL` y `KV_REST_API_TOKEN` como env vars

6. Re-deploy para que tomen efecto:
   ```
   Vercel dashboard → Deployments → Redeploy
   ```

## 5. Test local (opcional)

Después de conectar KV, bajar las env vars:

```bash
npx vercel env pull .env.local
npm run dev
```

Abrir http://localhost:3000

## Ver los emails guardados

En Vercel → Storage → tu KV database → Data Browser  
O con Redis CLI:
```
SMEMBERS tnc:waitlist
HGETALL tnc:waitlist:meta
```
