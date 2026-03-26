import { Turma } from './../model/Tuma';
import { Cronograma } from './../model/Cronograma';
import { RelatoriosService } from './../service/relatorios.service';
import { CronogramaService } from './../service/cronograma.service';
import { Router } from '@angular/router';
import { AlertModelService } from './../shared/alert-model.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from './../../environments/environment.prod';

import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput, Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import Tooltip from 'tooltip.js';

@Component({
  selector: 'app-cronograma-aluno',
  templateUrl: './cronograma-aluno.component.html',
  styleUrls: ['./cronograma-aluno.component.css']
})
export class CronogramaAlunoComponent implements OnInit {

  @ViewChild('fullcalendar') calendarComponent: FullCalendarComponent;

  calendarEvents: EventInput[] = [];

  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];

  calendarApi: Calendar;
  initialized = false;

  descricao: string;
  cor: string;
  data: string;
  hIn: string;
  hFim: string;
  idTurma = environment.idTurma;

  cronograma: Cronograma = new Cronograma();
  listaCronograma: Cronograma[];
  listaTurma: Turma[];
  constructor(
    private relatorioService: RelatoriosService,
    private cronogramaService: CronogramaService,
    private router: Router,
    private alertService: AlertModelService
  ) {}

  ngOnInit() {

    window.scroll(0, 0);

    const token = environment.token;

    if (token == '') {
      this.alertService.showAlertInfo('Antes de começar, faça o login!');
      this.router.navigate(['/login']);
    }

  }


  findAllAgendaByTurma() {
    this.cronogramaService.getByIdTurma(this.idTurma).subscribe((resp: Cronograma[]) => {
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

  ngAfterViewChecked() {
    this.calendarApi = this.calendarComponent.getApi();

    if (this.calendarApi && !this.initialized) {
      this.initialized = true;
      this.loadEvents();
    }
  }

  loadEvents() {
    this.findAllAgendaByTurma();
  }


  onEventClick(clickedEvent: any) {
    let hInicio = String(clickedEvent.event.start).split(' ');
    let hFim = String(clickedEvent.event.end).split(' ');
    let data = String(clickedEvent.event.end).split(' ');
    let inicio = hInicio[4];
    let fim = hFim[4];
    let dataOk = data[2] + '/' + this.trazerMes(data[1]) + '/' + data[3];
    this.alertService.showConfirm(dataOk + ' - Das ' + inicio + ' às ' + fim, clickedEvent.event.title, null, 'Fechar');
  }

  onEventRender(info: any) {
    const tooltip = new Tooltip(info.el, {
      title: info.event.title,
      placement: 'top-end',
      trigger: 'hover',
      container: 'body'
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
