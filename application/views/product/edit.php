<!doctype html>
<html lang="en">

<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta http-equiv="Content-Language" content="en">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
	<title>Ubah Produk</title>
	<meta name="viewport"
		  content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, shrink-to-fit=no"/>
	<meta name="description" content="Build whatever layout you need with our Architect framework.">
	<meta name="msapplication-tap-highlight" content="no">
	<script src="http://pusdikarmed.kodiklat-tniad.mil.id/pusdikarmed/js/jquery.js"></script>
	<script src="http://pusdikarmed.kodiklat-tniad.mil.id/pusdikarmed/js/global.js"></script>
	<script src="http://pusdikarmed.kodiklat-tniad.mil.id/pusdikarmed/js/moment.js"></script>
	<script src="https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.4.3/build/ol.js"></script>
	<script src="http://pusdikarmed.kodiklat-tniad.mil.id/pusdikarmed/js/edit-product.js"></script>
	<!--
	=========================================================
	* ArchitectUI HTML Theme Dashboard - v1.0.0
	=========================================================
	* Product Page: https://dashboardpack.com
	* Copyright 2019 DashboardPack (https://dashboardpack.com)
	* Licensed under MIT (https://github.com/DashboardPack/architectui-html-theme-free/blob/master/LICENSE)
	=========================================================
	* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
	-->
	<link href="http://pusdikarmed.kodiklat-tniad.mil.id/pusdikarmed/main.css" rel="stylesheet">
</head>
<body>
<div class="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header">
	<div class="app-header header-shadow">
		<div class="app-header__logo">
			<img src="http://pusdikarmed.kodiklat-tniad.mil.id/pusdikarmed/assets/images/icon.png" width="50px" height="30px">
			<div class="header__pane ml-auto">
				<div>
					<button type="button" class="hamburger close-sidebar-btn hamburger--elastic"
							data-class="closed-sidebar">
                            <span class="hamburger-box">
                                <span class="hamburger-inner"></span>
                            </span>
					</button>
				</div>
			</div>
		</div>
		<div class="app-header__mobile-menu">
			<div>
				<button type="button" class="hamburger hamburger--elastic mobile-toggle-nav">
                        <span class="hamburger-box">
                            <span class="hamburger-inner"></span>
                        </span>
				</button>
			</div>
		</div>
		<div class="app-header__menu">
                <span>
                    <button type="button"
							class="btn-icon btn-icon-only btn btn-primary btn-sm mobile-toggle-header-nav">
                        <span class="btn-icon-wrapper">
                            <i class="fa fa-ellipsis-v fa-w-6"></i>
                        </span>
                    </button>
                </span>
		</div>
		<div class="app-header__content">
			<div class="app-header-left">
				<ul class="header-menu nav">
					<li class="nav-item">
						<a href="http://pusdikarmed.kodiklat-tniad.mil.id/pusdikarmed/admin" class="nav-link">
							<i class="nav-link-icon fa fa-users-cog"> </i>
							Admin
						</a>
					</li>
					<li class="btn-group nav-item">
						<a href="http://pusdikarmed.kodiklat-tniad.mil.id/pusdikarmed/user" class="nav-link">
							<i class="nav-link-icon fa fa-user"></i>
							User
						</a>
					</li>
					<li class="btn-group nav-item">
						<a href="http://pusdikarmed.kodiklat-tniad.mil.id/pusdikarmed/banner" class="nav-link">
							<i class="nav-link-icon fa fa-bookmark"></i>
							Banner
						</a>
					</li>
					<li class="btn-group nav-item">
						<a href="http://pusdikarmed.kodiklat-tniad.mil.id/pusdikarmed/store" class="nav-link">
							<i class="nav-link-icon fa fa-store"></i>
							Toko
						</a>
					</li>
					<li class="btn-group nav-item">
						<a href="http://pusdikarmed.kodiklat-tniad.mil.id/pusdikarmed/product" class="nav-link">
							<i class="nav-link-icon fa fa-box-open"></i>
							Produk
						</a>
					</li>
					<li class="btn-group nav-item">
						<a href="http://pusdikarmed.kodiklat-tniad.mil.id/pusdikarmed/news" class="nav-link">
							<i class="nav-link-icon fa fa-newspaper"></i>
							Berita
						</a>
					</li>
					<li class="btn-group nav-item">
						<a href="http://pusdikarmed.kodiklat-tniad.mil.id/pusdikarmed/message" class="nav-link">
							<i class="nav-link-icon fa fa-envelope"></i>
							Pesan
						</a>
					</li>
					<li class="btn-group nav-item">
						<a href="http://pusdikarmed.kodiklat-tniad.mil.id/pusdikarmed/settings" class="nav-link">
							<i class="nav-link-icon fa fa-tools"></i>
							Pengaturan
						</a>
					</li>
					<li class="dropdown nav-item">
						<a href="http://pusdikarmed.kodiklat-tniad.mil.id/pusdikarmed/logout" class="nav-link">
							<i class="nav-link-icon fa fa-sign-out-alt"></i>
							Logout
						</a>
					</li>
				</ul>
			</div>
			<div class="app-header-right">
				<div class="header-btn-lg pr-0">
					<div class="widget-content p-0">
						<div class="widget-content-wrapper">
							<div class="widget-content-left">
								<div class="btn-group">
									<a data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
									   class="p-0 btn">
										<img width="42" height="42" class="rounded-circle" src="http://pusdikarmed.kodiklat-tniad.mil.id/pusdikarmed/images/profile_picture.png" alt="" style="border-radius: 21;">
										<i class="fa fa-angle-down ml-2 opacity-8"></i>
									</a>
									<div tabindex="-1" role="menu" aria-hidden="true"
										 class="dropdown-menu dropdown-menu-right">
										<button onclick="logout()" type="button" tabindex="0" class="dropdown-item">Logout</button>
									</div>
								</div>
							</div>
							<div class="widget-content-left  ml-3 header-user-info">
								<div id="admin-name" class="widget-heading">
								</div>
								<div id="admin-email" class="widget-subheading">
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="app-main">
		<div class="app-sidebar sidebar-shadow">
			<div class="app-header__logo">
				<img src="http://pusdikarmed.kodiklat-tniad.mil.id/pusdikarmed/assets/images/icon.png" width="50px" height="30px">
				<div class="header__pane ml-auto">
					<div>
						<button type="button" class="hamburger close-sidebar-btn hamburger--elastic"
								data-class="closed-sidebar">
                                    <span class="hamburger-box">
                                        <span class="hamburger-inner"></span>
                                    </span>
						</button>
					</div>
				</div>
			</div>
			<div class="app-header__mobile-menu">
				<div>
					<button type="button" class="hamburger hamburger--elastic mobile-toggle-nav">
                                <span class="hamburger-box">
                                    <span class="hamburger-inner"></span>
                                </span>
					</button>
				</div>
			</div>
			<div class="app-header__menu">
                        <span>
                            <button type="button"
									class="btn-icon btn-icon-only btn btn-primary btn-sm mobile-toggle-header-nav">
                                <span class="btn-icon-wrapper">
                                    <i class="fa fa-ellipsis-v fa-w-6"></i>
                                </span>
                            </button>
                        </span>
			</div>
			<div class="scrollbar-sidebar">
				<div class="app-sidebar__inner">
					<ul class="vertical-nav-menu">
						<li>
						<li>
							<a href="http://pusdikarmed.kodiklat-tniad.mil.id/pusdikarmed/admin">
								<i class="metismenu-icon pe-7s-users"></i>
								Admin
							</a>
						</li>
						<li>
							<a href="http://pusdikarmed.kodiklat-tniad.mil.id/pusdikarmed/user">
								<i class="metismenu-icon pe-7s-users"></i>
								User
							</a>
						</li>
						<li>
							<a href="http://pusdikarmed.kodiklat-tniad.mil.id/pusdikarmed/banner">
								<i class="metismenu-icon pe-7s-flag"></i>
								Banner
							</a>
						</li>
						<li>
							<a href="http://pusdikarmed.kodiklat-tniad.mil.id/pusdikarmed/store">
								<i class="metismenu-icon pe-7s-shopbag"></i>
								Toko
							</a>
						</li>
						<li class="mm-active">
							<a href="http://pusdikarmed.kodiklat-tniad.mil.id/pusdikarmed/product">
								<i class="metismenu-icon pe-7s-cart"></i>
								Produk
							</a>
						</li>
						<li>
							<a href="http://pusdikarmed.kodiklat-tniad.mil.id/pusdikarmed/news">
								<i class="metismenu-icon pe-7s-news-paper"></i>
								Berita
							</a>

						<li>
							<a href="http://pusdikarmed.kodiklat-tniad.mil.id/pusdikarmed/message">
								<i class="metismenu-icon pe-7s-mail-open"></i>
								Pesan
							</a>
						</li>
						<li>
							<a href="http://pusdikarmed.kodiklat-tniad.mil.id/pusdikarmed/settings">
								<i class="metismenu-icon pe-7s-settings"></i>
								Pengaturan
							</a>
						</li>
						<li>
							<a href="http://pusdikarmed.kodiklat-tniad.mil.id/pusdikarmed/logout">
								<i class="metismenu-icon pe-7s-close-circle"></i>
								Keluar
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="app-main__outer">
			<div class="app-main__inner">
				<div class="app-page-title">
					<div class="page-title-wrapper">
						<div class="page-title-heading">
							<div class="page-title-icon">
								<i class="pe-7s-graph text-success">
								</i>
							</div>
							<div>Ubah Produk
							</div>
						</div>
					</div>
				</div>
				<div class="tab-content">
					<div class="tab-pane tabs-animation fade show active" id="tab-content-0" role="tabpanel">
						<div class="main-card mb-3 card">
							<div class="card-body"><h5 class="card-title">UBAH PRODUK</h5>
								<div class="position-relative form-group"><label for="text" class="">Kode</label>
									<input name="text" id="code" placeholder="Masukkan kode"
										   type="text" class="form-control">
								</div>
								<div class="position-relative form-group"><label for="text" class="">Merk</label>
									<input name="text" id="brand" placeholder="Masukkan merk"
										   type="text" class="form-control">
								</div>
								<div class="position-relative form-group"><label for="text" class="">Tipe</label>
									<input name="text" id="type" placeholder="Masukkan tipe"
										   type="text" class="form-control">
								</div>
								<div class="position-relative form-group"><label for="text" class="">Pembuat</label>
									<input name="text" id="maker" placeholder="Masukkan pembuat"
										   type="text" class="form-control">
								</div>
								<div class="position-relative form-group"><label for="text" class="">Deskripsi</label>
									<input name="text" id="description" placeholder="Masukkan deskripsi"
										   type="text" class="form-control">
								</div>
								<div class="position-relative form-group"><label for="text" class="">Tanggal Produksi</label>
									<input name="text" id="production-date" placeholder="Masukkan tanggal produksi"
										   type="date" class="form-control">
								</div>
								<div class="position-relative form-group"><label for="text" class="">Tanggal Kadaluwarsa</label>
									<input name="text" id="expiry" placeholder="Masukkan tanggal kadaluwarsa"
										   type="date" class="form-control">
								</div>
								<div class="position-relative form-group"><label for="text" class="">Kode Pembelian</label>
									<input name="text" id="purchase-code" placeholder="Masukkan kode pembelian"
										   type="text" class="form-control">
								</div>
								<div class="position-relative form-group"><label for="text" class="">Tanggal Pembelian</label>
									<input name="text" id="purchase-date" placeholder="Masukkan tanggal pembelian"
										   type="date" class="form-control">
								</div>
								<div class="position-relative form-group"><label for="text" class="">Nama Toko</label>
									<select id="stores" class="form-control">
										<option>Pilih Toko</option>
									</select>
								</div>
								<div class="position-relative form-group"><label for="text" class="">No. HP/Email Toko</label>
									<input name="text" id="store-phone-email" placeholder="Masukkan nomor HP atau email toko"
										   type="text" class="form-control">
								</div>
								<div class="position-relative form-group"><label for="text" class="">Masa Berlaku (Bulan)</label>
									<input name="text" id="warranty" placeholder="Masukkan masa berlaku"
										   type="number" class="form-control">
								</div>
								<div class="position-relative form-group"><label for="text" class="">Status Layanan</label>
									<input name="text" id="service-status" placeholder="Masukkan status layanan"
										   type="text" class="form-control">
								</div>
								<div class="position-relative form-group"><label class="">Posisi</label>
									<div id="map" style="width: 100%; height: 400px;"></div>
								</div>
								<button class="mt-2 btn btn-primary" style="width: 100%;" onclick="save()">Simpan
								</button>
								<button class="mt-2 btn btn-danger" style="width: 100%;" onclick="window.history.back()">Batal
								</button>
							</div>
						</div>
					</div>
					<div class="tab-pane tabs-animation fade" id="tab-content-1" role="tabpanel">
						<div class="main-card mb-3 card">
							<div class="card-body"><h5 class="card-title">Grid</h5>
								<form class="">
									<div class="position-relative row form-group"><label for="exampleEmail"
																						 class="col-sm-2 col-form-label">Email</label>
										<div class="col-sm-10"><input name="email" id="exampleEmail"
																	  placeholder="with a placeholder" type="email"
																	  class="form-control"></div>
									</div>
									<div class="position-relative row form-group"><label for="examplePassword"
																						 class="col-sm-2 col-form-label">Password</label>
										<div class="col-sm-10"><input name="password" id="examplePassword"
																	  placeholder="password placeholder" type="password"
																	  class="form-control"></div>
									</div>
									<div class="position-relative row form-group"><label for="exampleSelect"
																						 class="col-sm-2 col-form-label">Select</label>
										<div class="col-sm-10"><select name="select" id="exampleSelect"
																	   class="form-control"></select></div>
									</div>
									<div class="position-relative row form-group"><label for="exampleSelectMulti"
																						 class="col-sm-2 col-form-label">Select
											Multiple</label>
										<div class="col-sm-10"><select multiple="" name="selectMulti"
																	   id="exampleSelectMulti"
																	   class="form-control"></select></div>
									</div>
									<div class="position-relative row form-group"><label for="exampleText"
																						 class="col-sm-2 col-form-label">Text
											Area</label>
										<div class="col-sm-10"><textarea name="text" id="exampleText"
																		 class="form-control"></textarea></div>
									</div>
									<div class="position-relative row form-group"><label for="exampleFile"
																						 class="col-sm-2 col-form-label">File</label>
										<div class="col-sm-10"><input name="file" id="exampleFile" type="file"
																	  class="form-control-file">
											<small class="form-text text-muted">This is some placeholder block-level
												help text for the above input. It's a bit lighter and easily wraps to a
												new line.</small>
										</div>
									</div>
									<fieldset class="position-relative row form-group">
										<legend class="col-form-label col-sm-2">Radio Buttons</legend>
										<div class="col-sm-10">
											<div class="position-relative form-check"><label
														class="form-check-label"><input name="radio2" type="radio"
																						class="form-check-input"> Option one
													is this and that—be sure to include why it's great</label></div>
											<div class="position-relative form-check"><label
														class="form-check-label"><input name="radio2" type="radio"
																						class="form-check-input"> Option two
													can be something else and selecting it will deselect option
													one</label></div>
											<div class="position-relative form-check disabled"><label
														class="form-check-label"><input name="radio2" disabled=""
																						type="radio"
																						class="form-check-input"> Option
													three is disabled</label></div>
										</div>
									</fieldset>
									<div class="position-relative row form-group"><label for="checkbox2"
																						 class="col-sm-2 col-form-label">Checkbox</label>
										<div class="col-sm-10">
											<div class="position-relative form-check"><label
														class="form-check-label"><input id="checkbox2" type="checkbox"
																						class="form-check-input"> Check me
													out</label></div>
										</div>
									</div>
									<div class="position-relative row form-check">
										<div class="col-sm-10 offset-sm-2">
											<button class="btn btn-secondary">Submit</button>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<input id="admin-id" type="hidden" value="<?php echo $adminID; ?>">
<input id="product-id" type="hidden" value="<?php echo $productID; ?>">
<script type="text/javascript" src="http://pusdikarmed.kodiklat-tniad.mil.id/pusdikarmed/assets/scripts/main.js"></script>
</body>
</html>
