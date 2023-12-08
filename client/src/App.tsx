import { createContext, useEffect, useState } from "react";
import "./App.css";
import AppRouter from "./service/router/AppRouter";
import { tokenService } from "./service/TokenService";

export const UserContext = createContext<any>(null);

function App() {
    const [currentUser, setCurrentUser] = useState<any>(null);

    useEffect(() => {
        setCurrentUser(tokenService.getUserInfo());
    }, []);

    return (
        <div className="App" style={{ paddingTop: "100px" }}>
            <UserContext.Provider value={{ currentUser, setManager: setCurrentUser }}>
                <AppRouter />
            </UserContext.Provider>
        </div>
    );
}

export default App;
