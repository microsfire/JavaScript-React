import React, { useState, useEffect } from 'react'

// import AdicionarUsuario from '../AdicionarUsuario/AdicionarUsuario'
import Usuario from '../Usuario/Usuario'

function Usuarios (props) {

  const [usuarios, setUsuarios] = useState([])

  useEffect(() => {
    //METODO GET o fetch é por padrão
   fetch('https://reqres.in/api/users')
   .then(resposta => resposta.json())
   .then(dados => {
     //console.log(dados.data)

     const usuarios = dados.data.map(usuario => ({
       id: usuario.id,
       nome: usuario.first_name,
       sobrenome: usuario.last_name,
       email: usuario.email
     }))
     setUsuarios(usuarios)
   })

  }, [])
  
  
  // const adicionarUsuario = usuario => {
    // setUsuarios(usuariosAtuais => [...usuariosAtuais, usuario])
  // }
  
  const removerUsuario = usuario => {
    if (window.confirm(`Tem certeza que deseja remover "${usuario.nome} ${usuario.sobrenome}"?`)) {
      //METODO DELETE
      fetch(`https://reqres.in/api/users/${usuario.id}`,{
        method: 'DELETE'
      })
        .then(resposta =>{
          if(resposta.ok){
            setUsuarios(usuarios.filter(x => x.id !== usuario.id))
          }   
        })
    }
  }

  return (
    <>
      {/*<AdicionarUsuario adicionarUsuario={adicionarUsuario} />*/}

      {usuarios.map(usuario => (
        <Usuario key={usuario.id}
          usuario={usuario}
          removerUsuario={() => removerUsuario(usuario)}
        />
      ))}
    </>
  )
}

export default Usuarios