import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Usuários (senha simples por enquanto)
  const jose = await prisma.user.create({
    data: {
      name: 'Jose',
      email: 'jose@email.com',
      password: '123456',
    },
  });

  const david = await prisma.user.create({
    data: {
      name: 'David',
      email: 'david@email.com',
      password: '123456',
    },
  });

  // Projeto
  const project = await prisma.project.create({
    data: {
      name: 'Campanha Black Friday',
      userId: jose.id,
    },
  });

  // Parâmetros
  const utmSource = await prisma.parameter.create({
    data: {
      name: 'utm_source',
      value: 'facebook',
    },
  });

  const utmCampaign = await prisma.parameter.create({
    data: {
      name: 'utm_campaign',
      value: 'black_friday',
    },
  });

  // Link
  const link = await prisma.link.create({
    data: {
      name: 'Landing Page',
      baseUrl: 'https://example.com',
      projectId: project.id,
    },
  });

  // Relacionamento N:N
  await prisma.linkParameter.createMany({
    data: [
      { linkId: link.id, parameterId: utmSource.id },
      { linkId: link.id, parameterId: utmCampaign.id },
    ],
  });

  // Redirect opcional
  await prisma.redirect.create({
    data: {
      url: 'https://redirect.com',
      linkId: link.id,
    },
  });

  console.log('🌱 Seed executado com sucesso');
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });