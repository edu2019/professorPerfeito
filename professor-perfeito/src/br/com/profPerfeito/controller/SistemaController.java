package br.com.profPerfeito.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import br.com.profPerfeito.model.Aluno;
import br.com.profPerfeito.model.AlunoDao;
import br.com.profPerfeito.model.Professor;
import br.com.profPerfeito.model.ProfessorDao;

@Controller
public class SistemaController {

	

	@RequestMapping("/")
	public String index() {

		return "tela/telaInicial";
	}

	@RequestMapping("save")
	public ModelAndView save(Professor professor, Aluno aluno, @RequestParam("estado") String estado, Model model, final RedirectAttributes redirectAttributes, 
			HttpServletRequest request) {

		// cadastrar o professor e redirecionar para tela de curso
		if (estado.equalsIgnoreCase("p")) {

			ProfessorDao dao = new ProfessorDao();
			dao.salvar(professor);
			
			//passa o id atual e enviar o controller do curso			
			request.getSession().setAttribute("professor", professor.getIdprofessor());
			


					
			return new ModelAndView("redirect:tela/cadastroCurso");
		}

		// cadastrar aluno e redirecionar para tela inicial
		AlunoDao dao = new AlunoDao();
		dao.salvar(aluno);

		return new ModelAndView("redirect:/");
	}

}
