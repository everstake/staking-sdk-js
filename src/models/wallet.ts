declare const window: any;

export interface WalletMessage {
  methodName: keyof Wallet,
  props: any
}

export class Wallet {

  static sendMessage = (methodName: keyof Wallet, props: any) => {
    const text = JSON.stringify({methodName, props: {...props}});
    const method = window.ReactNativeWebView ? 'ReactNativeWebView' : 'top';
    window[method].postMessage(text, '*')
  }

  onMessage(event: MessageEvent) {
    const data = event.data;
    const obj: WalletMessage = data && typeof data === 'string' && JSON.parse(data);
    // console.log('data', data);
    if (!obj) {
      return
    }
    const methodName: keyof Wallet = obj.methodName
    const props: any = obj.props;
    if (methodName && this[methodName]) {
      this[methodName](props);
    } else {
      console.log('error');
    }
  }

  displayName(props: {name: string}) {
    console.log('props', props);
    const {name} = props
    console.log('Name:', name);
  }

  sendAmount(amount: number): void {
    Wallet.sendMessage('sendAmount', {amount})
  }
}
