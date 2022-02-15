// function filtrandoUnidades() {
//   const novasUnidades = promocaounidades.map((item) => ({
//     id: item.unidade.id,
//     value: item.unidade.id,
//     name: item.unidade.nome,
//     desativados: item.diasDesabilitados,
//     periodos: item.periodos,
//     logradouro: 'Av. Romeu Strazzi',
//     bairro: 'Vila Sinibaldi',
//     uf: 'SP',
//     cidade: 'São José do Rio Preto',
//   }));

//   if (novasUnidades.length > 1) {
//     setUnidades(novasUnidades);
//   } else {
//     setUnidadeEscolhida(novasUnidades[0]);
//   }
// }

// function filtrandoPeriodos(dados) {
//   const novosPeriodos = dados.map((periodo) => (
//     {
//       id: periodo.ordem,
//       value: periodo.nome,
//       name: periodo.nome,
//     }
//   ));

//   const periodosReordenados = novosPeriodos.sort((a, b) => a.id - b.id);

//   return periodosReordenados;
// }
