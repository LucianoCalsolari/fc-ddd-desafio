import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerChangedEvent from "../customer-changed.event";

export default class SendLogWhenCustomerIsChangedHandler
implements EventHandlerInterface<CustomerChangedEvent>{
    handle(event: CustomerChangedEvent): void {
        console.log(`Endereço do cliente: ${event.eventData.id}, ${event.eventData.nome} alterado para: ${event.eventData.endereco}`);
    }
}