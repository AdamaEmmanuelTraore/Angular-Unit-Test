import { TestBed } from "@angular/core/testing"
import { HeroService } from "./hero.service"
import { MessageService } from "./message.service";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing"

describe('HeroService', () => {
    let mockMessageService;
    let httpTestingController: HttpTestingController; // SERVE A CONTROLLARE (Http) NEL NOSTRO TEST
    let Service: any;

    beforeEach(() => {
        mockMessageService = jasmine.createSpyObj(['add']);

        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule ],
            providers: [
                HeroService,
                {provide: MessageService, useValue: mockMessageService}
            ]
        });

// SERVE A MANEGGIARE UN SERVIZIO(HANDLE 1)
        httpTestingController = TestBed.inject(HttpTestingController);
        Service = TestBed.inject(HeroService);
    })

    describe('getHero', () => {
        it('should call get with the correct URL', () => {
            // CHIAMA getHero()
            Service.getHero(4).subscribe();

            // VERIFICA CHE L'URL SIA CORRETTO (con l'aiuto di HttpTestingController)
            // VIENE FATTA UNA CHIAMATA http ALL'URL GETHERO COME NEL COMPONENTE
            const req = httpTestingController.expectOne('api/heroes/4');


// IL METODO FLUSH CONSENTE DI DECIDERE QUALI DATI RESTITUIRE QUANDO VIENE EFFETTUATA LA CHIAMATA(Una specie di return)
            req.flush({id: 4, name: 'SuperDude', strength: 100});
            httpTestingController.verify();
            
            expect(req.request.method).toBe('GET');
            
        })
    })
})