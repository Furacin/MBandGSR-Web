var dataGSR;
var dataFC;
var dataTemp;
var audioURI;

function resetZoomChar1() {
    window.myChart.resetZoom()
}

function resetZoomChar2() {
    window.myChart2.resetZoom()
}

function resetZoomChar3() {
    window.myChart3.resetZoom()
}

function NumeroElementos(length) {
    var elementos = []
    for (var i = 1; i<length+1; i++) {
        elementos.push(i);
    }
    return elementos;
}

// Control de las gráficas 
(function() {
    
//    Chart.plugins.register({
//       afterDatasetsDraw: function(chart) {
//          if (chart.tooltip._active && chart.tooltip._active.length) {
//             var activePoint = chart.tooltip._active[0],
//                ctx = chart.ctx,
//                y_axis = chart.scales['y-axis-0'],
//                x = activePoint.tooltipPosition().x,
//                topY = y_axis.top,
//                bottomY = y_axis.bottom;
//             // draw line
//             ctx.save();
//             ctx.beginPath();
//             ctx.moveTo(x, topY);
//             ctx.lineTo(x, bottomY);
//             ctx.lineWidth = 2;
//             ctx.strokeStyle = '#07C';
//             ctx.stroke();
//             ctx.restore();
//          }
//       }
//    });
    
    
    // Obtenemos el email del usuario logueado
    const email_login = sessionStorage.myvar;
    const experiencia = sessionStorage.experiencia_seleccionada;
    const usuario = sessionStorage.usuario_seleccionado;
    console.log(experiencia);
    console.log(usuario);
    
// Initialize Firebase
    const config = {
        apiKey: "AIzaSyA-f9NMWCpap1SmlKs9nVWkTX9LJNAOSC0",
        authDomain: "mbandgsr.firebaseapp.com",
        databaseURL: "https://mbandgsr.firebaseio.com",
        projectId: "mbandgsr",
        storageBucket: "mbandgsr.appspot.com",
        messagingSenderId: "457411073799"
    };
    firebase.initializeApp(config);
    
    
    // Obtener elementos
//    const ulList = document.getElementById('lista');
    
    // Crear referencias
    const dbRefObject = firebase.database().ref().child('users');
    var chart1;
    
    var tipoPrueba;
    
    dbRefObject.on('child_added', snap => {
//        console.log(snap.val().email);
        if (snap.val().email == email_login) {
//            user_key = snap.key;
            console.log(snap.key);
            
            // Nombre
            var nombreSujeto = snap.child("Experiencias").child(experiencia).child(usuario).child("nombre").val();
            // Apellidos
            var apellidosSujeto = snap.child("Experiencias").child(experiencia).child(usuario).child("apellidos").val();
            // Fecha de nacimiento
            var fechaNacimientoSujeto = snap.child("Experiencias").child(experiencia).child(usuario).child("fecha_nacimiento").val();
            // Sexo
            var sexoSujeto = snap.child("Experiencias").child(experiencia).child(usuario).child("sexo").val();
            // Opción multimedia
            var multimediaSujeto = snap.child("Experiencias").child(experiencia).child(usuario).child("opcion_multimedia").val();
            // Descripción
            var descripcionSujeto = snap.child("Experiencias").child(experiencia).child(usuario).child("descripcion").val();
            
            var p = document.createElement('p');
            p.innerHTML = "<b>Nombre y apellidos</b>" + ": " + "<i>" + nombreSujeto + " " + apellidosSujeto + "</i>";
            document.getElementById('nombre').appendChild(p);
            
            var p2 = document.createElement('p');
            p2.innerHTML = "<b>Fecha de Nacimiento</b>" + ": " + "<i>" + fechaNacimientoSujeto + "</i>";
            document.getElementById('fecha_nacimiento').appendChild(p2);
            
            var p3 = document.createElement('p');
            p3.innerHTML = "<b>Sexo</b>" + ": " + "<i>" + sexoSujeto + "</i>";
            document.getElementById('sexo').appendChild(p3);
            
            var p4 = document.createElement('p');
            p4.innerHTML = "<b>Multimedia</b>" + ": " + "<i>" + multimediaSujeto + "</i>";
            document.getElementById('opcion_multimedia').appendChild(p4);
            
            var p5 = document.createElement('p');
            p5.innerHTML = "<b>Descripción</b>" + ": " + "<i>" + descripcionSujeto + "</i>";
            document.getElementById('descripcion').appendChild(p5);
            
            // Obtenemos el tipo de Prueba
//            const tipoPruebaRef = firebase.database().ref().child('users').child(snap.key).child('Experiencias').child(experiencia).child(usuario).child("opcion_multimedia");
//            tipoPruebaRef.on('value', snap => {
//                tipoPrueba = snap.val(); 
//            });
//            
            tipoPrueba = multimediaSujeto;
            const dbRefList = firebase.database().ref().child('users').child(snap.key).child('Experiencias').child(experiencia).child(usuario).child('Datos Graficas').child('GSR');
            const dbRefList2 = firebase.database().ref().child('users').child(snap.key).child('Experiencias').child(experiencia).child(usuario).child('Datos Graficas').child('FC');
            const dbRefList3 = firebase.database().ref().child('users').child(snap.key).child('Experiencias').child(experiencia).child(usuario).child('Datos Graficas').child('Temperatura');
        
            
            // Sincronizar objectos con la web
            dbRefList.on('value', snap => {
                var data = snap.val();  
                dataGSR = data;      
                var ctx = document.getElementById('myChart').getContext('2d');
                var labelElementos = NumeroElementos(data.length);
                
                window.myChart = new Chart(document.getElementById('myChart'), {
                type: 'line',
                data: {
                    labels: labelElementos,
                    datasets: [{
                      label: 'Resistencia Galvánica de la piel',
                      data: data,
                      backgroundColor: "rgba(0,0,255,0.6)"
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero:true
                            }
                        }]
                    },
                    // Container for pan options
                    pan: {
                        // Boolean to enable panning
                        enabled: true,

                        // Panning directions. Remove the appropriate direction to disable 
                        // Eg. 'y' would only allow panning in the y direction
                        mode: 'xy'
                    },

                    // Container for zoom options
                    zoom: {
                        // Boolean to enable zooming
                        enabled: true,

                        // Zooming directions. Remove the appropriate direction to disable 
                        // Eg. 'y' would only allow zooming in the y direction
                        mode: 'x',
                    }
                }
            });
                
            });
            
            //window.myChar1 = chart1;
//            var meta = chart1.getDatasetMeta(0);
//            var x = meta.data[1]._model.x
//            var y = meta.data[1]._model.y
//            console.log(x);
//            console.log(y);

            dbRefList2.on('value', snap => {
                var data = snap.val();  
                dataFC = data;
                var ctx = document.getElementById('myChart2').getContext('2d');
                var labelElementos = NumeroElementos(data.length);
                window.myChart2 = new Chart(ctx, {
                  type: 'line',
                  data: {
                      labels: labelElementos,
                    datasets: [{
                      label: 'Frecuencia Cardíaca',
                      data: data,
                      backgroundColor: "rgba(255,0,0,0.6)"
                    }]
                  },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero:true
                            }
                        }]
                    },
                    // Container for pan options
                    pan: {
                        // Boolean to enable panning
                        enabled: true,

                        // Panning directions. Remove the appropriate direction to disable 
                        // Eg. 'y' would only allow panning in the y direction
                        mode: 'xy'
                    },

                    // Container for zoom options
                    zoom: {
                        // Boolean to enable zooming
                        enabled: true,

                        // Zooming directions. Remove the appropriate direction to disable 
                        // Eg. 'y' would only allow zooming in the y direction
                        mode: 'x',
                    }
                }
                });
            });

