<div class="modal fade in" id="detailClubModal" tabindex="-1" role="dialog" style="display: none; padding-left: 17px;">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="detailClubModalLabel"><span class="clubName">Detalhe do Clube</span>
                    <button type="button" class="btn btn-primary btn-circle waves-effect waves-circle waves-float pull-right" onclick="openUserSelector()">
                        <i class="material-icons">person_add</i>
                    </button>
                </h4>
            </div>

            <div class="modal-body">
                <table class="clubUsersDataTable table table-responsive">
                    <thead>
                    <tr>
                        <th>Sócios</th>
                    </tr>
                    </thead>
                    <tbody>{{-- Ajax --}}</tbody>
                </table>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-link waves-effect" data-dismiss="modal">Fechar</button>
            </div>
        </div>
    </div>
</div>