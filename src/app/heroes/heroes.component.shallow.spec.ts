import { Component, Input, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { of } from "rxjs";
import { Hero } from "../hero";
import { HeroService } from "../hero.service";
import { HeroesComponent } from "./heroes.component";

// TEST D'INTEGRAZIONE

describe('HeroesComponent (shallow tests)', () => {
// COMPONENTFIXTURE: È UNO STRUMENTO CHE CI PERMETTE DI DEBUGGARE E TESTARE UN COMPONENTE__________________
    let fixture: ComponentFixture<HeroesComponent>;
    let mockHeroService: any;
    let HEROES: any;

// MOCKING CHILD COMPONENT (QUANDO IL SELETTORE DEL COMPONENTE FIGLIO È PRESENTE IN QUELLO PADRE)__________
    @Component({
        selector: 'app-hero',
        template: '<div></div>',
      })
    class FakeHeroComponent {
        @Input() hero!: Hero;
        /* @Output() delete = new EventEmitter(); */
      }
//_________________________________________________________________________________________________________
    beforeEach(() => {
        HEROES = [
            {id: 1, name: 'SpiderDude', strength: 8},
            {id: 2, name: 'Wonderful Woman', strength: 24},
            {id: 3, name: 'SuperDude', strength: 55}
        ]

        mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero'])

// TESTBED: PERMETTE DI CREARE DINAMICAMENTE UN MODULO PER IL NOSTRO TEST (SIMULA UN NgModule)
        TestBed.configureTestingModule({
            declarations: [
                HeroesComponent,
                FakeHeroComponent
            ],
            providers: [
                { provide: HeroService, useValue: mockHeroService }
            ],
/* CONSENTE DI IGNORARE GLI ERRORI A EVENTUALI ELEMENTI O PROPIETA' SCONOSCIUTI IN UN MODELLO (HTML)
            schemas: [NO_ERRORS_SCHEMA] */
        })
// QUI ANGULAR CREA IL COMPONENTE
        fixture = TestBed.createComponent(HeroesComponent);
    });
//__1_____________________________________________________________________________________________________________________________
    it('should set heroes correctly from the service', () => {
// QUANDO CHIAMO UN SERVIZIO(esempio getHeroes), RESTITUISCO (in questo caso) UN OSSERVABILE DI "HEROES"
        mockHeroService.getHeroes.and.returnValue(of(HEROES))
/* IN ANGULAR IL RILEVAMENTO DELLE MODIFICHE PROVOCA L'ESECUZIONE DEGLI EVENTI DEL CICLO DI VITA
    (QUESTO CODICE RILEVA IL CAMBIAMENTO DELLE MODIFICHE AFFINCHÉ L'EVENTO DEL CICLO DI VITA, ngOnInit SI ATTIVI)*/
        fixture.detectChanges(); // ATTIVA NgOnInit

// componentInstance = ?
        expect(fixture.componentInstance.heroes.length).toBe(3);
    });

//__2______________________________________________________________________________________________________________________________
    it('should create one <li> for each hero', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES))
        fixture.detectChanges();

// QUERYALL(restituisce un array) RESTITUISCE TUTTI GLI ELEMENTI CHE CORRISPONDONO AL SELETTORE SELEZIONATO
        expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(3);
    })
})