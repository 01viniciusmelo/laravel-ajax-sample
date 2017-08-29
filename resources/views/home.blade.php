@extends('layouts.app')

@section('content')
    <div class="row clearfix">
        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
            <div class="card">
                <div class="header">
                    <h2>Sócios</h2>
                    <ul class="header-dropdown m-r--5">
                        <li class="dropdown">
                            <a href="javascript:void(0);"
                               data-toggle="tooltip"
                               data-placement="left"
                               title="Adicionar Sócio"
                                onclick="openCreateUserForm()">
                                <i class="material-icons">add</i>
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="body">
                    <table class="usersDataTable table table-responsive">
                        <thead>
                        <tr>
                            <th>Sócios</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>{{-- Datatables plugin --}}</tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
            <div class="card">
                <div class="header">
                    <h2>Clubes</h2>
                    <ul class="header-dropdown m-r--5">
                        <li class="dropdown">
                            <a href="javascript:void(0);"
                               data-toggle="tooltip"
                               data-placement="left"
                               title="Adicionar Club"
                                onclick="openCreateClubForm()">
                                <i class="material-icons">add</i>
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="body homeCardBody">
                    <table class="clubsDataTable table table-responsive">
                        <thead>
                        <tr>
                            <th>Clubes</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>{{-- Datatables plugin --}}</tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
@endsection
