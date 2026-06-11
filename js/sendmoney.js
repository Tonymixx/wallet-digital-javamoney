$(document).ready(function() {
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