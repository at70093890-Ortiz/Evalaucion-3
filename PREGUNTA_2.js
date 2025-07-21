function ordenarLista(lista) {
  return lista.sort((a, b) => a - b);
}
let numeros = [1, 5, 10, 258, 1, 0, 145];
let ordenados = ordenarLista(numeros);
console.log(ordenados);