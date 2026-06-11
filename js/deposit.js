$(document).ready(function() {
    let session = localStorage.getItem('user_session');
    if (!session) { window.location.href = 'login.html'; return; }

    $('.card-custom').fadeIn(600);

    let saldoActual = parseFloat(localStorage.getItem('wallet_saldo')) || 0;
    $('#saldoActual').text(saldoActual.toFixed(2));

    $('#btnBack').on('click', function() { window.location.href = 'menu.html'; });

    $('#depositForm').on('submit', function(event) {
        event.preventDefault();

        let montoADepositar = parseFloat($('#amount').val());

        if (isNaN(montoADepositar) || montoADepositar <= 0) {
            $('#alertMsg').removeClass('d-none alert-success').addClass('alert-danger').text('Monto inválido.').hide().fadeIn(300);
            return;
        }

        let nuevoSaldo = saldoActual + montoADepositar;
        localStorage.setItem('wallet_saldo', nuevoSaldo.toFixed(2));

        let transacciones = JSON.parse(localStorage.getItem('wallet_transacciones')) || [];
        transacciones.unshift({
            tipo: 'Depósito',
            monto: montoADepositar,
            detalle: 'Depósito de fondos realizado por el usuario',
            fecha: new Date().toISOString().split('T')[0]
        });
        localStorage.setItem('wallet_transacciones', JSON.stringify(transacciones));

        $('button[type="submit"]').attr('disabled', true);
        
        $('#alertMsg').removeClass('d-none alert-danger').addClass('alert-success')
            .text(`¡Depósito exitoso! Has cargado $${montoADepositar.toFixed(2)} correctamente.`).hide().fadeIn(300);

        setTimeout(function() {
            $('.card-custom').fadeOut(400, function() { window.location.href = 'menu.html'; });
        }, 2000);
    });
});