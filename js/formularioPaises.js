// FormularioPaises.js
// Datos de los países, estados, municipios y localidades
var data = {
    "Mexico": {
      "Hidalgo": {
        "Tula": ["El llano", "San Marcos", "San Miguel Vindho"],
        "Tezontepec de Aldama": ["Mangas", "Presas", "Huitel"],
        "Mixquiahula": ["Tepeitic", "Colonia Teñhe", "Colonia Veracruz"]
      },
      "Queretaro": {
        "Amealco de Bonfil": ["Amealco de Bonfil", "San Ildefonso Tultepec", "Santiago Mexquititlán Barrio 5o."],
        "Pinal de Amoles": ["Pinal de Amoles", "Ahuacatlán de Guadalupe", "Sauz de Guadalupe"],
        "Arroyo Seco": ["Arroyo Seco", "Purísima de Arista", "Concá"]
      }
    },
    "Estados Unidos": {
      "California": {
        "San Francisco": ["Centro Cívico", "Chinatown", "Fisherman's Wharf", "Distrito Financiero"],
        "Los Ángeles": ["Hollywood", "Playas", "Downtown"],
        "San Diego": ["Parques", "Playas", "Clima agradable"] 
      },
      "Texas": {
        "Houston": ["Centro Financiero", "Pasadena", "Glendale"],
        "Austin": ["Distrito de Artes de Austin", "Parque Klyde Warren"],  
        "Dallas": ["Distrito de Artes de Dallas", "Parque Klyde Warren"]
      },
      "Florida": {
        "Miami": ["Miami Beach", "Little Havana","Wynwood"],
        "Orlando": ["Universal Studios", "Disney World", "SeaWorld"],
        "Tampa": ["Busch Gardens", "Ybor City","Museo de Arte de Tampa"]  
      }
    }
  };
  
  window.onload = function() {
  
    // Selectores
    var countrySelect = document.getElementById("country");
    var stateSelect = document.getElementById("state");  
    var municipalitySelect = document.getElementById("municipality");
    var localitySelect = document.getElementById("locality");
    
    // Inicializar selects
    countrySelect.options[0] = new Option('Seleccione país','');
    stateSelect.options[0] = new Option('Seleccione estado','');
    municipalitySelect.options[0] = new Option('Seleccione municipio','');
    localitySelect.options[0] = new Option('Seleccione localidad',''); 
  
    // Llenar países
    for(var country in data) {
      countrySelect.options[countrySelect.options.length] = new Option(country, country);
    }
  
    // Cascade selects  
    countrySelect.onchange = function() {
      stateSelect.length = 1; 
      municipalitySelect.length = 1;
      localitySelect.length = 1;
  
      if(this.selectedIndex < 1) return; 
  
      for(var state in data[this.value]) {
        stateSelect.options[stateSelect.options.length] = new Option(state, state);
      }
    }
  
    stateSelect.onchange = function() {
      municipalitySelect.length = 1; 
      localitySelect.length = 1;
  
      if(this.selectedIndex < 1) return;
  
      var municipalities = data[countrySelect.value][this.value];
      for(var i in municipalities) {
        municipalitySelect.options[municipalitySelect.options.length] = new Option(i, i);    
      }
    }  
  
    municipalitySelect.onchange = function() {
      localitySelect.length = 1; 
  
      if(this.selectedIndex < 1) return;
  
      var localities = data[countrySelect.value][stateSelect.value][this.value];
      for(var i = 0; i < localities.length; i++) {
        localitySelect.options[localitySelect.options.length] = new Option(localities[i], localities[i]);
      }
    }
  
    // Botón
    const btn = document.querySelector("a");
  
    btn.addEventListener("click", e => {
      
      e.preventDefault(); 
      
      btn.classList.add("animate");
  
      setTimeout(() => {
        btn.classList.remove("animate");
      }, 500);
  
      var country = countrySelect.value; 
      var state = stateSelect.value;
      var municipality = municipalitySelect.value;  
      var locality = localitySelect.value;
  
      document.getElementById("selectedLocation").innerHTML =  
         `
          <table>
            <tr>
              <th>País</th>
              <th>Estado</th>
              <th>Municipio</th>
              <th>Localidad</th>
            </tr>
            <tr>
              <td>${country}</td>
              <td>${state}</td>
              <td>${municipality}</td> 
              <td>${locality}</td>
            </tr>
          </table>
         `;
  
    });
  
  }