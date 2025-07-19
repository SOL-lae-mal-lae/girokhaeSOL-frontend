echo "🚀 프론트엔드 배포 시작..."

pnpm install

pnpm build

pm2 stop girokhaeSOL-frontend
pm2 delete girokhaeSOL-frontend

pm2 start pnpm --name "girokhaeSOL-frontend" -- run start

echo "배포된 프로세스 상태:"
pm2 list

echo "✅ 프론트엔드 배포 완료!"