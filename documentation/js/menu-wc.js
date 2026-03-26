'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">curso-online documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-7284ef3bc8b10129388b4568c7914f3b"' : 'data-target="#xs-components-links-module-AppModule-7284ef3bc8b10129388b4568c7914f3b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-7284ef3bc8b10129388b4568c7914f3b"' :
                                            'id="xs-components-links-module-AppModule-7284ef3bc8b10129388b4568c7914f3b"' }>
                                            <li class="link">
                                                <a href="components/AdminComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AdminComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AreaBemestarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AreaBemestarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AreaFacilitadorComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AreaFacilitadorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AreaParticipanteComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AreaParticipanteComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AvisosAlunosComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AvisosAlunosComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AvisosInstrutorComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AvisosInstrutorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BarometroDiarioComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BarometroDiarioComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BlocosComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BlocosComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CadastroComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CadastroComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CadastroCorComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CadastroCorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CadastroVideoComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CadastroVideoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ChamadaComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ChamadaComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CriarAtividadesRevisaoComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CriarAtividadesRevisaoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CriarExercicioComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CriarExercicioComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CriarExercicioObrigatorioComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CriarExercicioObrigatorioComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CronogramaAlunoComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CronogramaAlunoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CronogramaInstrutorComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CronogramaInstrutorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DeletarCronogramaComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DeletarCronogramaComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DeletarUsuarioComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DeletarUsuarioComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditarAtividadeObrigatoriaComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EditarAtividadeObrigatoriaComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditarAtividadesRevisaoComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EditarAtividadesRevisaoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditarAvisosComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EditarAvisosComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditarComentarioForumComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EditarComentarioForumComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditarCriacaoAtividadeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EditarCriacaoAtividadeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditarDuvidaForumComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EditarDuvidaForumComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditarEntregaAtividadeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EditarEntregaAtividadeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditarEntregaAtividadeObrComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EditarEntregaAtividadeObrComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditarFormBemestarPosComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EditarFormBemestarPosComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditarLinkUtilComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EditarLinkUtilComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditarLinkZoomComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EditarLinkZoomComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditarPerfilComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EditarPerfilComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EntregarExercicioComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EntregarExercicioComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormBemestarPosComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FormBemestarPosComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormBemestarSolicitaComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FormBemestarSolicitaComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ForumComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ForumComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HomeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LiberarAulasComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LiberarAulasComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LinksUteisComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LinksUteisComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListaFormBemestarPosComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ListaFormBemestarPosComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListaFormBemestarSolicitaComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ListaFormBemestarSolicitaComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MenuComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MenuComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModuloDoisComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ModuloDoisComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModuloSoftComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ModuloSoftComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModuloTresComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ModuloTresComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModuloUmComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ModuloUmComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PerfilComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PerfilComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RelatorioBarometroComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RelatorioBarometroComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RelatorioBarometroDiaComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RelatorioBarometroDiaComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RelatorioBemestarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RelatorioBemestarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RelatorioBemestarPosAtendimentoTotalminComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RelatorioBemestarPosAtendimentoTotalminComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RelatorioBemestarPosAtendimentoTurmaComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RelatorioBemestarPosAtendimentoTurmaComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RelatorioBemestarPosAtendimentosParticipanteComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RelatorioBemestarPosAtendimentosParticipanteComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RelatorioBemestarPosAtendimentosTecnicoComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RelatorioBemestarPosAtendimentosTecnicoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RelatorioBemestarPosDemandaTurmaComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RelatorioBemestarPosDemandaTurmaComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RelatorioBemestarPosSolicitacaoAreaComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RelatorioBemestarPosSolicitacaoAreaComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RelatorioBemestarPosVulnerabilidadeTurmaComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RelatorioBemestarPosVulnerabilidadeTurmaComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RelatorioBemestarSolicitacaoParticipanteComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RelatorioBemestarSolicitacaoParticipanteComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RelatorioBemestarSolicitacaoTurmaComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RelatorioBemestarSolicitacaoTurmaComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RelatorioBemestarUrgenciaTurmaComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RelatorioBemestarUrgenciaTurmaComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RelatorioEntregaExercicioComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RelatorioEntregaExercicioComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RelatorioEntregaExercicioOpcionalComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RelatorioEntregaExercicioOpcionalComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RelatorioZoomComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RelatorioZoomComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RelatoriosComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RelatoriosComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RodapeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RodapeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SobreNosComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SobreNosComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UploadComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UploadComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ZoomAlunoComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ZoomAlunoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ZoomInstrutorComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ZoomInstrutorComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ModulosModule.html" data-type="entity-link">ModulosModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ModulosModule-6c6f4c4d3078f029e717d5dad85c9e34"' : 'data-target="#xs-components-links-module-ModulosModule-6c6f4c4d3078f029e717d5dad85c9e34"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ModulosModule-6c6f4c4d3078f029e717d5dad85c9e34"' :
                                            'id="xs-components-links-module-ModulosModule-6c6f4c4d3078f029e717d5dad85c9e34"' }>
                                            <li class="link">
                                                <a href="components/BarometroComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BarometroComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ConteudoUmComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ConteudoUmComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SoftComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SoftComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/VideosComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">VideosComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link">SharedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SharedModule-d86153e53ee5a9bbc1a8d5e6fdc29e65"' : 'data-target="#xs-components-links-module-SharedModule-d86153e53ee5a9bbc1a8d5e6fdc29e65"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SharedModule-d86153e53ee5a9bbc1a8d5e6fdc29e65"' :
                                            'id="xs-components-links-module-SharedModule-d86153e53ee5a9bbc1a8d5e6fdc29e65"' }>
                                            <li class="link">
                                                <a href="components/AlertModalComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AlertModalComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ConfirmModelComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ConfirmModelComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AppPage.html" data-type="entity-link">AppPage</a>
                            </li>
                            <li class="link">
                                <a href="classes/Atividade.html" data-type="entity-link">Atividade</a>
                            </li>
                            <li class="link">
                                <a href="classes/AtividadeLiberada.html" data-type="entity-link">AtividadeLiberada</a>
                            </li>
                            <li class="link">
                                <a href="classes/AtividadeObrigatoria.html" data-type="entity-link">AtividadeObrigatoria</a>
                            </li>
                            <li class="link">
                                <a href="classes/Aula.html" data-type="entity-link">Aula</a>
                            </li>
                            <li class="link">
                                <a href="classes/AulaLiberada.html" data-type="entity-link">AulaLiberada</a>
                            </li>
                            <li class="link">
                                <a href="classes/Avisos.html" data-type="entity-link">Avisos</a>
                            </li>
                            <li class="link">
                                <a href="classes/Barometro.html" data-type="entity-link">Barometro</a>
                            </li>
                            <li class="link">
                                <a href="classes/BarometroDiario.html" data-type="entity-link">BarometroDiario</a>
                            </li>
                            <li class="link">
                                <a href="classes/BarometroFilter.html" data-type="entity-link">BarometroFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/Chamada.html" data-type="entity-link">Chamada</a>
                            </li>
                            <li class="link">
                                <a href="classes/Cronograma.html" data-type="entity-link">Cronograma</a>
                            </li>
                            <li class="link">
                                <a href="classes/CronogramaCor.html" data-type="entity-link">CronogramaCor</a>
                            </li>
                            <li class="link">
                                <a href="classes/Curso.html" data-type="entity-link">Curso</a>
                            </li>
                            <li class="link">
                                <a href="classes/DemandasBemEstar.html" data-type="entity-link">DemandasBemEstar</a>
                            </li>
                            <li class="link">
                                <a href="classes/DemandasRelatorio.html" data-type="entity-link">DemandasRelatorio</a>
                            </li>
                            <li class="link">
                                <a href="classes/EntregaExercicios.html" data-type="entity-link">EntregaExercicios</a>
                            </li>
                            <li class="link">
                                <a href="classes/EntregaExerciciosObr.html" data-type="entity-link">EntregaExerciciosObr</a>
                            </li>
                            <li class="link">
                                <a href="classes/Entregas.html" data-type="entity-link">Entregas</a>
                            </li>
                            <li class="link">
                                <a href="classes/EntregasObrigatorias.html" data-type="entity-link">EntregasObrigatorias</a>
                            </li>
                            <li class="link">
                                <a href="classes/FormBemEstarPos.html" data-type="entity-link">FormBemEstarPos</a>
                            </li>
                            <li class="link">
                                <a href="classes/FormBemEstarSolicita.html" data-type="entity-link">FormBemEstarSolicita</a>
                            </li>
                            <li class="link">
                                <a href="classes/FormSolicitaRelatorio.html" data-type="entity-link">FormSolicitaRelatorio</a>
                            </li>
                            <li class="link">
                                <a href="classes/ForumComentario.html" data-type="entity-link">ForumComentario</a>
                            </li>
                            <li class="link">
                                <a href="classes/ForumDuvida.html" data-type="entity-link">ForumDuvida</a>
                            </li>
                            <li class="link">
                                <a href="classes/LinksUteis.html" data-type="entity-link">LinksUteis</a>
                            </li>
                            <li class="link">
                                <a href="classes/Modulo.html" data-type="entity-link">Modulo</a>
                            </li>
                            <li class="link">
                                <a href="classes/PercentEntregas.html" data-type="entity-link">PercentEntregas</a>
                            </li>
                            <li class="link">
                                <a href="classes/PercentEntregasObr.html" data-type="entity-link">PercentEntregasObr</a>
                            </li>
                            <li class="link">
                                <a href="classes/PresencaZoom.html" data-type="entity-link">PresencaZoom</a>
                            </li>
                            <li class="link">
                                <a href="classes/QuestaoAula.html" data-type="entity-link">QuestaoAula</a>
                            </li>
                            <li class="link">
                                <a href="classes/QuestAulaValid.html" data-type="entity-link">QuestAulaValid</a>
                            </li>
                            <li class="link">
                                <a href="classes/RespBarometroDia.html" data-type="entity-link">RespBarometroDia</a>
                            </li>
                            <li class="link">
                                <a href="classes/Resposta.html" data-type="entity-link">Resposta</a>
                            </li>
                            <li class="link">
                                <a href="classes/TipoTurma.html" data-type="entity-link">TipoTurma</a>
                            </li>
                            <li class="link">
                                <a href="classes/Turma.html" data-type="entity-link">Turma</a>
                            </li>
                            <li class="link">
                                <a href="classes/UploadVideo.html" data-type="entity-link">UploadVideo</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link">User</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserLogin.html" data-type="entity-link">UserLogin</a>
                            </li>
                            <li class="link">
                                <a href="classes/Zoom.html" data-type="entity-link">Zoom</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AdmService.html" data-type="entity-link">AdmService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AlertModelService.html" data-type="entity-link">AlertModelService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AtividadeService.html" data-type="entity-link">AtividadeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AtividadesObrigatoriasService.html" data-type="entity-link">AtividadesObrigatoriasService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AtividadesRevisaoService.html" data-type="entity-link">AtividadesRevisaoService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link">AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AvisosService.html" data-type="entity-link">AvisosService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BarometroDiarioService.html" data-type="entity-link">BarometroDiarioService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BemestarService.html" data-type="entity-link">BemestarService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ChamadaService.html" data-type="entity-link">ChamadaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CronogramaService.html" data-type="entity-link">CronogramaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CursosService.html" data-type="entity-link">CursosService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ExcelDownloadService.html" data-type="entity-link">ExcelDownloadService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ForumService.html" data-type="entity-link">ForumService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LiberarAulasService.html" data-type="entity-link">LiberarAulasService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LiberarExercicioService.html" data-type="entity-link">LiberarExercicioService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LinksUteisService.html" data-type="entity-link">LinksUteisService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ModuloService.html" data-type="entity-link">ModuloService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RegistroSaidaService.html" data-type="entity-link">RegistroSaidaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RelatorioBarometroDiaService.html" data-type="entity-link">RelatorioBarometroDiaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RelatoriosService.html" data-type="entity-link">RelatoriosService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RelatorioZoomService.html" data-type="entity-link">RelatorioZoomService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TurmaService.html" data-type="entity-link">TurmaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UploadService.html" data-type="entity-link">UploadService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link">UserService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ZoomService.html" data-type="entity-link">ZoomService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});