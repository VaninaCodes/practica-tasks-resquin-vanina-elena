# .env (Investigacion Extra)

## ¿Qué es?

Es un archivo de texto que almacena variables de entorno en formato clave = valor para mantener secretos y configuraciones fuera del código fuente.

## ¿Cómo se instala?

```jsx
npm install dotnet
```

## ¿Cómo se configura?

Se configura con las variables del entorno:

```jsx
DB_NAME = demo_db;
DB_USER = root;
DB_PASSWORD = tu_password;
DB_HOST = localhost;
DB_DIALECT = mysql;
PORT = 4000;
```

## ¿Cómo se accede a las variables definidas en el archivo desde el codigo?

Para acceder a las variables definidas en un archivo .env desde el codigo de Node.js se debe utilizar la biblioteca _dotnet_ para cargar el archivo .env y luego acceder a las variables en el objeto _process.env_.

Por ejemplo: si el archivo .env contiene la variable DB_HOST=’mihost’, se puede acceder a ella en el código como _process.env.DB_HOST_.

Esto permite mantener la configuración de la aplicación sin compartir infomación sensible en el código fuente.
