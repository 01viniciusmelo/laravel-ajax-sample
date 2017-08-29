<!DOCTYPE html>
<html>

@include('layouts.partials.head')

<body class="theme-red">
<!-- Page Loader -->
<div class="page-loader-wrapper">
    <div class="loader">
        <div class="preloader">
            <div class="spinner-layer pl-red">
                <div class="circle-clipper left">
                    <div class="circle"></div>
                </div>
                <div class="circle-clipper right">
                    <div class="circle"></div>
                </div>
            </div>
        </div>
        <p>Carregando...</p>
    </div>
</div>
<!-- #END# Page Loader -->
<!-- Overlay For Sidebars -->
<div class="overlay"></div>
<!-- #END# Overlay For Sidebars -->

<!-- Top Bar -->
@include('layouts.partials.navbar')
<!-- #Top Bar -->
<section>
    <!-- Left Sidebar -->
    {{--@include('layouts.partials.leftSidebar')--}}
    <!-- #END# Left Sidebar -->
    <!-- Right Sidebar -->
    {{--@include('layouts.partials.rightSidebar')--}}
    <!-- #END# Right Sidebar -->
</section>

<section class="content">
    <div class="container-fluid">
    @yield('content')
    </div>
</section>

{{-- Global includes --}}
@include('clubs.modals.create')
@include('clubs.modals.detail')
@include('clubs.modals.update')
@include('clubs.modals.addUser')

@include('users.modals.create')
@include('users.modals.detail')
@include('users.modals.update')
@include('users.modals.addClub')

@include('layouts.partials.scripts')
</body>

</html>