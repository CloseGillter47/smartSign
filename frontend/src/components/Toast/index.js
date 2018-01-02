import Vue from 'vue'

import Toast from './Toast'

let globalConfig;

let instance;

let Constructor = Vue.extend(Toast);

let initInstance = () => {

    let instance = new Constructor({ el: document.createElement('div') });

    document.body.appendChild(instance.$el);

    return instance;
};

let toast = (options, promise) => {

    if (!options || !options.mode) return;

    if (!instance) instance = initInstance();

    let data = {};

    if (options.text) data.content = options.text;

    switch (options.mode) {
        case 'load':
            data.loadingMode = true;
            break;
        case 'done':
            data.icon = instance.getIcon('check');
            data.loadingMode = false;
            break;
        case 'error':
            data.icon = instance.getIcon('error');
            data.loadingMode = false;
            break;
        case 'warn':
            data.icon = instance.getIcon('warn');
            data.loadingMode = false;
            break;
        case 'info':
            data.icon = instance.getIcon('info');
            data.loadingMode = false;
            break;
        case 'help':
            data.icon = instance.getIcon('help');
            data.loadingMode = false;
            break;
        default:
            data.icon = instance.getIcon('info');
            data.loadingMode = false;
            break;
    }

    Object.assign(instance.$data, data);

    instance.$data.show = true;

    let time = options.time || 1200;

    if (promise) {

        promise.then(
            config => {

                instance.$data.icon = instance.getIcon('check');

                instance.$data.loadingMode = false;

                instance.$data.content = config.text || '完成';

                load(config.time || time, instance)
            },
            config => {

                instance.$data.icon = instance.getIcon('error');

                instance.$data.loadingMode = false;

                instance.$data.content = config.text || '失败';

                load(config.time || time, instance);
            })
            .catch(
            () => {
                console.log(0);
                instance.$data.icon = instance.getIcon('error');

                instance.$data.loadingMode = false;

                instance.$data.content = '程序错误！';

                load(time, instance);
            });

    } else {

        load(time, instance);
    }

};

function load(time, instance) {

    setTimeout(() => {

        instance.$data.show = false;

    }, time);
}

export default {

    install(Vue, options = {}) {

        Vue.prototype.$toast = toast;
    }
}