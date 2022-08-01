import { StrengthPipe } from "./strength.pipe"

// TEST DI UNA PIPE


describe('strengthPipe', () => {
    it('should display weak if strength is 5', () => {
// ARRANGE(QUI CREERO' UN NUOVO OGGETTO)
        let pipe = new StrengthPipe();
// ACT
        let val = pipe.transform(5);
// ASSERT
        expect(val).toEqual('5 (weak)');
    })

    it('should display strong if strength is 10', () => {
        let pipe = new StrengthPipe();

        let val = pipe.transform(10);

        expect(val).toEqual('10 (strong)');
    })
    })