import { CriarCurriculoProfissionalComponent } from './curriculo/criar-curriculo-profissional/criar-curriculo-profissional.component';
import { CriarCurriculoComponent } from './curriculo/criar-curriculo/criar-curriculo.component';
import { CriarCurriculoIdiomaComponent } from './curriculo/criar-curriculo-idioma/criar-curriculo-idioma.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MenuComponent } from './menu/menu.component';
import { RodapeComponent } from './rodape/rodape.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ModuloUmComponent } from './modulo-um/modulo-um.component';
import { ModuloDoisComponent } from './modulo-dois/modulo-dois.component';
import { ModuloTresComponent } from './modulo-tres/modulo-tres.component';
import { ModuloSoftComponent } from './modulo-soft/modulo-soft.component';
import { ModulosModule } from './modulos/modulos.module';
import { UploadComponent } from './upload-videos/upload/upload.component';
import { CadastroVideoComponent } from './upload-videos/cadastro-video/cadastro-video.component';
import { RelatorioBarometroComponent } from './relatorio-barometro/relatorio-barometro.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SharedModule } from './shared/shared.module';
import { AccordionModule } from 'ngx-accordion';
import { LiberarAulasComponent } from './liberar-aulas/liberar-aulas.component';
import { CronogramaAlunoComponent } from './cronograma-aluno/cronograma-aluno.component';
import { LinksUteisComponent } from './links-uteis/links-uteis.component';
import { PerfilComponent } from './perfil/perfil.component';
import { CronogramaInstrutorComponent } from './cronograma-instrutor/cronograma-instrutor.component';
import { ChamadaComponent } from './chamada/chamada.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CadastroCorComponent } from './cadastro-cor/cadastro-cor.component';
import { ForumComponent } from './forum/forum.component';
import { DeletarCronogramaComponent } from './deletar-cronograma/deletar-cronograma.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CriarExercicioComponent } from './criar-exercicio/criar-exercicio.component';
import { EntregarExercicioComponent } from './entregar-exercicio/entregar-exercicio.component';
import { OrderModule } from 'ngx-order-pipe';
import { EditarDuvidaForumComponent } from './editar-duvida-forum/editar-duvida-forum.component';
import { EditarComentarioForumComponent } from './editar-comentario-forum/editar-comentario-forum.component';
import { EditarEntregaAtividadeComponent } from './editar-entrega-atividade/editar-entrega-atividade.component';
import { EditarCriacaoAtividadeComponent } from './editar-criacao-atividade/editar-criacao-atividade.component';
import { EditarLinkUtilComponent } from './editar-link-util/editar-link-util.component';
import { ZoomInstrutorComponent } from './zoom-instrutor/zoom-instrutor.component';
import { ZoomAlunoComponent } from './zoom-aluno/zoom-aluno.component';
import { SobreNosComponent } from './sobre-nos/sobre-nos.component';
import { BarometroDiarioComponent } from './barometro-diario/barometro-diario.component';
import { EditarLinkZoomComponent } from './editar-link-zoom/editar-link-zoom.component';
import { RelatorioBarometroDiaComponent } from './relatorio-barometro-dia/relatorio-barometro-dia.component';
import { RelatorioZoomComponent } from './relatorio-zoom/relatorio-zoom.component';
import { AvisosInstrutorComponent } from './avisos-instrutor/avisos-instrutor.component';
import { AvisosAlunosComponent } from './avisos-alunos/avisos-alunos.component';
import { EditarAvisosComponent } from './editar-avisos/editar-avisos.component';
import { RelatorioEntregaExercicioComponent } from './relatorio-entrega-exercicio/relatorio-entrega-exercicio.component';
import { RelatoriosComponent } from './relatorios/relatorios.component';
import { EditarPerfilComponent } from './editar-perfil/editar-perfil.component';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BlocosComponent } from './blocos/blocos.component';
import { AreaFacilitadorComponent } from './area-facilitador/area-facilitador.component';
import { AreaParticipanteComponent } from './area-participante/area-participante.component';
import { CriarAtividadesRevisaoComponent } from './criar-atividades-revisao/criar-atividades-revisao.component';
import { AdminComponent } from './admin/admin.component';
import { DeletarUsuarioComponent } from './deletar-usuario/deletar-usuario.component';
import { EditarAtividadesRevisaoComponent } from './editar-atividades-revisao/editar-atividades-revisao.component';
import { CriarExercicioObrigatorioComponent } from './criar-exercicio-obrigatorio/criar-exercicio-obrigatorio.component';
import { EditarEntregaAtividadeObrComponent } from './editar-entrega-atividade-obr/editar-entrega-atividade-obr.component';
import { EditarAtividadeObrigatoriaComponent } from './editar-atividade-obrigatoria/editar-atividade-obrigatoria.component';
import { RelatorioEntregaExercicioOpcionalComponent } from './relatorio-entrega-exercicio-opcional/relatorio-entrega-exercicio-opcional.component';
import { AreaBemestarComponent } from './area-bemestar/area-bemestar.component';
import { FormBemestarPosComponent } from './form-bemestar-pos/form-bemestar-pos.component';
import { FormBemestarSolicitaComponent } from './form-bemestar-solicita/form-bemestar-solicita.component';
import { RelatorioBemestarComponent } from './relatorio-bemestar/relatorio-bemestar.component';
import { ListaFormBemestarPosComponent } from './lista-form-bemestar-pos/lista-form-bemestar-pos.component';
import { ListaFormBemestarSolicitaComponent } from './lista-form-bemestar-solicita/lista-form-bemestar-solicita.component';
import { EditarFormBemestarPosComponent } from './editar-form-bemestar-pos/editar-form-bemestar-pos.component';
import { RelatorioBemestarSolicitacaoTurmaComponent } from './relatorio-bemestar-solicitacao-turma/relatorio-bemestar-solicitacao-turma.component';
import { RelatorioBemestarUrgenciaTurmaComponent } from './relatorio-bemestar-urgencia-turma/relatorio-bemestar-urgencia-turma.component';
import { RelatorioBemestarSolicitacaoParticipanteComponent } from './relatorio-bemestar-solicitacao-participante/relatorio-bemestar-solicitacao-participante.component';
import { RelatorioBemestarPosAtendimentoTurmaComponent } from './relatorio-bemestar-pos-atendimento-turma/relatorio-bemestar-pos-atendimento-turma.component';
import { RelatorioBemestarPosSolicitacaoAreaComponent } from './relatorio-bemestar-pos-solicitacao-area/relatorio-bemestar-pos-solicitacao-area.component';
import { RelatorioBemestarPosDemandaTurmaComponent } from './relatorio-bemestar-pos-demanda-turma/relatorio-bemestar-pos-demanda-turma.component';
import { RelatorioBemestarPosAtendimentoTotalminComponent } from './relatorio-bemestar-pos-atendimento-totalmin/relatorio-bemestar-pos-atendimento-totalmin.component';
import { RelatorioBemestarPosVulnerabilidadeTurmaComponent } from './relatorio-bemestar-pos-vulnerabilidade-turma/relatorio-bemestar-pos-vulnerabilidade-turma.component';
import { RelatorioBemestarPosAtendimentosParticipanteComponent } from './relatorio-bemestar-pos-atendimentos-participante/relatorio-bemestar-pos-atendimentos-participante.component';
import { RelatorioBemestarPosAtendimentosTecnicoComponent } from './relatorio-bemestar-pos-atendimentos-tecnico/relatorio-bemestar-pos-atendimentos-tecnico.component';
import { CurriculoComponent } from './curriculo/curriculo.component';
import { CriarCurriculoEducacaoComponent } from './curriculo/criar-curriculo-educacao/criar-curriculo-educacao.component';
import { CriarCurriculoPortifolioComponent } from './curriculo/criar-curriculo-portifolio/criar-curriculo-portifolio.component';
import { CurriculoTemplateComponent } from './curriculo/curriculo-template/curriculo-template.component';
import { ViewPrintCurriruloComponent } from './curriculo/view-print-currirulo/view-print-currirulo.component';
import { ViewCurriculoAllComponent } from './curriculo/view-curriculo-all/view-curriculo-all.component';
import { SnowComponent } from './natal/snow/snow.component';
import { BotaoBemEmpComponent } from './menu/botao-bem-emp/botao-bem-emp.component';
import { PhonePipe } from './pipes/PhonePipe';
import { GithubParticipanteComponent } from './github-participante/github-participante.component';
import { CriarCurriculoExtraCurricularComponent } from './curriculo/criar-curriculo-extra-curricular/criar-curriculo-extra-curricular.component';
import { CadastroDiarioDeBordoComponent } from './terminoBloco/cadastro-diario-de-bordo/cadastro-diario-de-bordo.component';
import { TecnicoBESComponent } from './terminoBloco/tecnico-bes/tecnico-bes.component';
import { UserInfoComponent } from './terminoBloco/user-info/user-info.component';
import { RelatoComponent } from './terminoBloco/relato/relato.component';
import { PassagemComponent } from './terminoBloco/passagem/passagem.component';
import { InstrutorBlocoComponent } from './terminoBloco/instrutor-bloco/instrutor-bloco.component';
import { TrilhasComponent } from './trilhaZero/trilhas/trilhas.component';
import { UserPendenteComponent } from './user-pendente/user-pendente.component';
import { DiarioDeBordoComponent } from './diario-de-bordo/diario-de-bordo.component';
import { CadastroOcorrenciasComponent } from './diario-de-bordo/cadastro-ocorrencias/cadastro-ocorrencias.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    RodapeComponent,
    CadastroComponent,
    HomeComponent,
    ModuloUmComponent,
    ModuloDoisComponent,
    ModuloTresComponent,
    ModuloSoftComponent,
    UploadComponent,
    CadastroVideoComponent,
    RelatorioBarometroComponent,
    LiberarAulasComponent,
    CronogramaAlunoComponent,
    LinksUteisComponent,
    PerfilComponent,
    CronogramaInstrutorComponent,
    ChamadaComponent,
    CadastroCorComponent,
    ForumComponent,
    DeletarCronogramaComponent,
    CriarExercicioComponent,
    EntregarExercicioComponent,
    EditarDuvidaForumComponent,
    EditarComentarioForumComponent,
    EditarEntregaAtividadeComponent,
    EditarCriacaoAtividadeComponent,
    EditarLinkUtilComponent,
    ZoomInstrutorComponent,
    ZoomAlunoComponent,
    SobreNosComponent,
    BarometroDiarioComponent,
    EditarLinkZoomComponent,
    RelatorioBarometroDiaComponent,
    RelatorioZoomComponent,
    AvisosInstrutorComponent,
    AvisosAlunosComponent,
    EditarAvisosComponent,
    RelatorioEntregaExercicioComponent,
    RelatoriosComponent,
    EditarPerfilComponent,
    BlocosComponent,
    AreaFacilitadorComponent,
    AreaParticipanteComponent,
    CriarAtividadesRevisaoComponent,
    AdminComponent,
    DeletarUsuarioComponent,
    EditarAtividadesRevisaoComponent,
    CriarExercicioObrigatorioComponent,
    EditarEntregaAtividadeObrComponent,
    EditarAtividadeObrigatoriaComponent,
    RelatorioEntregaExercicioOpcionalComponent,
    AreaBemestarComponent,
    FormBemestarPosComponent,
    FormBemestarSolicitaComponent,
    RelatorioBemestarComponent,
    ListaFormBemestarPosComponent,
    ListaFormBemestarSolicitaComponent,
    EditarFormBemestarPosComponent,
    RelatorioBemestarSolicitacaoTurmaComponent,
    RelatorioBemestarUrgenciaTurmaComponent,
    RelatorioBemestarSolicitacaoParticipanteComponent,
    RelatorioBemestarPosAtendimentoTurmaComponent,
    RelatorioBemestarPosSolicitacaoAreaComponent,
    RelatorioBemestarPosDemandaTurmaComponent,
    RelatorioBemestarPosAtendimentoTotalminComponent,
    RelatorioBemestarPosVulnerabilidadeTurmaComponent,
    RelatorioBemestarPosAtendimentosParticipanteComponent,
    RelatorioBemestarPosAtendimentosTecnicoComponent,
    CurriculoComponent,
    CriarCurriculoComponent,
    CriarCurriculoIdiomaComponent,
    CriarCurriculoEducacaoComponent,
    CriarCurriculoProfissionalComponent,
    CriarCurriculoPortifolioComponent,
    CurriculoTemplateComponent,
    ViewPrintCurriruloComponent,
    ViewCurriculoAllComponent,
    SnowComponent,
    BotaoBemEmpComponent,
    PhonePipe,
    GithubParticipanteComponent,
    CriarCurriculoExtraCurricularComponent,
    CadastroDiarioDeBordoComponent,
    TecnicoBESComponent,
    UserInfoComponent,
    RelatoComponent,
    PassagemComponent,
    InstrutorBlocoComponent,
    TrilhasComponent,
    UserPendenteComponent,
    DiarioDeBordoComponent,
    CadastroOcorrenciasComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    ModulosModule,
    ModalModule.forRoot(),
    SharedModule,
    AccordionModule,
    FullCalendarModule,
    NgxPaginationModule,
    OrderModule
  ],
  exports: [
    PhonePipe
  ],

  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
