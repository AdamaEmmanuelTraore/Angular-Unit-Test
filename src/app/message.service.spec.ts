import { MessageService } from "./message.service"

describe('MessageService', () => {
// DEFINISCO LA VARIABILE PER IL COMPONENTE
    let service: MessageService

    beforeEach(() => {
        service = new MessageService();
    })

    it('should have no messages to start', () => {
        expect(service.messages.length).toBe(0);
    })

    it('should add a message when add is called', () => {
        service.add('Message1');

        expect(service.messages.length).toBe(1);
    })

    it('should remove message when clear is called', () => {
        service.add('Message1');

        service.clear();

        expect(service.messages.length).toBe(0);
    })
})