//            dbRefList3.on('value', snap => {
//                var data = snap.val();  
//                dataTemp = data;
//                var ctx = document.getElementById('myChart3').getContext('2d');
//                var labelElementos = NumeroElementos(data.length);
//                window.myChart3 = new Chart(ctx, {
//                  type: 'line',
//                  data: {
//                      labels: labelElementos,
//                    datasets: [{
//                      label: 'Temperatura',
//                      data: data,
//                      backgroundColor: "rgba(255,0,255,0.6)"
//                    }]
//                  },
//                    options: {
//                        scales: {
//                            yAxes: [{
//                                ticks: {
//                                    beginAtZero:true
//                                }
//                            }]
//                        },
//                        // Container for pan options
//                        pan: {
//                            // Boolean to enable panning
//                            enabled: true,
//
//                            // Panning directions. Remove the appropriate direction to disable 
//                            // Eg. 'y' would only allow panning in the y direction
//                            mode: 'xy'
//                        },
//
//                        // Container for zoom options
//                        zoom: {
//                            // Boolean to enable zooming
//                            enabled: true,
//
//                            // Zooming directions. Remove the appropriate direction to disable 
//                            // Eg. 'y' would only allow zooming in the y direction
//                            mode: 'x',
//                        }
//                    }
//                });
//            });
        }
        
        ///////////////////////////////////////////////////////////////////////////////////////
        
        // Vídeo (si lo hay)
        
        var storage = firebase.storage();
        var storageRef = storage.ref();
        var tangRef;
        
        switch(tipoPrueba) {
            case "Sólo Vídeo":
                tangRef= storageRef.child(email_login + '/Vídeos/' + experiencia + '/' + usuario + '/' + 'video.3gp');  
//                alert(tangRef);
                tangRef.getDownloadURL().then(function(url) 
                {
                    var test = url
                    document.querySelector('video').src = test;
                }).catch(function(error) 
                {
                    switch (error.code) 
                    {
                        case 'storage/object_not_found':
                            break;

                        case 'storage/unauthorized':
                            break;

                        case 'storage/canceled':
                            break;

                        case 'storage/unknown':
                            break;
                    }
                });
                break;
            case "Sólo Audio":
                tangRef= storageRef.child(email_login + '/Audios/' + experiencia + '/' + usuario + '/' + 'audio.mp3');  
                document.getElementById("video").style.display = 'none';
                document.getElementById("audioDiv").style.display = 'table';
                tangRef.getDownloadURL().then(function(url) 
                {
                   var test = url;
                   audioURI = test;

                }).catch(function(error) 
                {
                    switch (error.code) 
                    {
                        case 'storage/object_not_found':
                            break;

                        case 'storage/unauthorized':
                            break;

                        case 'storage/canceled':
                            break;

                        case 'storage/unknown':
                            break;
                    }
                });
                break;
        }
        
    });
    
}());


