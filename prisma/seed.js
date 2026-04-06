const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const movies = require("./data/movies.json");

async function main() {
  for (const movie of movies) {
    await prisma.movie.upsert({
      where: { title: movie.title },
      update: {
        description: movie.description,
        videoUrl: movie.videoUrl,
        thumbnailUrl: movie.thumbnailUrl,
        genre: movie.genre,
        duration: movie.duration,
      },
      create: {
        title: movie.title,
        description: movie.description,
        videoUrl: movie.videoUrl,
        thumbnailUrl: movie.thumbnailUrl,
        genre: movie.genre,
        duration: movie.duration,
      },
    });
  }

  console.log(`Seeded ${movies.length} movies.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });