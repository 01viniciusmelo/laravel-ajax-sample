var usersDataTable;
var usersDataTableUrl = '/usuarios?datatables';
var userClubsDataTable;
var userClubsDataTableUrl = '';

$(document).ready(function () {
    usersDataTable = $('.usersDataTable').DataTable({
        dom: 'lfrtip',
        responsive: true,
        language: {
            "sEmptyTable": "Nenhum registro encontrado",
            "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
            "sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
            "sInfoFiltered": "(Filtrados de _MAX_ registros)",
            "sInfoPostFix": "",
            "sInfoThousands": ".",
            "sLengthMenu": "_MENU_ resultados por página",
            "sLoadingRecords": "Carregando...",
            "sProcessing": "Processando...",
            "sZeroRecords": "Nenhum registro encontrado",
            "sSearch": "",
            "sSearchPlaceholder": "Pesquisar",
            "oPaginate": {
                "sNext": "Próximo",
                "sPrevious": "Anterior",
                "sFirst": "Primeiro",
                "sLast": "Último"
            },
            "oAria": {
                "sSortAscending": ": Ordenar colunas de forma ascendente",
                "sSortDescending": ": Ordenar colunas de forma descendente"
            }
        },
        ajax: usersDataTableUrl,
        mark: true,
        columns: [
            {data: 'name'},
            {
                data: null,
                bSortable: false,
                render: function (data) {
                    return `
                        <button type="button" class="btn btn-xs btn-default waves-effect pull-right table-option" onclick="deleteUser(`+data.id+`)" title="Eliminar">
                            <i class="material-icons">delete_forever</i>
                        </button>
                        <button type="button" class="btn btn-xs btn-default waves-effect pull-right table-option" onclick="detailUser(`+data.id+`)" title="Clubes">
                        <i class="material-icons">security</i>
                        </button>
                        <button type="button" class="btn btn-xs btn-default waves-effect pull-right table-option" onclick="openEditUserModal(`+data.id+`)" title="Editar">
                        <i class="material-icons">mode_edit</i>
                        </button>
                    `;
                }
            }
        ],
    });

    userClubsDataTable = $('.userClubsDataTable').DataTable({
        dom: 'frtip',
        responsive: true,
        language: {
            "sEmptyTable": "Nenhum registro encontrado",
            "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
            "sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
            "sInfoFiltered": "(Filtrados de _MAX_ registros)",
            "sInfoPostFix": "",
            "sInfoThousands": ".",
            "sLengthMenu": "_MENU_ resultados por página",
            "sLoadingRecords": "Carregando...",
            "sProcessing": "Processando...",
            "sZeroRecords": "Nenhum registro encontrado",
            "sSearch": "",
            "sSearchPlaceholder": "Pesquisar",
            "oPaginate": {
                "sNext": "Próximo",
                "sPrevious": "Anterior",
                "sFirst": "Primeiro",
                "sLast": "Último"
            },
            "oAria": {
                "sSortAscending": ": Ordenar colunas de forma ascendente",
                "sSortDescending": ": Ordenar colunas de forma descendente"
            }
        },
        ajax: userClubsDataTableUrl,
        mark: true,
        columns: [
            {data: 'name'}
        ],
    });
});

function deleteUser(id) {
    swal({
        title: "Eliminar Sócio",
        text: "Tem certeza que quer eliminar este sócio?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Sim, eliminar!",
        closeOnConfirm: false
    }, function () {
        axios.delete('/usuarios/'+ id, {})
            .then(function (response) {
                swal("Eliminado!", "O sócio foi eliminado com sucesso", "success");

                usersDataTable.ajax.url(usersDataTableUrl).load();
            })
            .catch(function (error) {
                swal({
                    title: "Erro!",
                    text: "Ocorreu um erro durante a eliminação. Tente recarregar a página.",
                    html: true
                });
            })

    });
}

function detailUser(id) {
    axios.get('/usuarios/'+id)
        .then(function (response) {
            let user = response.data.user;
            let detailUserModal = $('#detailUserModal');
            let assocClubModal = $('#addClubToUserModal');

            detailUserModal.find('.userName').html(user.name);

            userClubsDataTableUrl = '/clubes?datatables=true&user=' + user.id;
            userClubsDataTable.ajax.url(userClubsDataTableUrl).load();

            detailUserModal.modal('show');

            assocClubModal.find('input[name=id]').val(user.id);

            axios.get('/clubes')
            .then(function (response) {
                let clubs = response.data.clubs;
                axios.get('/clubes?user='+user.id)
                .then(function (response) {
                    let userClubs = response.data.clubs;
                    let selectClubs = assocClubModal.find('.multiSelect');
                    selectClubs.html('');

                    $.each(clubs, function (i, v) {
                        var opt = document.createElement('option');
                        opt.value = v.id;
                        opt.text = v.name;

                        $.each(userClubs, function (j, k) {
                            if(v.id === k.id){
                                opt.selected = true;
                            }
                        });

                        selectClubs.append(opt);
                    });

                    selectClubs.multiSelect('refresh');


                });
            });
        })
        .catch(function (error) {
            console.log(error);
            swal({
                title: "Erro!",
                text: "Falha ao obter detalhes do sócio.",
                html: true
            });
        });
}

function openEditUserModal(id) {
    axios.get('/usuarios/'+id)
        .then(function (response) {
            let updateUserModal = $('#updateUserModal');
            let user = response.data.user;

            updateUserModal.find('input[name=name]').val(user.name);
            updateUserModal.find('input[name=id]').val(user.id);

            updateUserModal.modal('show');
        })
        .catch(function (error) {
            console.log(error);
            swal({
                title: "Erro!",
                text: "Falha ao obter detalhes do sócio.",
                html: true
            });
        })
}

function updateUser() {
    let form = $('#updateUserForm');

    axios.put('/usuarios/'+form.find('input[name=id]').val(), form.serialize())
        .then(function (response) {

            swal("Eliminado!", "O sócio foi atualizado com sucesso", "success");

            usersDataTable.ajax.url(usersDataTableUrl).load();

            $('#updateUserModal').modal('toggle');
        })
        .catch(function (error) {
            axiosErrorHandler(error, '#updateUserModal');
        });

    return false;
}

function openCreateUserForm() {
    // Clear form
    $('#createUserForm').find('input[name=name]').val('');

    // Open modal
    $('#createUserModal').modal('show');
}

function saveNewUser() {
    let form = $('#createUserForm').serialize();

    axios.post('/usuarios', form)
        .then(function (response) {
            swal("Eliminado!", "O sócio foi criado com sucesso", "success");

            usersDataTable.ajax.url(usersDataTableUrl).load();

            $('#createUserModal').modal('toggle');
        })
        .catch(function (error) {
            axiosErrorHandler(error, '#createUserModal');
        })
}

$('#updateUserForm').on('submit', function () {
    updateUser();
    return false;
});

$('#createUserForm').on('submit', function () {
    saveNewUser();
    return false;
});

function openClubSelector(id) {
    $('#addClubToUserModal').modal('show');
}

function updateUserClubsAssoc() {
    let form = $('#addClubToUserForm');

    axios.put('/assoc-club/'+ form.find('input[name=id]').val(), form.serialize())
    .then(function (response) {
        $('#addClubToUserModal').modal('toggle');
        userClubsDataTable.ajax.url(userClubsDataTableUrl).load();
    })
    .catch(function (error) {
        console.log(error);
        swal({
            title: "Erro!",
            text: "Falha ao assossiar.",
            html: true
        });
    });
}


