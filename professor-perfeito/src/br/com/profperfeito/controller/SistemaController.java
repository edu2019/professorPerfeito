package br.com.profperfeito.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class SistemaController {

	@RequestMapping("/")
	public String olaMundo() {
		return "tela/telaInicial";
	}

}
