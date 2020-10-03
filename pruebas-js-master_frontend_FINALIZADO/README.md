### TAREA

Crear una clase Stepper que permita renderizar las vistas propuestas en el mockup.Se adjunta un código de ejemplo:

```
const htmlstring = '<div>hola mundo</div>';
const stepper = new Stepper();
stepper.addStep({
title: 'Primer step',
content: htmlstring
});
stepper.addStep({
title: 'Segundo step',
content: htmlstring
});
stepper.render();

```

Al stepper se le podrá configurar:

- el identificador del elemento html donde renderizarlo
- el tipo de vista
- si mostrar el título de los pasos
- si mostrar el botón de finalizar o no en todos los pasos (por defecto no)


El stepper emitirá los siguientes eventos:
- antes de pasar al siguiente paso
- al finalizar


Se crearán cuatro pasos con un ejemplo de los siguientes gráficos:

- BARCHART VERTICAL: https://www.chartjs.org/samples/latest/charts/bar/vertical.html
- LINE MULTI AXIS: https://www.chartjs.org/samples/latest/charts/line/multi-axis.html
- AREA LINE BOUNDARIES (solo un gráfico): https://www.chartjs.org/samples/latest/charts/area/line-boundaries.html
- DONUT: https://www.chartjs.org/samples/latest/charts/doughnut.html

Crear una clase Chart que facilite la creación de los gráficos.

### ESPECIFICACIONES

Para el sistema de gráficos se ha incluido chart.js como dependencia:

https://www.chartjs.org/docs/latest/getting-started/

Para el sistema de plantilas se ha incluido nunjucks como dependencia:

https://mozilla.github.io/nunjucks/

Incluir un archivo gulpfile.js que haga el bundle de los plugins js.

Es obligatorio el uso de variables CSS. No usar ningún framework css / js aparte de los ya mencionados.