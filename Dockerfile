FROM node:18

WORKDIR /usr/src/app

COPY . .

RUN npm install


RUN mkdir -p /usr/src/app/uploads

RUN npx prisma generate

RUN npm run build

EXPOSE 3000

ENV DATABASE_URL="postgresql://postgres_user:postgres_password@postgres:5432/embedded_db?schema=public"
ENV OPENAI_API_KEY=${OPENAI_API_KEY}
ENV GOOGLE_APPLICATION_CREDENTIALS="/usr/src/app/image-captioning.json"
ENV GOOGLE_PROJECT_ID=${GOOGLE_PROJECT_ID}
ENV GOOGLE_LOCATION=${GOOGLE_LOCATION}

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/index.js"]