function lineaVerticalGSR() {
    var imageOffset = 65;
    
            // Duración del vídeo
            var duracionVideo;    
            var video = document.getElementById("video");
            
            setTimeout(function() {
                duracionVideo = video.duration
            }, 5000);
                
            document.getElementById("verticalLineGSR").style.left = imageOffset.toString() + "px";
            
            // Obtenemos el valor del slider
            var slider = document.getElementById("sliderGSR");
       
            // Obtener la posición del slider
//            var position = slider.getBoundingClientRect();
//            var x = position.left;
//            var y = position.right;
//            console.log(x);
//            console.log(y);
            console.log(imageOffset);
            slider.addEventListener('change', function(){       
                // Vamos desplazando la línea vertical
                if (slider.value==1) 
                    imageOffset = 64
                else
                    imageOffset = 64 + 0.69*parseInt(slider.value)
                document.getElementById("verticalLineGSR").style.left = imageOffset + "px";
                console.log(imageOffset);
                // Movemos el vídeo
                // Dividimos la duración del vídeo entre los 100 steps del slider
                var videoStep = duracionVideo/100
                // Cambiamos el tiempo del vídeo según se mueve el slider
                video.currentTime = videoStep*slider.value
                
            },false);
}

function lineaVerticalFC() {
    var imageOffset = 44;
            // Duración del vídeo
            var duracionVideo;    
            var video = document.getElementById("video");
            
            setTimeout(function() {
                duracionVideo = video.duration
            }, 5000);
                
            document.getElementById("verticalLineFC").style.left = imageOffset.toString() + "px";
            
            // Obtenemos el valor del slider
            var slider2 = document.getElementById("sliderFC");
            slider2.addEventListener('change', function(){ 
                console.log(slider2.value);
                // Vamos desplazando la línea vertical
                if (slider2.value==1) 
                    imageOffset = 43
                else {
                    imageOffset = 43 + 0.72*parseInt(slider.value)
                }
//                console.log(imageOffset);
                document.getElementById("verticalLineFC").style.left = imageOffset + "px";
                
                // Movemos el vídeo
                // Dividimos la duración del vídeo entre los 100 steps del slider
                var videoStep = duracionVideo/100
                // Cambiamos el tiempo del vídeo según se mueve el slider
                video.currentTime = videoStep*slider.value
                
            },false);
}

function lineaVerticalTemp() {
    var imageOffset = 405;
    
            // Duración del vídeo
            var duracionVideo;    
            var video = document.getElementById("video");
            
            setTimeout(function() {
                duracionVideo = video.duration
            }, 5000);
                
            document.getElementById("verticalLineTemp").style.left = imageOffset.toString() + "px";
            
            // Obtenemos el valor del slider
            var slider = document.getElementById("sliderTemp");
            
            slider.addEventListener('oninput', function(){       
                // Vamos desplazando la línea vertical
                if (slider.value==1) 
                    imageOffset = 405
                else
                    imageOffset = 405 + 4.9*parseInt(slider.value)
                document.getElementById("verticalLineTemp").style.left = imageOffset + "px";
                
                // Movemos el vídeo
                // Dividimos la duración del vídeo entre los 100 steps del slider
                var videoStep = duracionVideo/100
                // Cambiamos el tiempo del vídeo según se mueve el slider
                video.currentTime = videoStep*slider.value
                
            },false);
}

