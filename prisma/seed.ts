const { PrismaClient, BookCategory } = require("@prisma/client");

const prisma = new PrismaClient();

async function seedDatabase() {
  try {
    // Links de imagens para os livros
    const images = [
      "14-habitos-de-desenvolvedores-altamente-produtivos.png",
      "a-revolucao-dos-bixos.png",
      "arquitetura-limpa.png",
      "codigo-limpo.png",
      "domain-driven-design.png",
      "entendendo-algoritmos.png",
      "fragmentos-do-horror.png",
      "historias-extraordinarias.png",
      "o-fim-da-eternidade.png",
      "o-guia-do-mochileiro-das-galaxias.png",
      "o-hobbit.png",
      "o-poder-do-habito.png",
      "o-programador-pragmatico.png",
      "refatoracao.png",
      "viagem-ao-centro-da-terra.png",
    ];

    // Dados de usuários
    const users = [
      { name: "João Silva", email: "joao.silva@email.com" },
      { name: "Maria Oliveira", email: "maria.oliveira@email.com" },
      { name: "Pedro Santos", email: "pedro.santos@email.com" },
    ];

    // Inserir usuários no banco
    const createdUsers = [];
    for (const userData of users) {
      const user = await prisma.user.create({
        data: userData,
      });
      createdUsers.push(user);
    }

    // Dados dos livros
    const books = [
      {
        name: "14-habitos-de-desenvolvedores-altamente-produtivos",
        summary:
          "Livro sobre como aumentar a produtividade como desenvolvedor.",
        author: "Autor Desconhecido",
        category: [BookCategory.EDUCATION],
        total_pages: 250,
        cover_image: images[0],
      },
      {
        name: "a-revolucao-dos-bixos",
        summary: "Uma ficção sobre a revolução dos animais na fazenda.",
        author: "George Orwell",
        category: [BookCategory.FANTASY],
        total_pages: 200,
        cover_image: images[1],
      },
      {
        name: "arquitetura-limpa",
        summary: "Livro sobre boas práticas na arquitetura de software.",
        author: "Robert C. Martin",
        category: [BookCategory.COMPUTATION],
        total_pages: 300,
        cover_image: images[2],
      },
      {
        name: "codigo-limpo",
        summary: "Como escrever código limpo e de fácil manutenção.",
        author: "Robert C. Martin",
        category: [BookCategory.COMPUTATION],
        total_pages: 400,
        cover_image: images[3],
      },
      {
        name: "domain-driven-design",
        summary: "Abordagem para modelar software com base no domínio.",
        author: "Eric Evans",
        category: [BookCategory.COMPUTATION],
        total_pages: 500,
        cover_image: images[4],
      },
      {
        name: "entendendo-algoritmos",
        summary: "Um livro acessível sobre algoritmos e estruturas de dados.",
        author: "Aditya Bhargava",
        category: [BookCategory.EDUCATION],
        total_pages: 350,
        cover_image: images[5],
      },
      {
        name: "fragmentos-do-horror",
        summary: "Uma coleção de histórias de terror.",
        author: "H.P. Lovecraft",
        category: [BookCategory.HORROR],
        total_pages: 180,
        cover_image: images[6],
      },
      {
        name: "historias-extraordinarias",
        summary: "Coleção de contos extraordinários.",
        author: "Edgar Allan Poe",
        category: [BookCategory.HORROR],
        total_pages: 220,
        cover_image: images[7],
      },
      {
        name: "o-fim-da-eternidade",
        summary: "Uma ficção científica sobre o controle do tempo.",
        author: "Isaac Asimov",
        category: [BookCategory.SCIENTIFIC_FICTION],
        total_pages: 350,
        cover_image: images[8],
      },
      {
        name: "o-guia-do-mochileiro-das-galaxias",
        summary: "Uma série de ficção científica engraçada e surreal.",
        author: "Douglas Adams",
        category: [BookCategory.FANTASY],
        total_pages: 250,
        cover_image: images[9],
      },
      {
        name: "o-hobbit",
        summary: "A famosa história de Bilbo Baggins e sua jornada.",
        author: "J.R.R. Tolkien",
        category: [BookCategory.FANTASY],
        total_pages: 300,
        cover_image: images[10],
      },
      {
        name: "o-poder-do-habito",
        summary: "Como os hábitos moldam nossas vidas e como mudar.",
        author: "Charles Duhigg",
        category: [BookCategory.EDUCATION],
        total_pages: 400,
        cover_image: images[11],
      },
      {
        name: "o-programador-pragmatico",
        summary: "Conselhos práticos para programadores de software.",
        author: "Andrew Hunt & David Thomas",
        category: [BookCategory.COMPUTATION],
        total_pages: 320,
        cover_image: images[12],
      },
      {
        name: "refatoracao",
        summary: "Melhorando o design de código existente.",
        author: "Martin Fowler",
        category: [BookCategory.COMPUTATION],
        total_pages: 450,
        cover_image: images[13],
      },
      {
        name: "viagem-ao-centro-da-terra",
        summary: "Aventura científica no centro da Terra.",
        author: "Jules Verne",
        category: [BookCategory.FANTASY],
        total_pages: 350,
        cover_image: images[14],
      },
    ];

    // Inserir livros no banco
    const createdBooks = [];
    for (const bookData of books) {
      const book = await prisma.book.create({
        data: bookData,
      });
      createdBooks.push(book);
    }

    // Criando ratings para os livros
    const ratings = [
      {
        user_id: createdUsers[0].id,
        book_id: createdBooks[0].id,
        rating: 4.5,
        comment: "Muito bom, aprendi bastante!",
      },
      {
        user_id: createdUsers[1].id,
        book_id: createdBooks[1].id,
        rating: 5,
        comment: "Excelente leitura, muito recomendada!",
      },
      {
        user_id: createdUsers[2].id,
        book_id: createdBooks[2].id,
        rating: 3.5,
        comment: "Boa leitura, mas um pouco técnica.",
      },
    ];

    // Inserir ratings no banco
    for (const ratingData of ratings) {
      await prisma.rating.create({
        data: ratingData,
      });
    }

    console.log("Seed executado com sucesso!");
  } catch (error) {
    console.error("Erro ao criar dados no banco:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedDatabase();
