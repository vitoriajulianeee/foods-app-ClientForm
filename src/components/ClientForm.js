import React, { useState } from 'react';
import { Button, Form ,Modal } from 'react-bootstrap';

//componente 
const ClientForm = ({ showClient, handleCloseClient, clients, setClients }) => {
//seta para um array vazio que espera a resposta que vai vim da api
  
  let [cliente, setCliente] = useState({ nome: '', email: '', nascimento: '', cep: ''});
//pega todo o dado de clientes
  const handleChange = (event) => {
    //
    setCliente({ ...cliente, [event.target.name]: event.target.value });
  };

//quando clicar para adicionar
  const handleOnSubmit = (event) => {
    ///nao deixa o metedo ser enviado
    event.preventDefault();
    // Enviar os dados para o servidor backend.
    fetch('http://localhost:3000/Clien', {
      method: 'POST', // Método de envio.
      body: JSON.stringify(cliente), // Converte o Json em string
      // Especifica o tipo do conteúdo da requisição/ tipo  da comunicação
      headers: {
        'Content-Type': 'application/json', 
      },
    })
      .then((response) => {
        if (response.ok === true) {
          // Fechar modal.
          handleCloseClient();
          //transforma resposta em json
          return response.json();
        }
      })
      //pega os dados em json e coloca no hook setClients alterando a lista 
      .then((data) => {
        setClients([...clients, data]);
      })
      .catch((error) => {});
    // Atualizar a lista de clientes.
  };

  return (
    <Modal show={showClient} onHide={handleCloseClient}>
        <Modal.Header closeButton>
          <Modal.Title>Adicionar Cliente</Modal.Title>
        </Modal.Header>
      <Form onSubmit={handleOnSubmit}>
        <Modal.Body>
              <Form.Group className="mb-3" controlId="formBasicNome">
                <Form.Label>Nome</Form.Label>
                <Form.Control 
                  required type="text" 
                  placeholder="Nome" 
                  name="nome"
                  onChange={handleChange}
                  value={cliente.nome}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control 
                  required type="email" 
                  placeholder="E-mail" 
                  name="email"
                  onChange={handleChange}
                  value={cliente.email}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicNacimento">
                <Form.Label>Nacimento</Form.Label>
                <Form.Control 
                  required type="text" 
                  placeholder="Data De Nacimento" 
                  name="nascimento"
                  onChange={handleChange}
                  value={cliente.nascimento}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicCep">
                <Form.Label>Cep</Form.Label>
                <Form.Control 
                  required type="text" 
                  placeholder="cep" 
                  name="cep"
                  onChange={handleChange}
                  value={cliente.cep}/>
              </Form.Group>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseClient}>
            Fechar
          </Button>
          <Button variant="primary" type="submit">
            Salvar
          </Button>
        </Modal.Footer>
      </Form> 
    </Modal>
  );
}

export default ClientForm;