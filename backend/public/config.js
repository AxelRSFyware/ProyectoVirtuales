/*
	FUNCIONES
		agregar fila()
		eliminar fila()
		enviar()
		validar()
		archivoJSON()
*/

/*
Agregar fila -> Inserta filas a la tabla
				Cuentan con 5 columnas
				Dentro de las columnas hay inputs de tipo texto
*/
function agregarFila(){
	let tam = document.getElementById('table_form').rows.length;
	let tabla = document.getElementById('table_form').insertRow(tam);
	let col1 = tabla.insertCell(0);
	let col2 = tabla.insertCell(1);
	let col3 = tabla.insertCell(2);
	let col4 = tabla.insertCell(3);
	let col5 = tabla.insertCell(4);

	let idCelda1 = "tabla_1_"+tam;
	let idCelda2 = "tabla_2_"+tam;
	let idCelda3 = "tabla_3_"+tam;
	let idCelda4 = "tabla_4_"+tam;
	let idCelda5 = "tabla_5_"+tam;
	col1.innerHTML = '<input type="text" style="width: 200px; id="'+idCelda1+'" class="entrada">';
	col2.innerHTML = '<input type="text" style="width: 100px; id="'+idCelda2+'" class="entrada">';
	col3.innerHTML = '<input type="text" style="width: 100px; id="'+idCelda3+'" class="entrada">';
	col4.innerHTML = '<input type="text" style="width: 100px; id="'+idCelda4+'" class="entrada">';
	col5.innerHTML = '<input type="text" style="width: 80px;  id="'+idCelda5+'" class="entrada">';
}

function eliminarFila(){
	let tam = document.getElementById('table_form').rows.length;
	if(tam != 1){
		document.getElementById('table_form').deleteRow(tam-1);
	}
}

function enviar(){
	let nombre = document.getElementById("in_nom").value;
	let apellidoP = document.getElementById("in_ap").value;
	let apellidoM = document.getElementById("in_am").value;
	let matricula = document.getElementById("in_mat").value;
	let carrera = document.getElementById("in_car").value;
	let semestre = document.getElementById("in_sem").value;
	let cicloEs = document.getElementById("in_cies").value;
	//	Validar [PRIMERA PARTE]
	mensaje = "";
		//	Validar nombre
		if(nombre == ""){
			mensaje += "Ingrese el nombre\n";
		}
		//	Validar apellido paterno
		if(apellidoP == ""){
			mensaje += "Ingresa el apellido paterno\n";
		}
		//	Validar matricula
		if(matricula == ""){
			mensaje += "Ingresa la matrícula\n";
		}else{
			if(matricula.length != 6){
				mensaje += "Matrícula no valida\n";
			}
		}
		//	Validar carrera
		if(carrera == 0){
			mensaje += "Ingresa la carrera\n";
		}
		//	Valudad semestre
		if(semestre == 0){
			mensaje += "Seleccione el semestre\n";
		}
		//	Validar ciclo escolar
		if(cicloEs == ""){
			mensaje += "Ingrese el ciclo escolar\n";
		}

	if(mensaje!=""){
		alert(mensaje);
	}else{
		//	Enviar datos
		json_alumno  = "\"student\":{\n\t\"name\": \""+nombre+"\",\n";
		json_alumno += "\t\"lastName\": \""+apellidoP+"\",\n";
		json_alumno += "\t\"secondLastName\": \""+apellidoM+"\",\n";
		json_alumno += "\t\"schoolID\": "+matricula+",\n";
		json_alumno += "\t\"major\": \""+carrera+"\",\n";
		json_alumno += "\t\"currentSemester\": "+semestre+",\n";
		json_alumno += "\t\"season\": \""+cicloEs+"\"\n},";
	}
	alert(json_alumno);

	//	Validar [SEGUNDA PARTE]
	
	let tam = document.getElementById("table_form").rows.length - 1;
		let i = 0;
		let j = 0;
		let cont=0

	let inputs = document.querySelectorAll('.entrada');
	var subarray = new Array(inputs.length/5);
	for(i=0; i<inputs.length/5; i++) {
    	subarray[i] = new Array(5);
	}
	for (i=0; i<inputs.length/5; i++){
    	for (j=0; j<5; j++){
    		subarray[i][j] = inputs[cont].value;
    		cont++;
    	}
  	} 
  	
  	
  	let json_materias = "";
  	let mc = "";
  	let cf = "";
  	let gf = "";
  	let pr = "";
  	let td = "";
  	json_materias = "\"subjects\": [";
  	for(i=0 ; i<inputs.length/5 ; i++){
  		for(j=0; j<5; j++){
  			if(j == 0){
				mc = subarray[i][j];
  			}else if(j == 1){
				cf = subarray[i][j];
  			}else if(j == 2){
				gf = subarray[i][j];
  			}else if(j == 3){
				pr = subarray[i][j];
  			}else if(j == 4){
				td = subarray[i][j];
  			}
  		}
		json_materias += "{\n\t\"name\": \""+mc+"\",";
		json_materias += "\n\t\"grade\": "+cf+",";
		json_materias += "\n\t\"dificulty\": \""+gf+"\",";
		json_materias += "\n\t\"preference\": \""+pr+"\",";
		json_materias += "\n\t\"timeDedicated\": \""+td+"\"\n},\n";
  	}
  	json_materias += "]";
  	alert(json_materias);

  	json_final = "{"+json_alumno+json_materias+"}";
  	alert(json_final);

  	var xhr = new XMLHttpRequest();
	var url = "http://localhost:5001/api/academic";
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.onreadystatechange = function () {
    	if (xhr.readyState === 4 && xhr.status === 200) {
    	    var json = JSON.parse(xhr.responseText);
    	    console.log(json);
    	}
	};
	var data = JSON.stringify(json_final);
	xhr.send(data);
	alert("Fin proceso");
}