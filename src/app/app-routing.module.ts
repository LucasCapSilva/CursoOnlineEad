import { TrilhasComponent } from './trilhaZero/trilhas/trilhas.component';
import { CadastroDiarioDeBordoComponent } from './terminoBloco/cadastro-diario-de-bordo/cadastro-diario-de-bordo.component';
import { HomeComponent } from './home/home.component';
import { EntregaExercicios } from './model/EntragaExercicios';
import { EntregaExerciciosObr } from './model/EntregaExerciciosObr';
import { CriarCurriculoExtraCurricularComponent } from './curriculo/criar-curriculo-extra-curricular/criar-curriculo-extra-curricular.component';
import { GithubParticipanteComponent } from './github-participante/github-participante.component';
import { ViewCurriculoAllComponent } from './curriculo/view-curriculo-all/view-curriculo-all.component';
import { ViewPrintCurriruloComponent } from './curriculo/view-print-currirulo/view-print-currirulo.component';
import { CurriculoTemplateComponent } from './curriculo/curriculo-template/curriculo-template.component';
import { CriarCurriculoProfissionalComponent } from './curriculo/criar-curriculo-profissional/criar-curriculo-profissional.component';
import { CriarCurriculoIdiomaComponent } from './curriculo/criar-curriculo-idioma/criar-curriculo-idioma.component';

import { CriarCurriculoComponent } from './curriculo/criar-curriculo/criar-curriculo.component';
import { CurriculoComponent } from './curriculo/curriculo.component';
import { Curriculo } from './model/Curriculo';
import { EditarFormBemestarPosComponent } from './editar-form-bemestar-pos/editar-form-bemestar-pos.component';
import { FormBemestarSolicitaComponent } from './form-bemestar-solicita/form-bemestar-solicita.component';
import { ListaFormBemestarSolicitaComponent } from './lista-form-bemestar-solicita/lista-form-bemestar-solicita.component';
import { ListaFormBemestarPosComponent } from './lista-form-bemestar-pos/lista-form-bemestar-pos.component';
import { FormBemestarPosComponent } from './form-bemestar-pos/form-bemestar-pos.component';
import { EditarAtividadeObrigatoriaComponent } from './editar-atividade-obrigatoria/editar-atividade-obrigatoria.component';
import { EditarEntregaAtividadeObrComponent } from './editar-entrega-atividade-obr/editar-entrega-atividade-obr.component';
import { EditarAtividadesRevisaoComponent } from './editar-atividades-revisao/editar-atividades-revisao.component';
import { AdminComponent } from './admin/admin.component';
import { CriarAtividadesRevisaoComponent } from './criar-atividades-revisao/criar-atividades-revisao.component';
import { AreaParticipanteComponent } from './area-participante/area-participante.component';
import { AreaFacilitadorComponent } from './area-facilitador/area-facilitador.component';
import { BlocosComponent } from './blocos/blocos.component';
import { EditarPerfilComponent } from './editar-perfil/editar-perfil.component';
import { EditarLinkZoomComponent } from './editar-link-zoom/editar-link-zoom.component';
import { BarometroDiarioComponent } from './barometro-diario/barometro-diario.component';
import { SobreNosComponent } from './sobre-nos/sobre-nos.component';
import { ZoomAlunoComponent } from './zoom-aluno/zoom-aluno.component';
import { ZoomInstrutorComponent } from './zoom-instrutor/zoom-instrutor.component';
import { EditarLinkUtilComponent } from './editar-link-util/editar-link-util.component';
import { EditarCriacaoAtividadeComponent } from './editar-criacao-atividade/editar-criacao-atividade.component';
import { EditarEntregaAtividadeComponent } from './editar-entrega-atividade/editar-entrega-atividade.component';
import { EditarComentarioForumComponent } from './editar-comentario-forum/editar-comentario-forum.component';
import { EditarDuvidaForumComponent } from './editar-duvida-forum/editar-duvida-forum.component';
import { EntregarExercicioComponent } from './entregar-exercicio/entregar-exercicio.component';
import { CriarExercicioComponent } from './criar-exercicio/criar-exercicio.component';
import { DeletarCronogramaComponent } from './deletar-cronograma/deletar-cronograma.component';
import { ForumComponent } from './forum/forum.component';
import { CadastroCorComponent } from './cadastro-cor/cadastro-cor.component';
import { ChamadaComponent } from './chamada/chamada.component';
import { PerfilComponent } from './perfil/perfil.component';
import { LinksUteisComponent } from './links-uteis/links-uteis.component';
import { CronogramaInstrutorComponent } from './cronograma-instrutor/cronograma-instrutor.component';
import { CronogramaAlunoComponent } from './cronograma-aluno/cronograma-aluno.component';
import { LiberarAulasComponent } from './liberar-aulas/liberar-aulas.component';
import { SoftComponent } from './modulos/soft/soft.component';
import { BarometroComponent } from './modulos/barometro/barometro.component';
import { VideosComponent } from './modulos/videos/videos.component';
import { CadastroVideoComponent } from './upload-videos/cadastro-video/cadastro-video.component';
import { ConteudoUmComponent } from './modulos/conteudo-um/conteudo-um.component';
import { UploadComponent } from './upload-videos/upload/upload.component';

