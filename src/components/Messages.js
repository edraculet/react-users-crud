import React from 'react';

export default function Messages(params) {
    const message = params.params.message;
    return (
        <div className="message">
            <div className="messageText">
                <div className={message.type || ''}>{message.text || ''}</div>
                <div className="closeMessage euiCodeBlock__controls">
                    <button
                            className="euiButton euiButton--secondary euiButton--small euiButton--fill"
                            type="button"
                            onClick={e => {
                                e.preventDefault();
                                params.params.setMessage({
                                        type: '',
                                        text: ''
                                    });
                                }
                            }
                    >
                        x
                    </button>
                </div>
            </div>

        </div>
    )
}
