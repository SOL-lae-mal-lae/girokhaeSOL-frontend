# Stage 1: Build the Next.js application
# Node.js 22 Alpine 이미지를 사용하여 빌드 환경을 설정합니다.
# Alpine 이미지는 더 작고 가볍습니다.
# 이 Dockerfile은 EC2 Ubuntu 24.04 AMI와 같은 Linux 기반 환경에서 실행되도록 설계되었습니다.
FROM node:22-alpine AS builder

# 컨테이너 내의 작업 디렉토리를 /app으로 설정합니다.
WORKDIR /app

# pnpm 설치
# Next.js 애플리케이션 빌드 및 실행을 위해 pnpm을 전역으로 설치합니다.
RUN npm install -g pnpm

# package.json 및 pnpm-lock.yaml 파일을 복사합니다.
# 이는 의존성 설치 시 캐시를 활용하여 빌드 속도를 높이는 데 도움이 됩니다.
COPY package.json pnpm-lock.yaml* ./

# 프로젝트 의존성을 설치합니다.
# --frozen-lockfile은 lock 파일에 지정된 정확한 버전을 사용하도록 강제하여 빌드의 일관성을 보장합니다.
RUN pnpm install --frozen-lockfile

# 나머지 모든 프로젝트 파일을 작업 디렉토리로 복사합니다.
COPY . .

# Next.js 애플리케이션을 빌드합니다.
# 이 단계에서 .next 폴더에 최적화된 프로덕션 빌드 결과물이 생성됩니다.
RUN pnpm run build

# Stage 2: Run the Next.js application in production
# 다시 Node.js 22 Alpine 이미지를 사용하여 최종 런타임 환경을 설정합니다.
# 이 스테이지는 빌드 스테이지에서 생성된 아티팩트만 포함하여 최종 이미지 크기를 최소화합니다.
FROM node:22-alpine AS runner

# 컨테이너 내의 작업 디렉토리를 /app으로 설정합니다.
WORKDIR /app

# 환경 변수를 설정합니다.
# NODE_ENV를 production으로 설정하여 Next.js가 프로덕션 모드로 실행되도록 합니다.
ENV NODE_ENV production

# pnpm 설치 (런타임 환경에서도 pnpm이 필요할 수 있으므로 설치합니다.)
RUN npm install -g pnpm

# 빌드 스테이지에서 생성된 필요한 파일과 폴더를 최종 이미지로 복사합니다.
# public 폴더: 정적 파일 (이미지, 폰트 등)
COPY --from=builder /app/public ./public
# .next 폴더: Next.js 빌드 결과물 (페이지, 번들 등)
COPY --from=builder /app/.next ./.next
# node_modules 폴더: 애플리케이션 실행에 필요한 의존성
COPY --from=builder /app/node_modules ./node_modules
# package.json: pnpm start 명령을 실행하기 위해 필요합니다.
COPY --from=builder /app/package.json ./package.json

COPY --from=builder /app/.env.production ./.env.production

COPY --from=builder /app/src/middleware.ts ./src/middleware.ts

# Next.js 애플리케이션이 기본적으로 사용하는 포트 3000을 외부에 노출합니다.
EXPOSE 3000

# 컨테이너가 시작될 때 실행될 명령을 정의합니다.
# pnpm start는 package.json에 정의된 "start" 스크립트를 실행합니다.
CMD ["pnpm", "start"]