
function getCurso(_id) {
  let cursos = [
    { id: 1, nome: 'Angular' },
    { id: 2, nome: 'React' },
    { id: 3, nome: 'Vue' },
    { id: 4, nome: 'Next' }
  ]

  return cursos.find((item) => item.id == _id) || null

/*   if (curso.id != undefined) {
    return curso
  } else {
    return null
  } */

}

let teste = getCurso(13)
console.log(teste)
