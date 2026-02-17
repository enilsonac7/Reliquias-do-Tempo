const produtos = [
    { nome: "Omega Constellation Ouro", preco: "4.890,00", img: "img/vintage gold Omega Constellation.jpg" },
    { nome: "1950s minimalist dress watch", preco: "4.500,00", img: "img/1950s minimalist dress watch.jpg" },
    { nome: "vintage black pilot watch", preco: "4.100,00", img: "img/vintage black pilot watch.jpg" },
    { nome: "open gold vintage pocket watch", preco: "4.300,00", img: "img/open gold vintage pocket watch.jpg" }
];

// Variável global para armazenar o relógio selecionado (começa com o destaque do Hero)
let relogioInteresse = "Omega Constellation Ouro";

function carregarProdutos() {
    const grid = document.getElementById('product-grid');
    if(!grid) return;

    grid.innerHTML = ''; // Limpa a grid para evitar duplicatas

    produtos.forEach((p, index) => {
        const card = document.createElement('div');
        card.className = 'product-card';
        
        // Aplica o delay dinâmico que você criou
        card.style.animationDelay = `${0.8 + (index * 0.2)}s`; 
        
        card.innerHTML = `
            <img src="${p.img}" alt="${p.nome}" onerror="this.src='https://via.placeholder.com/300?text=Relíquia+Vintage'">
            <p>${p.nome}</p>
            <span class="price">R$ ${p.preco}</span>
            <button class="btn-select" onclick="selecionarParaCompra('${p.nome}')">Tenho Interesse</button>
        `;
        grid.appendChild(card);
    });
}

// Função para atualizar qual relógio o cliente quer
function selecionarParaCompra(nome) {
    relogioInteresse = nome;
    
    // Atualiza o texto do balão flutuante
    const infoWhatsApp = document.querySelector('.whatsapp-float p strong');
    if(infoWhatsApp) {
        infoWhatsApp.innerText = nome + "...";
    }

    // Scroll suave para o botão de compra para facilitar a conversão
    document.querySelector('.whatsapp-float').style.transform = "scale(1.1)";
    setTimeout(() => {
        document.querySelector('.whatsapp-float').style.transform = "scale(1)";
    }, 300);
}

function sendWhatsApp() {
    const numero = "5541999999999"; 
    const mensagem = `Olá @ReliquiasDoTempo, gostaria de saber mais sobre o ${relogioInteresse}!`;
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
}

// Inicia a função ao carregar a página
window.onload = carregarProdutos;



// Faz o scroll suave manualmente para todos os links internos
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === "#") {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = 90; // Ajuste este valor conforme a altura do seu menu
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

function carregarProdutos() {
    const grid = document.getElementById('product-grid');
    if(!grid) return;

    grid.innerHTML = ''; 

    produtos.forEach((p, index) => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.style.animationDelay = `${0.5 + (index * 0.2)}s`; 
        
        card.innerHTML = `
            <img src="${p.img}" alt="${p.nome}">
            <p style="font-weight: bold; font-size: 1.1rem; margin: 10px 0;">${p.nome}</p>
            <span class="price" style="color: #DAA520; font-size: 1.2rem;">R$ ${p.preco}</span>
            <button class="btn-select" 
                onclick="adicionarAoCarrinho('${p.nome}', '${p.preco}')" 
                style="margin-top: 20px; width: 100%; padding: 12px; cursor: pointer; background: transparent; border: 1px solid #DAA520; color: #DAA520; font-weight: bold; transition: 0.3s;">
                TENHO INTERESSE
            </button>
        `;
        grid.appendChild(card);
    });
}
// Esconde o preloader após o carregamento completo da página
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    
    // Pequeno delay para garantir que o usuário veja a animação (opcional)
    setTimeout(() => {
        preloader.classList.add('loader-finish');
    }, 1000); 
});


// Variável global para armazenar os itens
let carrinho = [];

