<div class="modal fade in" id="addUserToClubModal" tabindex="-1" role="dialog" style="display: none; padding-left: 17px;">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="addUserToClubModalLabel">Agregar sócios</h4>
            </div>

            <div class="modal-body">
                <div class="alert bg-red alert-dismissible validationAlert" role="alert" style="display: none">
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button>
                    <div class="validationAlertContent">
                        Mensagem de erro
                    </div>
                </div>
            {!! Form::open(['url' => '', 'id' => 'addUserToClubForm']) !!}
                {!! Form::hidden('id', null) !!}
                <div class="row">
                    <div class="col-md-12">
                        <a class="waves-effect waves-light btn blue" onclick="selectAllRoles('optgroup2')"> Todos </a>
                        <a class="waves-effect waves-light btn blue" onclick="deselectAllRoles('optgroup2')"> Nenhum </a>
                    </div>
                </div>
                <select id="optgroup2" name="users[]" class="ms multiSelect" multiple="multiple">
                    {{-- Ajax populated --}}
                </select>
            {!! Form::close() !!}
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-link waves-effect" onclick="updateClubUsersAssoc()">Salvar</button>
                <button type="button" class="btn btn-link waves-effect" data-dismiss="modal">Cancelar</button>
            </div>
        </div>
    </div>
</div>