<?use Auth;?>
<!DOCTYPE html>
<html>
  <head>
    <title>PngFree Admin</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Bootstrap -->
    <link href="/css/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <!-- styles -->
    <link href="/css/css/styles.css" rel="stylesheet">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>
  	<div class="header">
	     <div class="container">
	        <div class="row">
	           <div class="col-md-5">
	              <!-- Logo -->
	              <div class="logo">
	                 <h1><a href="index.html">Admin Manage</a></h1>
	              </div>
	           </div>
	           <div class="col-md-5">
	              <div class="row">
	                <div class="col-lg-12">
	                  <!-- <div class="input-group form">
	                       <input type="text" class="form-control" placeholder="Search...">
	                       <span class="input-group-btn">
	                         <button class="btn btn-primary" type="button">Search</button>
	                       </span>
	                  </div> -->
	                </div>
	              </div>
	           </div>
	           <div class="col-md-2">
	              <div class="navbar navbar-inverse" role="banner">
	                  <nav class="collapse navbar-collapse bs-navbar-collapse navbar-right" role="navigation">
	                    <ul class="nav navbar-nav">
	                      <li class="dropdown">
	                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">{{Auth::user()->name}}<b class="caret"></b></a>
	                        <ul class="dropdown-menu animated fadeInUp">
	                          <li><a href="profile.html">Profile</a></li>
	                          <li><a href="javascript:{}" onclick="document.getElementById('logout-form').submit(); return false;">Logout</a></li>
	                          <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                        @csrf
                                    </form>
	                        </ul>
	                      </li>
	                    </ul>
	                  </nav>
	              </div>
	           </div>
	        </div>
	     </div>
	</div>

    <div class="page-content">
    	<div class="row">
		  <div class="col-md-2">
		  	<div class="sidebar content-box" style="display: block;">
                <ul class="nav">
                    <!-- Main menu -->
                    <li class="@yield('current_index')" ><a href="{{route('admin.dashboard')}}"><i class="glyphicon glyphicon-home"></i> Dashboard</a></li>
                    <li class="@yield('current_listUser')"><a href="{{route('admin.listUser')}}"><i class="glyphicon glyphicon-list-alt"></i>List Users</a></li>
                </ul>
             </div>
		  </div>
		  <div class="col-md-10">
		  	@yield('content')
		  </div>
		</div>
    </div>

    <footer>
         <div class="container">
         
            <div class="copy text-center">
               Copyright 2014 <a href='#'>Website</a>
            </div>
            
         </div>
      </footer>

    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://code.jquery.com/jquery.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="/css/bootstrap/js/bootstrap.min.js"></script>
    <!-- <script src="js/custom.js"></script> -->
  </body>
</html>