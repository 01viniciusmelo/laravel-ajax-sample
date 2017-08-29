var clubsDataTable;
var clubsDataTableUrl = '/clubes?datatables';
var clubUsersDataTable;
var clubUsersDataTableUrl = '';
$(document).ready(function () {
    clubsDataTable = $('.clubsDataTable').DataTable({
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
        ajax: clubsDataTableUrl,
        mark: true,
        columns: [
            {data: 'name'},
            {
                data: null,
                bSortable: false,
                render: function (data) {
                    return `
                        <button type="button" class="btn btn-xs btn-default waves-effect pull-right table-option" onclick="deleteClub(`+data.id+`)" title="Eliminar">
                            <i class="material-icons">delete_forever</i>
                        </button>
                        <button type="button" class="btn btn-xs btn-default waves-effect pull-right table-option" onclick="detailClub(`+data.id+`)" title="Sócios">
                        <i class="material-icons">people</i>
                        </button>
                        <button type="button" class="btn btn-xs btn-default waves-effect pull-right table-option" onclick="openEditClubModal(`+data.id+`)" title="Editar">
                        <i class="material-icons">mode_edit</i>
                        </button>
                    `;
                }
            }
        ],
    });
    clubUsersDataTable = $('.clubUsersDataTable').DataTable({
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
        ajax: clubUsersDataTableUrl,
        mark: true,
        columns: [
            {data: 'name'}
        ],
    });
});

function deleteClub(id) {
    swal({
        title: "Eliminar Clube",
        text: "Tem certeza que quer eliminar este clube?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Sim, eliminar!",
        closeOnConfirm: false
    }, function () {
        axios.delete('/clubes/'+ id, {})
            .then(function (response) {
                swal("Eliminado!", "O clube foi eliminado com sucesso", "success");

                clubsDataTable.ajax.url(clubsDataTableUrl).load();
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

function detailClub(id) {
    axios.get('/clubes/'+id)
    .then(function (response) {
        let club = response.data.club;
        let detailClubModal = $('#detailClubModal');
        let assocUserModal = $('#addUserToClubModal');
        detailClubModal.find('.clubName').html(club.name);

        clubUsersDataTableUrl = '/usuarios?datatables=true&club=' + id;
        clubUsersDataTable.ajax.url(clubUsersDataTableUrl).load();

        detailClubModal.modal('show');

        assocUserModal.find('input[name=id]').val(club.id);
        axios.get('/usuarios')
            .then(function (response) {
                let users = response.data.users;
                axios.get('/usuarios?club='+club.id)
                    .then(function (response) {
                        let clubUsers = response.data.users;
                        let selectUsers = assocUserModal.find('.multiSelect');
                        selectUsers.html('');

                        $.each(users, function (i, v) {
                            var opt = document.createElement('option');
                            opt.value = v.id;
                            opt.text = v.name;

                            $.each(clubUsers, function (j, k) {
                                if(v.id === k.id){
                                    opt.selected = true;
                                }
                            });

                            selectUsers.append(opt);
                        });

                        selectUsers.multiSelect('refresh');
                    });
            });
    })
    .catch(function (error) {
        console.log(error);
        swal({
            title: "Erro!",
            text: "Falha ao obter detalhes do clube.",
            html: true
        });
    });
}

function openEditClubModal(id) {
    axios.get('/clubes/'+id)
    .then(function (response) {
        let updateClubModal = $('#updateClubModal');
        let club = response.data.club;

        updateClubModal.find('input[name=name]').val(club.name);
        updateClubModal.find('input[name=id]').val(club.id);

        updateClubModal.modal('show');
    })
    .catch(function (error) {
        console.log(error);
        swal({
            title: "Erro!",
            text: "Falha ao obter detalhes do clube.",
            html: true
        });
    })
}

function updateClub() {
    let form = $('#updateClubForm');

    axios.put('/clubes/'+form.find('input[name=id]').val(), form.serialize())
        .then(function (response) {
            swal({
                title: "Sucesso!",
                text: "Clube atualizado com sucesso!",
                timer: 500,
                showConfirmButton: false
            });

            clubsDataTable.ajax.url(clubsDataTableUrl).load();

            $('#updateClubModal').modal('toggle');
        })
        .catch(function (error) {
            axiosErrorHandler(error, '#updateClubModal');
        });

    return false;
}

function openCreateClubForm() {
    // Clear form
    $('#createClubForm').find('input[name=name]').val('');

    // Open modal
    $('#createClubModal').modal('show');
}

function saveNewClub() {
    let form = $('#createClubForm').serialize();

    axios.post('/clubes', form)
    .then(function (response) {
        swal({
            title: "Sucesso!",
            text: "Clube criado com sucesso!",
            timer: 500,
            showConfirmButton: false
        });

        clubsDataTable.ajax.url(clubsDataTableUrl).load();

        $('#createClubModal').modal('toggle');
    })
    .catch(function (error) {
        axiosErrorHandler(error, '#createClubModal');
    })
}

$('#updateClubForm').on('submit', function () {
    updateClub();
    return false;
});

$('#createClubForm').on('submit', function () {
    saveNewClub();
    return false;
});

function openUserSelector() {
    $('#addUserToClubModal').modal('show');
}

function updateClubUsersAssoc() {
    let form = $('#addUserToClubForm');

    axios.put('/assoc-users/'+ form.find('input[name=id]').val(), form.serialize())
        .then(function (response) {
            $('#addUserToClubModal').modal('toggle');
            clubUsersDataTable.ajax.url(clubUsersDataTableUrl).load();
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

