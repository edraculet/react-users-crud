import React from 'react';

import { EuiGlobalToastList } from '@elastic/eui';

export default function Messages({params}) {
    const message = params.message;

    let toasts = [];

    if (message.text) {
        toasts.push({
            id: 'message',
            title: message.text,
            color: message.type,
        });
    }

    const removeToast = () => {
        params.setMessage({});
    };

    return (toasts ? <EuiGlobalToastList
        toasts={toasts}
        toastLifeTimeMs={6000}
        dismissToast={removeToast}
    /> : '');

}
