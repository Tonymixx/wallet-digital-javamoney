$(document).ready(function() {
    // 1. Cargar la lista de contactos inmediatamente al abrir la pantalla
    loadContacts();

    // 2. Escuchar el clic para guardar un nuevo contacto
    $('#btnSaveContact').on('click', function() {
        const name = $('#contactName').val().trim();
        const email = $('#contactEmail').val().trim();

        // Validación de campos vacíos
        if (name === '' || email === '') {
            alert('Por favor, ingresa el nombre y el correo del contacto.');
            return;
        }

        // Obtener contactos de LocalStorage o inicializar array vacío
        let contacts = JSON.parse(localStorage.getItem('wallet_contacts')) || [];

        // Validar que el contacto no exista previamente mediante el correo
        const contactExists = contacts.some(c => c.email === email);
        if (contactExists) {
            alert('Este correo electrónico ya está registrado en tus contactos.');
            return;
        }

        // Guardar el nuevo contacto en la lista
        contacts.push({ name: name, email: email });
        localStorage.setItem('wallet_contacts', JSON.stringify(contacts));

        // Limpiar los inputs y refrescar el componente visual <select>
        $('#contactName').val('');
        $('#contactEmail').val('');
        loadContacts();
        alert('¡Contacto guardado exitosamente!');
    });

    // 3. Función para leer LocalStorage y renderizar los contactos en el <select>
    function loadContacts() {
        let contacts = JSON.parse(localStorage.getItem('wallet_contacts')) || [];
        const $select = $('#contactSelect');
        
        // Limpiar opciones anteriores dejando solo la primera por defecto
        $select.html('<option value="">-- Selecciona para autocompletar --</option>');

        // Insertar cada contacto de la lista
        contacts.forEach(contact => {
            $select.append(`<option value="${contact.email}">${contact.name} (${contact.email})</option>`);
        });
    }

    // 4. Detectar cuando el usuario elige un contacto y autocompletar el destinatario
    $('#contactSelect').on('change', function() {
        const selectedEmail = $(this).val();
        if (selectedEmail) {
            // IMPORTANTE: Cambia '#recipient' por el ID real que tenga el input 
            // de destinatario en tu formulario de envío original
            $('#recipient').val(selectedEmail); 
        }
    });
    
    let session = localStorage.getItem('user_session');
    if (!session) { window.location.href = 'login.html'; return; }

    $('.card-custom').fadeIn(600);

    let saldoActual = parseFloat(localStorage.getItem('wallet_saldo')) || 0;
    $('#saldoDisponible').text(saldoActual.toFixed(2));

    $('#btnBack').on('click', function() { window.location.href = 'menu.html'; });

    $('#sendMoneyForm').on('submit', function(event) {
        event.preventDefault();

        let destinatario = $('#recipient').val().trim();
        let montoAEnviar = parseFloat($('#amount').val());

        if (destinatario === "" || isNaN(montoAEnviar) || montoAEnviar <= 0) {
            mostrarAlerta('danger', 'Por favor, ingresa datos correctos.');
            return;
        }

        if (montoAEnviar > saldoActual) {
            mostrarAlerta('danger', 'Fondos insuficientes para completar la operación.');
            return;
        }

        let nuevoSaldo = saldoActual - montoAEnviar;
        localStorage.setItem('wallet_saldo', nuevoSaldo.toFixed(2));

        let transacciones = JSON.parse(localStorage.getItem('wallet_transacciones')) || [];
        transacciones.unshift({
            tipo: 'Envío',
            monto: montoAEnviar,
            detalle: `Transferencia enviada a: ${destinatario}`,
            fecha: new Date().toISOString().split('T')[0]
        });
        localStorage.setItem('wallet_transacciones', JSON.stringify(transacciones));

        $('button[type="submit"]').attr('disabled', true);
        mostrarAlerta('success', `¡Transferencia exitosa! Has enviado $${montoAEnviar.toFixed(2)} a ${destinatario}.`);

        setTimeout(function() {
            $('.card-custom').fadeOut(400, function() { window.location.href = 'menu.html'; });
        }, 2000);
    });

    function mostrarAlerta(tipo, mensaje) {
        let alertBox = $('#alertMsg');
        alertBox.removeClass('d-none alert-success alert-danger');
        alertBox.addClass(tipo === 'success' ? 'alert-success' : 'alert-danger').text(mensaje).hide().fadeIn(300);
    }
});