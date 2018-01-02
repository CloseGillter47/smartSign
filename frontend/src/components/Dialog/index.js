import Vue from 'vue'

import Dialog from './Dialog'

let globalConfig;

let Constructor = Vue.extend(Dialog);

let initInstance = () => {

    let instance = new Constructor({ el: document.createElement('div') });

    document.body.appendChild(instance.$el);

    return instance;
};

let dialog = (options, config) => {

    return new Promise((resolve, reject) => {

        if (!options) reject(undefined);

        let instance = initInstance();

        if (config) instance.setParams(config);

        Object.assign(instance.$data, options);

        let success = instance.success;

        let cancel = instance.cancel;

        instance.success = () => {

            success();

            let res = instance.getResult();

            if (res) {

                Object.assign(instance.$data, { show: false });

                resolve(res);

                // 删除该节点
                instance.$el.parentNode.removeChild(instance.$el);

            }
        }

        instance.cancel = () => {

            cancel();

            let res = instance.getResult();

            Object.assign(instance.$data, { show: false });

            reject(res);

            // 删除该节点
            instance.$el.parentNode.removeChild(instance.$el);
        }
    });

};

export default {

    install(Vue, options = {}) {

        Vue.prototype.$dialog = dialog;
    }
}