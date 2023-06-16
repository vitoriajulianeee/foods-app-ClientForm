import React, { useEffect, useRef, useState } from 'react';
import { Button, Form, Container, Row } from 'react-bootstrap';

//import foods from '../models/foods';
import Food from './Food';
import FoodForm from './FoodForm';
import ClientForm from './ClientForm';




const Main = () => {
//usestate variavel Foods
  let [clients, setClients] = useState([]);
  let [foods, setFoods] = useState([]);

 
//usestate variavel  nome
  let [nome, setNome] = useState('');
//usestate variavel show
  const [show, setShow] = useState(false);
  const [showClient, setShowClient] = useState(false);

  const handleClose = () => setShow(false);
  const handleCloseClient = () => setShowClient(false);

  const handleShow = () => setShow(true);
  const handleShowClient= () => setShowClient(true);

  let buttonAdd = useRef(null);

  async function getComidas() {
    const response = await fetch('http://localhost:4000/comidas', {
      method: 'GET',
    });
    const data = await response.json();

    return data;
  }

  const handleClick = async (event) => {
    console.log('Antes do fecth');
    const data = await getComidas();
    console.log(data);
    console.log('Depois do fetch!');
  };

  useEffect(() => {
    fetch('http://localhost:3000/foods')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setFoods([...data]);
      })
      .catch();
  }, []);
  
  useEffect(() => {
    fetch('http://localhost:3000/Clien')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setClients([...data]);
      })
      .catch();
  }, []);


  const nomeHandleChange = (event) => {
    setNome(event.target.value);
  };

  return (
    <main>
      <Container>
        <h1>Menu</h1>
        <div className="text-right">
          <Button
            variant="secondary"
            className="mr-4 font-weight-bold"
            onClick={handleShow}
            ref={buttonAdd}
          >
            +  Adicionar Preparação
          </Button>
          <Button
            variant="secondary"
            className="mr-4 font-weight-bold"
            onClick={handleShowClient}
            ref={buttonAdd}
          >
            +  Adicionar Cliente
          </Button>
        </div>

        {/* Component Button do bootstrap. */}
        <Form.Group className="mb-3">
          <Form.Label>Alimento</Form.Label>
          <Form.Control
            type="text"
            placeholder="Café"
            value={nome}
            onChange={nomeHandleChange}
          />
        </Form.Group>

        <Button onClick={handleClick} variant="primary">
          Pesquisar
        </Button>

        <Row className="my-2">
          {foods.map((food) => (
            <Food key={food.id} food={food}></Food>
          ))}
        </Row>

        <FoodForm
          show={show}
          handleClose={handleClose}
          foods={foods}
          setFoods={setFoods}
        ></FoodForm>

        <ClientForm
          showClient={showClient}
          handleCloseClient={handleCloseClient}
          clients={clients}
          setClients={setClients}
        ></ClientForm>

      </Container>
    </main>
  );
};

export default Main;