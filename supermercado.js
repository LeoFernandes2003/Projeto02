const items = [];

document.querySelector('input[type=submit]').addEventListener('click', () => {
  const nomeProduto = document.querySelector('input[name=nome_produto]');
  const precoProduto = document.querySelector('input[name=price]');

  if (!nomeProduto.value.trim() || !precoProduto.value.trim()) {
    alert('Por favor, preencha os campos abaixo!');
    return;
  }

  items.push({
     nome: nomeProduto.value,
     valor: precoProduto.value });

  const listaProdutos = document.querySelector('.lista-produtos');
  let soma = 0;
  listaProdutos.innerHTML = '';
  items.forEach((val, index) => {
    soma += parseFloat(val.valor);

    listaProdutos.innerHTML += `
      <div class="lista-produto-single" data-id="${index}">
        <h3>${val.nome}</h3>
        <h3 class="price-produto"><span>R$ ${val.valor}</span></h3>
        <p style="margin-right: 20px; cursor: pointer;" class="remove-item" data-id="${index}">X</p>
      </div>
    `;
  });

  soma = soma.toFixed(2);
  nomeProduto.value = '';
  precoProduto.value = '';

  const elementoSoma = document.querySelector('.soma-produto h1');
  elementoSoma.innerHTML = `Total:R$ ${soma}`;
});

document.querySelector('.lista-produtos').addEventListener('click', (e) => {
  if (e.target.classList.contains('remove-item')) {
    const itemId = e.target.dataset.id;
    items.splice(itemId, 1);
    document.querySelector(`.lista-produto-single[data-id="${itemId}"]`).remove();
  
    const soma = items.reduce((total, item) => total + parseFloat(item.valor), 0);
    document.querySelector('.soma-produto h1').innerHTML = `Total:R$${soma.toFixed(2)}`;
    }
});

document.querySelector('button[name=limpar]').addEventListener('click', () => {
  items = [];
  document.querySelector('.lista-produtos').innerHTML = '';
  document.querySelector('.soma-produto h1').innerHTML = 'Total:R$0';
});