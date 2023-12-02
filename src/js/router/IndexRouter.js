import React, { Component } from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import RoomView from "../views/RoomView";
import LifeInfo from "../views/LifeInfo";
import VideoHistory from "../views/VideoHistory";
import VoiceMonitor from "../views/VoiceMonitor";
import MainMuddle from "../views/MainMuddle";
import NotFound from "../views/NotFound";
import { MessageProvider } from "../message_queue/MessageContext";
import MessageReceiver from "../message_queue/MessageReceiver"
export default class IndexRouter extends Component {
    render() {
        return (
            <div>
                <HashRouter>
                    <MessageProvider>
                        <MessageReceiver />
                        <Switch>
                            <Route path="/roomView/:roomId" component={RoomView} />
                            <Route path="/lifeInfo/:roomId" component={LifeInfo} />
                            <Route path="/videoHistory/:roomId" component={VideoHistory} />
                            <Route path="/voiceMonitor/:roomId" component={VoiceMonitor} />
                            <Route path="/mainMuddle" component={MainMuddle} />

                            <Redirect from="/" to="/mainMuddle" exact />

                            <Route component={NotFound} />
                        </Switch>
                    </MessageProvider>
                </HashRouter>
            </div>
        )
    }
}