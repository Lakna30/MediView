import LoginPage from '../LoginPage';

export default function LoginPageExample() {
  return (
    <LoginPage onLogin={(email, password, role) => console.log('Login:', { email, role })} />
  );
}
