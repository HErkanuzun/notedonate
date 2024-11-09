export const popularNotes = [
  {
    id: 1,
    title: "Calculus II - Integration Techniques",
    subject: "Mathematics",
    author: "Ayşe Yılmaz",
    date: "2024-03-15",
    likes: 156,
    downloads: 89,
    imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop",
    fileUrl: "https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf",
    content: "# Integration Techniques\n\n## 1. Substitution Method\n\nThe substitution method is used when...\n\n## 2. Integration by Parts\n\nThis technique is based on the formula..."
  },
  {
    id: 2,
    title: "Data Structures - Binary Trees",
    subject: "Computer Science",
    author: "Mehmet Demir",
    date: "2024-03-14",
    likes: 234,
    downloads: 167,
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop",
    fileUrl: "https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf",
    content: "# Binary Trees\n\n## Basic Concepts\n\nA binary tree is a tree data structure where each node has at most two children..."
  },
  {
    id: 3,
    title: "Organic Chemistry - Alkenes",
    subject: "Chemistry",
    author: "Zeynep Kaya",
    date: "2024-03-13",
    likes: 198,
    downloads: 145,
    imageUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop",
    fileUrl: "https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf",
    content: "# Alkenes\n\n## Structure and Bonding\n\nAlkenes are hydrocarbons containing a carbon-carbon double bond..."
  },
  {
    id: 4,
    title: "Linear Algebra Fundamentals",
    subject: "Mathematics",
    author: "Ali Yıldız",
    date: "2024-03-12",
    likes: 167,
    downloads: 123,
    imageUrl: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&auto=format&fit=crop",
    fileUrl: "https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf"
  },
  {
    id: 5,
    title: "Introduction to Quantum Mechanics",
    subject: "Physics",
    author: "Can Öztürk",
    date: "2024-03-11",
    likes: 289,
    downloads: 201,
    imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop",
    fileUrl: "https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf"
  },
  {
    id: 6,
    title: "Database Management Systems",
    subject: "Computer Science",
    author: "Deniz Şahin",
    date: "2024-03-10",
    likes: 178,
    downloads: 134,
    imageUrl: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&auto=format&fit=crop",
    fileUrl: "https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf"
  }
];

export const popularExams = [
  {
    id: 1,
    title: "Veri Yapıları Final Sınavı",
    subject: "Computer Science",
    professor: "Prof. Dr. Ahmet Yılmaz",
    term: "Bahar 2024",
    year: "2024",
    likes: 245,
    downloads: 189,
    questions: [
      {
        id: 1,
        text: "Bir binary search tree'de en küçük elemanı bulmak için hangi yön tercih edilmelidir?",
        options: ["Sağ", "Sol", "Root", "Yapraklar"],
        correctAnswer: 1
      },
      {
        id: 2,
        text: "Hangi veri yapısı LIFO prensibiyle çalışır?",
        options: ["Queue", "Stack", "Linked List", "Array"],
        correctAnswer: 1
      },
      {
        id: 3,
        text: "Big O notation'da O(1) ne ifade eder?",
        options: ["Lineer zaman", "Sabit zaman", "Logaritmik zaman", "Üstel zaman"],
        correctAnswer: 1
      }
    ]
  },
  {
    id: 2,
    title: "Lineer Cebir Vize Sınavı",
    subject: "Mathematics",
    professor: "Doç. Dr. Ayşe Demir",
    term: "Güz 2023",
    year: "2023",
    likes: 178,
    downloads: 156,
    questions: [
      {
        id: 1,
        text: "Bir matrisin determinantı 0 ise bu matris hakkında ne söylenebilir?",
        options: ["Tersi vardır", "Tersi yoktur", "Birim matristir", "Sıfır matristir"],
        correctAnswer: 1
      }
    ]
  },
  {
    id: 3,
    title: "Fizik II Final Sınavı",
    subject: "Physics",
    professor: "Prof. Dr. Mehmet Kaya",
    term: "Bahar 2024",
    year: "2024",
    likes: 203,
    downloads: 167,
    questions: [
      {
        id: 1,
        text: "Coulomb kanunu hangi fiziksel büyüklükler arasındaki ilişkiyi açıklar?",
        options: ["Kütle-Kuvvet", "Yük-Kuvvet", "Hız-İvme", "Basınç-Hacim"],
        correctAnswer: 1
      }
    ]
  }
];