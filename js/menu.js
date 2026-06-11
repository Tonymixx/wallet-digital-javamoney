$(document).ready(function() {
    let session = localStorage.getItem('user_session');
    if (!session) {
        window.location.href = 'login.html'; 
        return;
    }

    $('#userEmail').text(session);

    let saldo = parseFloat(localStorage.getItem('wallet_saldo')).toFixed(2);
    $('#saldoActual').text(saldo);

    $('.main-container').fadeIn(800);

    $('#goToDeposit').on('click', function() { window.location.href = 'deposit.html'; });
    $('#goToSendMoney').on('click', function() { window.location.href = 'sendmoney.html'; });
    $('#goToTransactions').on('click', function() { window.location.href = 'transactions.html'; });

    $('#btnLogout').on('click', function() {
        $('#logoutModal').modal('show');
    });

    $('#confirmLogout').on('click', function() {
        localStorage.removeItem('user_session'); 
        $('.main-container').fadeOut(400, function() {
            window.location.href = 'login.html';
        });
    });
});