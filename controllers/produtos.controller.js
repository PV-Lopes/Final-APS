const fs = require('fs');
const path = require('path');
const supabase = require('../config/supabase'); // Importa o cliente do Supabase a partir de config/supabase.js


// Função de criar produto com imagem do servidor
const createProduto = async (req, res) => {
  const { nome, descricao, quantidade, foto } = req.body; 

    // Valida se todos os campos foram preenchidos
    if (!nome || !descricao || !quantidade || !foto) {
      return res.status(400).json({ error: 'Preencha todos os campos obrigatórios' });
    }
  
    // Valida se o arquivo foi enviado
    if (!req.file) {
      return res.status(400).json({ error: 'Nenhuma imagem foi enviada' });
    }
    const imagePath = path.join(__dirname, '../uploads', req.file.filename); // Caminho da imagem na pasta uploads

  // Lê o arquivo de imagem
  const fileBuffer = fs.readFileSync(imagePath); // Lê o arquivo da pasta local

  // Envia a imagem para o Supabase
  const { data, error } = await supabase.storage
    .from('Produtos_IMG') // Nome do bucket
    .upload(`images/${Date.now()}-${req.file.filename}`, fileBuffer, {
      contentType: req.file.mimetype, // Tipo da imagem
    });

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  // Obtém a URL pública da imagem
  const imageUrl = supabase.storage
    .from('Produtos_IMG')
    .getPublicUrl(`images/${data.path}`)
    .publicURL;

  // Agora, cria o produto no banco de dados com a URL da imagem
  const { data: produto, error: insertError } = await supabase
    .from('produtos')
    .insert([{ nome, descricao, quantidade, foto: imageUrl }]);

  if (insertError) {
    return res.status(500).json({ error: insertError.message });
  }

  res.status(201).json(produto); // Retorna o produto com a URL da imagem
};

// Função para listar todos os produtos
const getAllProdutos = async (req, res) => {
  const { data: produtos, error } = await supabase
    .from('produtos') // Nome da tabela
    .select('*');

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json(produtos); // Retorna todos os produtos
};

// Função para buscar um produto por ID
const getProdutoById = async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from('produtos')
    .select('*')
    .eq('id', id) // Filtra pelo ID
    .single(); // Retorna um único produto

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  if (!data) {
    return res.status(404).json({ error: 'Produto não encontrado' });
  }

  res.status(200).json(data);
};

// Função para atualizar um produto
const updateProduto = async (req, res) => {
  const { id } = req.params;
  const { nome, descricao, quantidade } = req.body;
  const updatedData = {};

  // Se uma nova foto for enviada, fazemos o upload
  if (req.file) {
    const imagePath = path.join(__dirname, '../uploads', req.file.filename);
    if (!fs.existsSync(imagePath)) {
      return res.status(400).json({ error: 'Imagem não encontrada' });
    }
    const fileBuffer = fs.readFileSync(imagePath);

    const { data, error } = await supabase.storage
      .from('Produtos_IMG')
      .upload(`images/${Date.now()}-${req.file.filename}`, fileBuffer, {
        contentType: req.file.mimetype,
      });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    const imageUrl = supabase.storage
      .from('Produtos_IMG')
      .getPublicUrl(`images/${data.path}`)
      .publicURL;

    updatedData.foto = imageUrl;
  }

  // Atualiza os campos do produto
  if (nome) updatedData.nome = nome;
  if (descricao) updatedData.descricao = descricao;
  if (quantidade) updatedData.quantidade = quantidade;

  const { data, error: updateError } = await supabase
    .from('produtos')
    .update(updatedData)
    .eq('id', id);

  if (updateError) {
    return res.status(500).json({ error: updateError.message });
  }

  res.status(200).json(data);
};


// Função para deletar um produto
const deleteProduto = async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from('produtos')
    .delete()
    .eq('id', id); // Filtra pelo ID do produto a ser excluído

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  if (data.length === 0) {
    return res.status(404).json({ error: 'Produto não encontrado' });
  }

  res.status(200).json({ message: 'Produto deletado com sucesso' });
};

module.exports = {
  createProduto,
  getAllProdutos,
  getProdutoById,
  updateProduto,
  deleteProduto,
};