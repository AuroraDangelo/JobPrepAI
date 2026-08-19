import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import "../auth.form.scss"
import { useAuth } from '../hooks/useAuth'

const Login = () => {
    const { loading, handleLogin } = useAuth()
    const navigate = useNavigate()

    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ error, setError ] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")

        if (!email.trim() || !password) {
            setError("Please fill in both email and password.")
            return
        }

        try {
            const user = await handleLogin({ email, password })
            if (user) {
                navigate("/")
            }
        } catch (err) {
            setError(err.message || "Invalid credentials or server unavailable.")
        }
    }

    return (
        <main>
            <div className="form-container">
                <h1>Welcome Back</h1>

                {error && (
                    <div className="auth-error">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                                if (error) setError("")
                            }}
                            type="email"
                            id="email"
                            name='email'
                            placeholder="Enter your email address"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value)
                                if (error) setError("")
                            }}
                            type="password"
                            id="password"
                            name='password'
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <button disabled={loading} className='button primary-button'>
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <p>Don't have an account?<Link to={"/register"}>Register</Link></p>
            </div>
        </main>
    )
}

export default Login