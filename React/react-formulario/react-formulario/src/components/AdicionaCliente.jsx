import React from 'react';
import { Formik, Field} from "formik";

const AdicionaCliente = () => {
  return (
    <>
      <h1>Cadastro de Clientes</h1>
      <Formik initialValues={{nome:'', email:'', nascimento:''}}
      validate={(values)=> {
        const errors = {};
      
        if (!values.nome) {
          errors.nome = 'O nome é obigatorio';
        }
        if (!values.email) {
          errors.email = 'O email é obigatorio';
        }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)){
          errors.email = 'O email é invalido'
        } 
        if (!values.nascimento) {
          errors.nascimento = 'A data de nascimento é obigatorio';
        }
        return errors;
      }}
      onSubmit={(values) => {alert(JSON.stringify(values))}}>
        {(props)=>(
        <form onSubmit={props.handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="nome">Nome</label>
            <Field 
            type="text" 
            id="nome" 
            name="nome" 
            className={props.errors.nome && props.touched.nome ? 'is-invalid' : ''}/>
          </div>
          {props.errors.nome && props.touched.nome ? (<div className='invalid-feedback'>{props.errors.nome}</div>): null}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <Field 
            id="email" 
            name="email" 
            type="email" 
            className={props.errors.email && props.touched.email ? 'is-invalid' : ''}/>
          </div>
          {props.errors.email && props.touched.email ? (<div className='invalid-feedback'>{props.errors.email}</div>): null}
          <div className="form-group">
            <label htmlFor="date">Data de Nascimento</label>
            <Field 
            id="nascimento" 
            name="nascimento" 
            type="date" 
            className={props.errors.nascimento && props.touched.nascimento ? 'is-invalid' : ''}/>
          </div>
          {props.errors.nascimento && props.touched.nascimento ? (<div className='invalid-feedback'>{props.errors.nascimento}</div>): null}
          <button type="submit">Adicionar</button>
        </form>
        )}
      </Formik>
    </>
  );
};

export default AdicionaCliente;
