import {Platform} from 'react-native';

export default {
  routes: {
    titles: {
      home: 'Home',
      bills: 'Contas',
      settings: 'Configurar',
      delayed: 'Contas Atrasadas',
      ideal: 'Contas Ideais',
      next: 'Contas Futuras',
      newBill: 'Criar Conta',
      editBill: 'Editar Conta',
    },
    actions: {
      create: Platform.select({android: 'CRIAR', ios: 'Criar'}),
      signout: Platform.select({android: 'LOGOUT', ios: 'Logout'}),
    },
  },
  confirmDialog: {
    title: 'Você tem certeza?',
    msg: 'Esta ação não pode ser desfeita',
    confirm: 'Confirmar',
    cancel: 'Cancelar',
  },
};
