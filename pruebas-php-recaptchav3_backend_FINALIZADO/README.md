### ESPECIFICACIONES

Incluir google recaptcha v3 en el envío del formulario.

Se debe mostrar un error si envía sin completar el captcha.

Se debe mostrar un error si el captcha es incorrecto

Si el captcha es correcto, mostrar un alert de mensaje enviado correctamente.

Si el captcha es correcto, se debe guardar en una tabla de una base de datos mysql los datos del formulario, la fecha de envío y la ip desde la que se envía.

Para la base de datos se ha incluido la siguiente clase para facilitar la conexión y ejecución de consultas:
https://github.com/ThingEngineer/PHP-MySQLi-Database-Class

La clase recaptcha deberá tener una función que descarge el script de recaptcha a local ($recaptcha->descargarScripts()). Se debe ejecutar antes del renderizado. Solo se debe incluir en el html la copia local del archivo.

Usar bootstrap 4 para la maquetación de la página. Se pueden modificar los tpls como se necesiten, así como el resto de los archivos, manteniendo y respetando la estructura de directorios

