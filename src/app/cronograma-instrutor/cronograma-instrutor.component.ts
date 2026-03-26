import { ExcelDownloadService } from './../service/excel-download.service';
import { AuthService } from './../service/auth.service';
import { AlertModelService } from './../shared/alert-model.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CronogramaService } from './../service/cronograma.service';
import { CronogramaCor } from './../model/CronogramaCor';
import { Cronograma } from './../model/Cronograma';
import { RelatoriosService } from './../service/relatorios.service';
import { Turma } from './../model/Tuma';
import { Component, OnInit, ViewChild } from '@angular/core';

import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput, Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { environment } from './../../environments/environment.prod';
import Tooltip from 'tooltip.js';
import * as XLSX from 'xlsx';



@Component({
  selector: 'app-cronograma-instrutor',
  templateUrl: './cronograma-instrutor.component.html',
  styleUrls: ['./cronograma-instrutor.component.css']
})
export class CronogramaInstrutorComponent implements OnInit {

  @ViewChild('fullcalendar') calendarComponent: FullCalendarComponent;

  calendarEvents: EventInput[] = [];

  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];

  calendarApi: Calendar;
  initialized = false;

  cronograma: Cronograma = new Cronograma();
  listaCronograma: Cronograma[];
  idTurmaAgenda: number;
  idTurma: number;
  turma: Turma = new Turma();
  listaSessoes = []

  listaTurma: Turma[];
  novo: boolean = false;
  idCor: number;
  cor: CronogramaCor = new CronogramaCor();
  listaCor: CronogramaCor[];
  btnPut = false;
  delOk = false;


  constructor(
    private relatorioService: RelatoriosService,
    public cronogramaService: CronogramaService,
    private router: Router,
    private alertService: AlertModelService,
    private route: ActivatedRoute
    ) {}

  ngOnInit() {

    window.scroll(0, 0);

    const profile = environment.profile;

    if (profile != 'ROLE_INSTRUTOR' && profile != 'ROLE_ADMIN') {
      this.alertService.showAlertDanger('Você não tem autorização para acessar essa rota!')
      this.router.navigate(['/home'])
    }

    const token = environment.token;

    if (token == '') {
      this.alertService.showAlertInfo('Antes de começar, faça o login!');
      this.router.navigate(['/login']);
    }

    this.findAllTurma();
    this.findAllCor();

    let idEvento = this.route.snapshot.params["id"];

    if (idEvento == undefined){
      this.novo = true;
    } else {
      this.findByIdEvento(idEvento);
      this.novo = false;

    }

    this.delOk = Boolean(localStorage.getItem('delOk'));
  }

  findByIdEvento(id: number) {
    this.cronogramaService.getByIdAgenda(id).subscribe((resp: Cronograma) => {
      this.cronograma = resp;
    });
  }

  cadastrar() {
    if (this.novo) {
      this.turma.id = this.idTurma;
      this.cor.id = this.idCor;
      this.cronograma.corRGB = this.cor;
      this.cronograma.turma =  new Turma;
      this.cronograma.turma.id = this.idTurma;
      this.cronogramaService.postAgenda(this.cronograma).subscribe((resp: Cronograma) => {
        this.cronograma = resp;
        this.alertService.showAlertSuccess('Sessão cadastrada com sucesso!');
        this.cronograma = new Cronograma();
        this.findAllAgendaByTurma();

      }, err => {
        this.alertService.showAlertDanger('Erro ao cadastrar');
      });
    } else  {
      this.turma.id = this.idTurma;
      this.cor.id = this.idCor;
      this.cronograma.corRGB = this.cor;
      this.cronograma.turma =  new Turma;
      this.cronograma.turma.id = this.idTurma;
      this.cronogramaService.putAgenda(this.cronograma).subscribe((resp: Cronograma) => {
        this.cronograma = resp;
        this.cronograma = new Cronograma();
        this.findAllAgendaByTurma();
        this.router.navigate(['/cronograma-instrutor']);
        this.alertService.showAlertSuccess('Sessão atualizada com sucesso!');
      }, err => {
        this.alertService.showAlertDanger('Erro ao cadastrar');
       
      });
    }

  }

  onFileChange(ev){
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      const dataString = JSON.stringify(jsonData);
      document.getElementById('output').innerHTML = file.name;
      // this.setDownload(dataString);
      const lista = JSON.parse(dataString)
      this.listaSessoes = []
      // console.log("lista", JSON.stringify(lista.data))
      lista.data.forEach((cronograma: Cronograma) => {
        this.listaSessoes.push(cronograma)
      });
      console.log("lista", this.listaSessoes)
    }
    reader.readAsBinaryString(file);
  }

  cadastroMassa(){

    this.listaSessoes.forEach(cronograma => {
      this.turma = new Turma();
      this.turma.id = this.idTurma
      cronograma.turma = this.turma
      this.idCor = cronograma.corRGB
      this.cor.id = this.idCor;

      this.cronograma.corRGB = this.cor;
      this.cronograma.date = cronograma.date
      this.cronograma.descricao = cronograma.descricao
      this.cronograma.inicio = cronograma.inicio
      this.cronograma.fim = cronograma.fim
      this.cronograma.turma = cronograma.turma

      this.cronogramaService.postAgenda(this.cronograma).subscribe((resp: Cronograma) => {
        this.cronograma = resp
      })
    })

    this.alertService.showAlertSuccess('Sessões cadastradas com sucesso!');
    this.findAllAgendaByTurma();

  }


  findAllAgendaByTurma() {
    this.cronogramaService.getByIdTurma(this.idTurmaAgenda).subscribe((resp: Cronograma[]) => {
    this.listaCronograma = resp;
    const events = [];
    this.listaCronograma.forEach(item => {
      const event = {
        id: item.id,
        title: item.descricao,
        start: item.date + 'T' + item.inicio,
        end: item.date + 'T' + item.fim,
        color: item.corRGB.rgb,
        textColor: '#000000',
        allDay: false
      };
      events.push(event);
    });
    this.calendarEvents = events;
    this.calendarApi.removeAllEventSources();
    this.calendarApi.addEventSource(this.calendarEvents);
    });
  }

  loadEvents() {
    this.findAllAgendaByTurma();
  }

  ngAfterViewChecked() {
    this.calendarApi = this.calendarComponent.getApi();

    if (this.calendarApi && !this.initialized) {
      this.initialized = true;
      this.loadEvents();
    }
  }



  onDateClick(clickedDate: any) {

  }

  onEventClick(clickedEvent: any) {
    let hInicio = String(clickedEvent.event.start).split(' ');
    let hFim = String(clickedEvent.event.end).split(' ');
    let data = String(clickedEvent.event.end).split(' ');
    let inicio = hInicio[4];
    let fim = hFim[4];
    let dataOk = data[2] + '/' + this.trazerMes(data[1]) + '/' + data[3];
    environment.idEventoCronograma = clickedEvent.event.id
    if (environment.profile === 'ROLE_ADMIN' || environment.profile === 'ROLE_INSTRUTOR') {
      this.alertService.showConfirm(
        dataOk + ' - Das ' + inicio + ' às ' + fim, clickedEvent.event.title, 'Editar', 'Apagar');
    } else {
      this.alertService.showConfirm(dataOk + ' - Das ' + inicio + ' às ' + fim, clickedEvent.event.title, null, 'Fechar');
    }
  }


  onEventRender(info: any) {

 
    const tooltip = new Tooltip(info.el, {
      title: info.event.title,
      placement: 'top-end',
      trigger: 'hover',
      container: 'body'
    });

  }

  onEventDrop(drop: any) {
    this.cronograma = new Cronograma();
    this.cronograma.id = drop.event.id;
    this.cronograma.descricao = drop.event.title;
    this.cronograma.corRGB = drop.event.color;
    var horaInicio = String(drop.event.start).split(' ');
    var horaFim = String(drop.event.end).split(' ');
    var data = String(drop.event.end).split(' ');
    this.cronograma.inicio = horaInicio[4];
    this.cronograma.fim = horaFim[4];
    this.cronograma.date = data[3] + '-' + this.trazerMes(data[1]) + '-' + data[2];
    this.turma.id = this.idTurma;
    this.cronograma.turma = this.turma;
    
    this.cronogramaService.putAgenda(this.cronograma).subscribe((resp: Cronograma) => {
      this.cronograma = resp;
    });
  }


  findByIdTurma() {
    this.relatorioService.getByIdTurma(this.idTurma).subscribe((resp: Turma) => {
      this.turma = resp;
    });
  }

  findAllTurma() {
    this.listaTurma = []
    this.relatorioService.getAllTurmaCombo().subscribe((resp: Turma[]) => {
      resp.forEach(turmas =>{
        if(turmas.descricao != 'Ex-Participantes'){
          this.listaTurma.push(turmas)
        }
      })
    });
  }

  findByIdCor() {
    this.cronogramaService.getByIdCor(this.idCor).subscribe((resp: CronogramaCor) => {
      this.cor = resp;
    });
  }

  findAllCor() {
    this.cronogramaService.getAllCor().subscribe((resp: CronogramaCor[]) => {
      this.listaCor = resp;
    });
  }

  trazerMes(mes: string) {
    if (mes === 'Jan') {
      return '01';
    }
    if (mes === 'Feb') {
      return '02';
    }
    if (mes === 'Mar') {
      return '03';
    }
    if (mes === 'Apr') {
      return '04';
    }
    if (mes === 'May') {
      return '05';
    }
    if (mes === 'Jun') {
      return '06';
    }
    if (mes === 'Jul') {
      return '07';
    }
    if (mes === 'Aug') {
      return '08';
    }
    if (mes === 'Sep') {
      return '09';
    }
    if (mes === 'Oct') {
      return '10';
    }
    if (mes === 'Nov') {
      return '11';
    }
    if (mes === 'Dec') {
      return '12';
    }

}
}
