import {message }from 'antd';
export function config(){
  return{
    onError(err) {
      err.preventDefault();
      console.error('dva', err);
      message.error(err.message||'未知异常');
    },
  }
}
