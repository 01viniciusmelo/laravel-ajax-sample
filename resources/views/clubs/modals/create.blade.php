<div class="modal fade in" id="createClubModal" tabindex="-1" role="dialog" style="display: none; padding-left: 17px;">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="createClubModalLabel">Novo Clube</h4>
            </div>

            <div class="modal-body">
                <div class="alert bg-red alert-dismissible validationAlert" role="alert" style="display: none">
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button>
                    <div class="validationAlertContent">
                        Mensagem de erro
                    </div>
                </div>
            {!! Form::open(['url' => '', 'id' => 'createClubForm']) !!}
                <div class="row">
                    <div class="col-sm-12">
                        <div class="form-group">
                            <div class="form-line">
                                <label for="">Nome do Clube</label>
                                <input type="text" name="name" class="form-control" placeholder="Nome do clube">
                            </div>
                        </div>
                    </div>
                </div>
            {!! Form::close() !!}
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-link waves-effect" onclick="saveNewClub()">Salvar</button>
                <button type="button" class="btn btn-link waves-effect" data-dismiss="modal">Cancelar</button>
            </div>
        </div>
    </div>
</div>