import { ModuloSoftComponent } from './modulo-soft/modulo-soft.component';
import { ModuloTresComponent } from './modulo-tres/modulo-tres.component';
import { ModuloDoisComponent } from './modulo-dois/modulo-dois.component';
import { ModuloUmComponent } from './modulo-um/modulo-um.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { LoginComponent } from './login/login.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CriarCurriculoEducacaoComponent } from './curriculo/criar-curriculo-educacao/criar-curriculo-educacao.component';
import { CriarCurriculoPortifolioComponent } from './curriculo/criar-curriculo-portifolio/criar-curriculo-portifolio.component';
import { UserPendenteComponent } from './user-pendente/user-pendente.component';



const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  { path: 'trilha-zero', component: TrilhasComponent  },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'home', component: HomeComponent  },
  { path: 'area-facilitador', component: AreaFacilitadorComponent },
  { path: 'area-participante', component: AreaParticipanteComponent },
  { path: 'cadastro-aluno', component: CadastroComponent },
  { path: 'admin', component: AdminComponent },

  { path: 'upload-videos', component: UploadComponent },
  { path: 'cadastro-video', component: CadastroVideoComponent },

  { path: 'blocos', component: BlocosComponent },
  { path: 'modulo-um', component: ModuloUmComponent },
  { path: 'modulo-dois', component: ModuloDoisComponent },
  { path: 'modulo-tres', component: ModuloTresComponent },
  { path: 'modulo-soft', component: ModuloSoftComponent },

  { path: 'conteudo-um', component: ConteudoUmComponent },
  { path: 'conteudo-um/:id', component: ConteudoUmComponent },
  { path: 'videos-conteudo/:id', component: VideosComponent },

  { path: 'soft-conteudo', component: SoftComponent },

  { path: 'barometro', component: BarometroComponent },
  { path: 'liberar-aulas', component: LiberarAulasComponent },

  { path: 'cronograma-aluno', component: CronogramaAlunoComponent },
  { path: 'cronograma-instrutor', component: CronogramaInstrutorComponent },
  { path: 'cronograma-instrutor/:id', component: CronogramaInstrutorComponent },
  { path: 'links-uteis', component: LinksUteisComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'chamada', component: ChamadaComponent },
  { path: 'cadastro-cor', component: CadastroCorComponent },
  { path: 'forum', component: ForumComponent },
  { path: 'deletar-cronograma/:id', component: DeletarCronogramaComponent },
  { path: 'criar-exercicio', component: CriarExercicioComponent },
  { path: 'entregar-exercicio', component: EntregarExercicioComponent },

  { path: 'editar-duvida/:id', component: EditarDuvidaForumComponent },
  { path: 'editar-comentario/:id', component: EditarComentarioForumComponent },
  { path: 'editar-entrega-atividade/:id', component: EditarEntregaAtividadeComponent },
  { path: 'editar-criacao-atividade/:id', component: EditarCriacaoAtividadeComponent },
  { path: 'editar-entrega-atividade-obr/:id', component: EditarEntregaAtividadeObrComponent },
  { path: 'editar-atividade-obrigatoria/:id', component: EditarAtividadeObrigatoriaComponent },

  { path: 'editar-links/:id', component: EditarLinkUtilComponent },
  { path: 'zoom-instrutor', component: ZoomInstrutorComponent },
  { path: 'zoom-aluno', component: ZoomAlunoComponent },
  { path: 'editar-link-zoom/:id', component: EditarLinkZoomComponent },
  { path: 'sobre-nos', component: SobreNosComponent },
  { path: 'barometro-diario', component: BarometroDiarioComponent },
  { path: 'editar-perfil/:id', component: EditarPerfilComponent },
  { path: 'criar-atividades-revisao', component: CriarAtividadesRevisaoComponent },
  { path: 'editar-atividades-revisao/quest/:id', component: EditarAtividadesRevisaoComponent },
  { path: 'editar-atividades-revisao/resp/:id', component: EditarAtividadesRevisaoComponent },

  { path: 'form-bemestar-pos', component: FormBemestarPosComponent },
  { path: 'form-bemestar-solicita', component: FormBemestarSolicitaComponent },
  { path: 'lista-form-bemestar-pos', component: ListaFormBemestarPosComponent },
  { path: 'lista-form-bemestar-solicita', component: ListaFormBemestarSolicitaComponent },
  { path: 'edit-form-bemestar-pos/:id', component: EditarFormBemestarPosComponent },

  { path: 'user-pendente/:turmaId', component: UserPendenteComponent},

  { path: 'curriculo', component: CurriculoComponent },
  { path: 'criar-curriculo', component: CriarCurriculoComponent },
  { path: 'criar-curriculo/:tipo/:id', component: CriarCurriculoComponent },
  { path: 'criar-curriculo-idioma/:id', component: CriarCurriculoIdiomaComponent },
  { path: 'criar-curriculo-idioma/:tipo/:id/:idUser', component: CriarCurriculoIdiomaComponent },
  { path: 'criar-curriculo-educacao/:id', component: CriarCurriculoEducacaoComponent },
  { path: 'criar-curriculo-extra/:id', component: CriarCurriculoExtraCurricularComponent },
  { path: 'criar-curriculo-educacao/:tipo/:id/:idUser', component: CriarCurriculoEducacaoComponent },
  { path: 'criar-curriculo-extra/:tipo/:id/:idUser', component: CriarCurriculoExtraCurricularComponent },
  { path: 'criar-curriculo-profissional/:id', component: CriarCurriculoProfissionalComponent },
  { path: 'criar-curriculo-profissional/:tipo/:id/:idUser', component: CriarCurriculoProfissionalComponent },
 
  { path: 'criar-curriculo-portifolio/:id', component: CriarCurriculoPortifolioComponent },
  { path: 'criar-curriculo-portifolio/:tipo/:id/:idUser', component: CriarCurriculoPortifolioComponent },

  { path: 'visualizar-curriculo', component: ViewPrintCurriruloComponent },
  { path: 'visualizar-curriculo/:id', component: ViewPrintCurriruloComponent },
  { path: 'visualizar-curriculo-turma', component: ViewCurriculoAllComponent },

  { path: 'github-participante', component: GithubParticipanteComponent},

  { path: 'cadastro-diario-de-bordo', component: CadastroDiarioDeBordoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
