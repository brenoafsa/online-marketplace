FROM oven/bun:latest

WORKDIR /app

COPY . .

RUN bun install

EXPOSE 3000

CMD ["bun", "dev", "--host", "0.0.0.0"]