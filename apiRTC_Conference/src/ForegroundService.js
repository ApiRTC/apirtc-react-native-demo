import React, { Component } from 'react';

import notifee, { AndroidImportance } from '@notifee/react-native';

export default class ForegroundService {

    constructor() {
        this.isActive = null;
    }

    startService(title, message) {
        if (this.isActive) {
            console.info('ForeGround service already active');
            this.isActive = null;
            this.stopService();
            this.startService(title, message);
        } else {
            /*SCREEN SHARING FORE GROUND*/
            try {
                notifee.createChannel({
                    id: 'screen_capture',
                    name: title,
                    lights: false,
                    vibration: false,
                    importance: AndroidImportance.DEFAULT
                }).then((channelId) => {
                    notifee.displayNotification({
                        title: title, // 'Screen Capture'
                        body: message, //'This notification will be here until you stop capturing.'
                        android: {
                            channelId,
                            asForegroundService: true
                        }
                    });
                });
            } catch (err) {
                console.error(err);
            };
            /*--------------------------*/
        }
    }

    stopService() {
        try {
            notifee.stopForegroundService();
            notifee.hideNotificationDrawer();
        } catch (err) {
            console.error("Stop foreground service", err);
        };
        this.isActivective = null;

    }
}