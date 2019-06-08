<div class="modal fade" id="cadastro" role="dialog">
	<div class="modal-dialog modal-sm">
		<!-- Modal content no 1-->
		<div class="modal-content" style="bottom: 150px;">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<h4 class="modal-title text-center form-title">CADASTRE-SE</h4>
			</div>

			<div class="modal-body padtrbl">

				<div class="login-box-body">
					<a href="#" class="fa fa-facebook"></a> <span>ou</span> <a href="#"
						class="fa fa-google"></a>
					<p class="login-box-msg"></p>
					<div class="form-group">
						<form action="save" method="POST" id="cadastroForm">
							<div class="form-group has-feedback">
								<!----- Nome -------------->
								<input class="form-control" placeholder="Nome" id="loginid"
									name="nome" type="text" autocomplete="off" /> <span
									style="display: none; font-weight: bold; position: absolute; color: red; position: absolute; padding: 4px; font-size: 11px; background-color: rgba(128, 128, 128, 0.26); z-index: 17; right: 27px; top: 5px;"
									id="span_loginid"></span>
							</div>
							<div class="form-group has-feedback">
								<!----- Email -------------->
								<input class="form-control" placeholder="Email" id="loginpsw"
									name="email" type="email" autocomplete="off" /> <span
									style="display: none; font-weight: bold; position: absolute; color: grey; position: absolute; padding: 4px; font-size: 11px; background-color: rgba(128, 128, 128, 0.26); z-index: 17; right: 27px; top: 5px;"
									id="span_loginpsw"></span>
							</div>
							<div class="form-group has-feedback">
								<!----- Senha -------------->
								<input class="form-control" placeholder="Senha" id="loginpsw"
									name="senha" type="password" autocomplete="off" /> <span
									style="display: none; font-weight: bold; position: absolute; color: grey; position: absolute; padding: 4px; font-size: 11px; background-color: rgba(128, 128, 128, 0.26); z-index: 17; right: 27px; top: 5px;"
									id="span_loginpsw"></span>
							</div>
							<div class="radio-btn-group">
                        <div class="radio">
                          <input type="radio" name="radio" value="A" checked="checked"  id="click_me"/>
                          <label for="click_me">Aluno</label>
                        </div>
                        <div class="radio">
                          <input type="radio" name="radio" value="P"  id="or_me"/>
                          <label for="or_me">Professor</label>
                        </div>
                      </div>    
							
							
							<div class="row">
								<div class="col-xs-12">
									<button type="submit" class="btn btn-green btn-block btn-flat"
										onclick="userlogin()">Cadastrar</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>

	</div>
</div>