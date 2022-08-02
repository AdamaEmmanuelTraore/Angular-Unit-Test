import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { of } from "rxjs";
import { HeroService } from "../hero.service";
import { HeroesComponent } from "./heroes.component";

describe('HeroesComponent (shallow tests)', () => {
// COMPONENTFIXTURE: È UNO STRUMENTO CHE CI PERMETTE DI DEBUGGARE E TESTARE UN COMPONENTE
    let fixture: ComponentFixture<HeroesComponent>;
    let mockHeroService: any;
    let HEROES: any;

    beforeEach(() => {
        HEROES = [
            {id: 1, name: 'SpiderDude', strength: 8},
            {id: 2, name: 'Wonderful Woman', strength: 24},
            {id: 3, name: 'SuperDude', strength: 55}
        ]

        mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero'])

// TESTBED: PERMETTE DI CREARE DINAMICAMENTE UN MODULO PER IL NOSTRO TEST (SIMULA UN NgModule)
        TestBed.configureTestingModule({
            declarations: [HeroesComponent],
            providers: [
                { provide: HeroService, useValue: mockHeroService }
            ],
// CONSENTE DI IGNORARE GLI ERRORI A EVENTUALI ELEMENTI O PROPIETA' SCONOSCIUTI IN UN MODELLO
            schemas: [NO_ERRORS_SCHEMA]
        })
// QUI ANGULAR CREA IL COMPONENTE
        fixture = TestBed.createComponent(HeroesComponent);
    });

    it('should set heroes correctly from the service', () => {
// QUANDO CHIAMO UN SERVIZIO(esempio getHeroes), RESTITUISCO (in questo caso) UN OSSERVABILE DI "HEROES"
        mockHeroService.getHeroes.and.returnValue(of(HEROES))
/* IN ANGULAR IL RILEVAMENTO DELLE MODIFICHE PROVOCA L'ESECUZIONE DEGLI EVENTI DEL CICLO DI VITA
    (QUESTO CODICE RILEVA IL CAMBIAMENTO DELLE MODIFICHE AFFINCHÉ L'EVENTO DEL CICLO DI VITA, ngOnInit SI ATTIVI)*/
        fixture.detectChanges();

// componentInstance = ?
        expect(fixture.componentInstance.heroes.length).toBe(3);
    })
})