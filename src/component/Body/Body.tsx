import { Route, Switch } from "wouter";
import AuthWall from "../AuthWall/AuthWall";
import Dashboard from "../Dashboard/Dashboard";
import { appBarHeight } from "../Header/HeaderUtils";

export default function Body() {
    return (
        <div
            style={{
                width: "100vw",
                minHeight: `calc(100vh - ${appBarHeight})`,
                backgroundColor: "#d6d3d1"
            }}
        >
            <Switch>
                <Route path="">
                    <AuthWall>
                        <Dashboard />
                    </AuthWall>
                </Route>
            </Switch>
        </div>
    )
}