<template>
<form class="container">
    <h1>Formulario de Contacto</h1>
    <label for="nombre">Nombre:</label>
    <input type="text" id="nombre" name="nombre" placeholder="Ingresa tu nombre" required>
    
    <label for="email">Correo Electrónico:</label>
    <input type="email" id="email" name="email" placeholder="Ingresa tu correo" required>
    
    <label for="mensaje">Mensaje:</label>
    <textarea id="mensaje" name="mensaje" rows="4" placeholder="Escribe tu mensaje" required></textarea>
    
    <button type="submit">Enviar</button>
</form>
</template>
<style>
body {
    font-family: Arial, sans-serif;
    background-color: #ffeceb;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
}

.container {
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 400px;
    text-align: center;
}

h1 {
    color: #ff4b44;
    margin-bottom: 20px;
}

form {
    display: flex;
    flex-direction: column;
}

label {
    text-align: left;
    margin-top: 10px;
    font-weight: bold;
}

input, button {
    padding: 10px;
    margin-top: 5px;
    border: 1px solid #ff4b44;
    border-radius: 5px;
    font-size: 16px;
}

input:focus {
    outline: none;
    border-color: #ff4b44;
    box-shadow: 0 0 5px rgba(255, 75, 68, 0.5);
}

button {
    background-color: #ff4b44;
    color: white;
    border: none;
    cursor: pointer;
    transition: background 0.3s;
}

button:hover {
    background-color: #d93d38;
}</style>