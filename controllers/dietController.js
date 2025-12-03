export const calcularTMB = (peso, altura, edad, sexo, actividad) => {
  let tmb;
  if (sexo === "M") {
    tmb = 88.362 + 13.397 * peso + 4.799 * altura - 5.677 * edad;
  } else {
    tmb = 447.593 + 9.247 * peso + 3.098 * altura - 4.33 * edad;
  }
  //meb=metabolismo basal
  const factores = {
    sedentario: 1.2,
    ligero: 1.375,
    moderado: 1.55,
    intenso: 1.725,
  };

  return tmb * (factores[actividad] || 1.2);
};