function moverLineasPlay() {    
    var imageOffsetGSR = 64;
    var imageOffsetFC = 43;
    var imageOffsetTemp = 405;
    var sliderGSR = document.getElementById("sliderGSR");
    var sliderFC = document.getElementById("sliderFC");
    var sliderTemp = document.getElementById("sliderTemp");
    
    setTimeout(function() {
        var video = document.getElementById("video");
        var duracion = video.duration
        sessionStorage.tiempo_anterior = 0;
        // Recargamos la página por si acaso no se han obtenido bien los datos del vídeo
//        if (isNaN(duracion)) {
//            location.reload();
//        }
        console.log(duracion)
        var tiempoStep = duracion/100;
        var i = 1
        video.ontimeupdate = function() {
            if (video.currentTime >= tiempoStep*i) {      
                imageOffsetGSR = 64 + 4.65*parseInt(sliderGSR.value)
                document.getElementById("verticalLineGSR").style.left = imageOffsetGSR + "px";
                imageOffsetFC = 43 + 4.85*parseInt(sliderFC.value)
                document.getElementById("verticalLineFC").style.left = imageOffsetFC + "px";
                imageOffsetTemp = 405 + 4.9*parseInt(sliderTemp.value)
                document.getElementById("verticalLineTemp").style.left = imageOffsetTemp + "px";
                
//                sliderGSR.value++;
//                sliderFC.value++;
//                sliderTemp.value++;
                sliderGSR.value = (video.currentTime * 100)/duracion
                sliderFC.value = (video.currentTime * 100)/duracion
                sliderTemp.value = (video.currentTime * 100)/duracion
                i++;
            }
            else {
                if (video.currentTime < sessionStorage.tiempo_anterior) {
                    
                    sliderGSR.value = (video.currentTime * 100)/duracion
                    sliderFC.value = (video.currentTime * 100)/duracion
                    sliderTemp.value = (video.currentTime * 100)/duracion
                    
                    imageOffsetGSR = 64 + 4.7*parseInt(sliderGSR.value)
                    document.getElementById("verticalLineGSR").style.right = imageOffsetGSR + "px";
                    imageOffsetFC = 43 + 4.9*parseInt(sliderFC.value)
                    document.getElementById("verticalLineFC").style.right = imageOffsetFC + "px";
                    imageOffsetTemp = 405 + 4.9*parseInt(sliderTemp.value)
                    document.getElementById("verticalLineTemp").style.right = imageOffsetTemp + "px";
                    
                    i = parseInt(((video.currentTime) * 100)/duracion) 
                    if (video.currentTime == 0) {
                        imageOffsetGSR = 64 
                        document.getElementById("verticalLineGSR").style.left = imageOffsetGSR + "px";
                        imageOffsetFC = 43 
                        document.getElementById("verticalLineFC").style.left = imageOffsetFC + "px";
                        imageOffsetTemp = 405 
                        document.getElementById("verticalLineTemp").style.left = imageOffsetTemp + "px";
                    }
                }
            }
            sessionStorage.tiempo_anterior = video.currentTime;
        };
    }, 5000);
}

function exportarExcel() {
    const rows = [["Muestra", "GSR(Ohmios)", "FC(pulsaciones)"],];
    
    var i = 0;
    dataGSR.forEach(function(element) {
        var value = [];
        value.push(i);
        value.push(dataGSR[i]);
        rows.push(value);
        i++;
    });
    
    i = 0;
    dataFC.forEach(function(element) {
        rows[i+1].push(dataFC[i]);
        i++;
    });
    
    let csvContent = "data:text/csv;charset=utf-8,";
    rows.forEach(function(rowArray){
       let row = rowArray.join(",");
       csvContent += row + "\r\n";
    }); 
    
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "valores_graficas.csv");
    link.innerHTML= "";
    document.body.appendChild(link); // Required for FF

    link.click(); // This will download the data file named "my_data.csv".
}

function descargarAudio() {
    
    var link = document.createElement("a");
                
    link.setAttribute("href", audioURI);
    link.setAttribute("download", "audio.mp3");
    link.innerHTML= "";
    document.body.appendChild(link); // Required for FF

    link.click(); // This will download the data file named "my_data.csv".

}