// Função para ADICIONAR item
function adicionarAoCarrinho(nome, preco) {
    // Adiciona o objeto ao array
    carrinho.push({ nome, preco });
   
     // Atualiza a interface visual
    atualizarCarrinho();
    
    // Abre o painel do carrinho automaticamente para feedback ao utilizador
    const sidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('cart-overlay');
    if (sidebar && !sidebar.classList.contains('open')) {
        sidebar.classList.add('open');
        overlay.classList.add('active');
    }
    
    
}

// Função para REMOVER item individual
function removerDoCarrinho(index) {
    // Remove o item do array baseado no índice
    carrinho.splice(index, 1);
    
    // Atualiza a interface visual
    atualizarCarrinho();
}

// Função para ATUALIZAR a interface do carrinho
function atualizarCarrinho() {
    const container = document.getElementById('cart-items');
    const count = document.getElementById('cart-count');
    const totalElem = document.getElementById('cart-total-value');
    
    // Limpa o contentor antes de renderizar
    container.innerHTML = "";
    let total = 0;

    if (carrinho.length === 0) {
        container.innerHTML = '<p class="empty-msg" style="text-align:center; color:#666; margin-top:20px;">O seu carrinho está vazio.</p>';
    } else {
        carrinho.forEach((item, index) => {
            // Converte o preço "4.890,00" em número para cálculo
            const valorNumerico = parseFloat(item.preco.replace('.', '').replace(',', '.'));
            total += valorNumerico;

            container.innerHTML += `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <p style="font-weight:bold; color:#fff;">${item.nome}</p>
                        <span style="color:#DAA520;">R$ ${item.preco}</span>
                    </div>
                    <button class="remove-btn" onclick="removerDoCarrinho(${index})">
                        Remover
                    </button>
                </div>
            `;
        });
    }

    // Atualiza o contador no menu e o valor total
    count.innerText = carrinho.length;
    totalElem.innerText = `R$ ${total.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

// Função unificada para abrir/fechar o carrinho
function toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('cart-overlay');
    
    // Alterna as classes que controlam a visibilidade
    sidebar.classList.toggle('open');
    overlay.classList.toggle('active');
}

// Garante que o botão de fechar (X) chame a função acima
// No seu HTML o botão deve estar assim: <button onclick="toggleCart()" class="close-cart">&times;</button>


function checkoutWhatsApp() {
    // 1. Verifica se há algo no carrinho
    if (carrinho.length === 0) {
        alert("O seu carrinho está vazio, caçador! Escolha uma relíquia primeiro.");
        return;
    }

    // 2. Configurações do WhatsApp
    const numeroCelular = "5541999999999"; // COLOQUE SEU NÚMERO AQUI (com DDD e sem espaços)
    
    // 3. Monta a lista de produtos de forma elegante
    let listaItens = "";
    let totalGeral = 0;

    carrinho.forEach((item, index) => {
        listaItens += `${index + 1}. *${item.nome}* - R$ ${item.preco}\n`;
        
        // Converte o preço para soma (ex: "4.890,00" -> 4890.00)
        const valorNumerico = parseFloat(item.preco.replace('.', '').replace(',', '.'));
        totalGeral += valorNumerico;
    });

    // 4. Formata o valor total para a mensagem
    const totalFormatado = totalGeral.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    // 5. Constrói a mensagem final
    const mensagemBase = 
`💎 *NOVO PEDIDO - RELÍQUIAS DO TEMPO* 💎
Olá! Sou o @ReliquiasDoTempo e gostaria de finalizar a compra destas peças:

${listaItens}
💰 *Total do Pedido:* ${totalFormatado}

Como podemos prosseguir com o pagamento e envio?`;

    // 6. Gera a URL e redireciona
    const urlFinal = `https://wa.me/${numeroCelular}?text=${encodeURIComponent(mensagemBase)}`;
    
    window.open(urlFinal, '_blank');
}


// Função para abrir/fechar o carrinho (Agora mais robusta)
function toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('cart-overlay');
    
    if (sidebar && overlay) {
        sidebar.classList.toggle('open');
        overlay.classList.toggle('active');
    }
}

