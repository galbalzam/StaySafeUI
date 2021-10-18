import { BrowserRouter, Route } from "react-router-dom"
import App from './Components/App/App'
import AuthWrapper from './Components/AuthWrapper/AuthWrapper'

export const AppWrapper = () => {
    return (
        <BrowserRouter>
            <Route
            path="*"
            render={() => (
                <AuthWrapper>
                    <App/>
                </AuthWrapper>)
            }
            />
    </BrowserRouter>
    )
}
