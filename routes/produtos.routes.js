const express = require('express')
const produtosController = require('../controllers/produtos.controller'); // Importando o controller de produtos
const multer = require('multer'); // Importando o multer para upload de imagens
const path = require('path'); // Para manipulação de caminhos de arquivos


// Configurando o Multer para armazenar as imagens localmente
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, '../Uploads')); // Corrige o caminho
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });
// Configurando o Multer para salvar as imagens na pasta 'uploads'
const upload = multer({
  dest: path.join(__dirname, '../uploads')  // Define a pasta onde os arquivos serão armazenados
});

// const upload = multer({ storage });

const router = express.Router();
// router.use(express.static(__dirname))


// Rota para criar um novo produto
router.post('/', (req, res, next) => {
  // Verifica se o tipo de conteúdo é multipart/form-data
  if (req.headers['content-type']?.includes('multipart/form-data')) {
    upload.single('foto')(req, res, next); // Middleware para upload
  } else {
    req.file = null; // Garante que req.file esteja definido
    next(); // Passa direto para o controller
  }
}, produtosController.createProduto);


// // Rota para criar um novo produto (com ou sem imagem)
// router.post(
//   '/',
//   (req, res, next) => {
//     // Verifica se há um arquivo anexado
//     if (req.headers['content-type']?.includes('multipart/form-data')) {
//       upload.single('foto')(req, res, next);
//     } else {
//       next(); // Não usa multer, continua o fluxo
//     }
//   },
//   produtosController.createProduto
// );

// Rota para criar um novo produto com imagem (upload ou URL)
// router.post('/', upload.single('foto'), (req, res, next) => {
//   console.log('Arquivo recebido pelo multer:', req.file);
//   next(); // Continue para o próximo middleware
// }, produtosController.createProduto);


// Rota para listar todos os produtos
router.get('/', produtosController.getAllProdutos);

// Rota para buscar produto por ID
router.get('/:id', produtosController.getProdutoById);

// Rota para atualizar um produto
router.put('/:id', upload.single('foto'), produtosController.updateProduto);

// Rota para deletar um produto
router.delete('/:id', produtosController.deleteProduto);

module.exports =router;