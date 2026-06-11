$(document).ready(function() {
    // Inicialización de datos financieros base si la memoria está vacía
    if (!localStorage.getItem('wallet_saldo')) {
        localStorage.setItem('wallet_saldo', '1500.00'); 
        localStorage.setItem('wallet_transacciones', JSON.stringify([
            { tipo: 'Depósito', monto: 500, detalle: 'Carga inicial', fecha: '2026-06-01' },
            { tipo: 'Envío', monto: 50, detalle: 'A Juan Pérez', fecha: '2026-06-02' }
        ]));
    }

    // Animación de Entrada
    $('.login-card').fadeIn(1000);

    // Escuchador de Eventos para el formulario
    $('#loginForm').on('submit', function(event) {
        event.preventDefault(); 

        let email = $('#email').val().trim();
        let password = $('#password').val().trim();

        if (email === "" || password === "") {
            $('#errorAlert').removeClass('d-none').hide().fadeIn(400);
        } else {
            $('#errorAlert').addClass('d-none');
            localStorage.setItem('user_session', email);

            $('.login-card').fadeOut(500, function() {
                window.location.href = 'menu.html';
            });
        }
    });
});