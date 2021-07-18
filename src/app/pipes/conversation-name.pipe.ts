import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../user';

@Pipe({
  name: 'conversationName'
})
export class ConversationNamePipe implements PipeTransform {

  transform(conversation: any, args?: any): any {
    let display = conversation
    let type = conversation


    if (User.ROL_INVESTIGATOR == conversation.user_rol) {
        display = 'Investigador' + this.hide(': ' + conversation.user_first_name + ' ' + conversation.user_last_name, args)
        type = 'primary'
    } else if (conversation.user_rol) {
        display = 'Administrador' + this.hide(': ' + conversation.user_first_name + ' ' + conversation.user_last_name, args)
        type = 'info'
    } else {
        display = 'Informante' + this.hide(': ' + (conversation.informer_first_name ? conversation.informer_first_name + ' ' + conversation.informer_last_name : 'Anónimo'), args)
        type = 'inverse'
    }

    return args == 'type' ? type : display;
  }

  private hide(value, args) {
    return args=='hide' ? '' : value
  }

}
