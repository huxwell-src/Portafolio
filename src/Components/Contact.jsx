import React from 'react';

export const Contact = () => {

  const sendEmail = (event) => {
    event.preventDefault();

    emailjs.sendForm('service_d5n5bte','template_x2cqih8',event.target,'Zjo6mNYvNam9PYTZC')
    .then(response => console.log(response))
    .catch(error => console.log(error))
  }

  return (
    <section className='' id='contact'>  
      <div className='div-form'>
        <h1 className='title-form'>Contact Us</h1>
        <form className='form-mail' onSubmit={sendEmail}>
          <label>Name</label>
          <input type="text" name='user_name' />
          <hr />

          <label>Email</label>
          <input type="email" name='user_email' />
          <hr />

          <label>Message</label>
          <textarea name="user_message" id="" cols="30" rows="10"></textarea>
          <hr />
          <button>Send</button>
        </form>
      </div>
    </section>
  )
}