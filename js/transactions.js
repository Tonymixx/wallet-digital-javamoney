$(document).ready(function() {
    let session = localStorage.getItem('user_session');
    if (!session) { window.location.href = 'login.html'; return; }

    $('.card-custom').fadeIn(600);

    $('#btnBack').on('click', function() { window.location.href = 'menu.html'; });

    let transacciones = JSON.parse(localStorage.getItem('wallet_transacciones')) || [];

    function cargarTabla(filtro = 'Todos') {
        let tbody = $('#transactionTableBody');
        tbody.empty(); 
        
        let transaccionesFiltradas = transacciones.filter(t => {
            return filtro === 'Todos' || t.tipo === filtro;
        });

        if (transaccionesFiltradas.length === 0) {
            $('#emptyState').removeClass('d-none');
            $('table').addClass('d-none');
            return;
        } else {
            $('#emptyState').addClass('d-none');
            $('table').removeClass('d-none');
        }

        $.each(transaccionesFiltradas, function(index, t) {
            let badgeClass = t.tipo === 'Depósito' ? 'badge-deposit' : 'badge-send';
            let sign = t.tipo === 'Depósito' ? '+' : '-';
            let amountColor = t.tipo === 'Depósito' ? 'text-success' : 'text-danger';

            let fila = `
                <tr>
                    <td><i class="bi bi-calendar3 me-2 text-muted"></i>${t.fecha}</td>
                    <td><span class="badge ${badgeClass} px-3 py-2 fw-bold">${t.tipo}</span></td>
                    <td class="text-secondary small fw-medium">${t.detalle}</td>
                    <td class="text-end fw-bold ${amountColor}">${sign} $${parseFloat(t.monto).toFixed(2)}</td>
                </tr>
            `;
            tbody.append(fila);
        });
    }

    cargarTabla();

    $('.filter-btn').on('click', function() {
        $('.filter-btn').removeClass('active');
        $(this).addClass('active');

        let filtroSeleccionado = $(this).attr('data-filter');

        $('#transactionTableBody').fadeOut(150, function() {
            cargarTabla(filtroSeleccionado);
            $(this).fadeIn(150);
        });
    });
});