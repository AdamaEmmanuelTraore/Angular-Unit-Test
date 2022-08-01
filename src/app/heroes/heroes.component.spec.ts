import { of } from "rxjs";
import { HeroesComponent } from "./heroes.component"

describe('HeroesComponent', () => {
    let component: HeroesComponent;
// CREO UNA VARIABILE PER IL MIO ARRAY DI EROI
    let HEROES: any;
// CREO UN MOCK(per creare un servizio)
    let mockHeroService: any;

    beforeEach(() => {
        HEROES = [
            {id: 1, name: 'SpiderDude', strength: 8},
            {id: 2, name: 'Wonderful Woman', strength: 24},
            {id: 3, name: 'SuperDude', strength: 55}
        ]

// QUI INIZIALIZZO LA MIA VARIABILE DI MOCK(servizio finto che posso controllare) E RICHIAMO I METODI DEL COMPONENTE
        mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero'])

        component = new HeroesComponent(mockHeroService);
    })

    describe('delete', () => {

// TEST DEL METODO "delete"
        it('should remove the indicated hero from the heroes list', () => {
// 'and' E' UN OGGETTO JASMINE CHE SERVE PER FAR RESTITUIRE UN VALORE, of() SERVE A RESTITUIRE UN OBSERVABILE
            mockHeroService.deleteHero.and.returnValue(of(true));

            component.heroes = HEROES;

            component.delete(HEROES[2]);

            expect(component.heroes.length).toBe(2);
        })

// SERVE PER TESTARE IL METODO "ngOnInit" ------ PS: PER COMMENTARE UN TEST BASTA AGGIUNGERE LA "x" DAVANTI ALLA "it" (xit)
        it('should call deleteHero', () => {
            mockHeroService.deleteHero.and.returnValue(of(true));
            
            component.heroes = HEROES;
            
            component.delete(HEROES[2]);

            expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[2]);
        })
    })
})