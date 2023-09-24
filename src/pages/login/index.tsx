import { useState } from "react";
import { styled } from "styled-components";
import { useAppDispatch } from "../../store/hooks";
import { setUser } from "../../store/userSlice";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

const LoginContainer = styled.div`
	display: flex;
	justify-content: center;
	height: 100vh;
`;

const Form = styled.form`
	margin: auto;
`;

function Login() {
	const dispatch = useAppDispatch();

	const [username, setUsername] = useState("");

	const handleUsername = (
		event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
	) => {
		setUsername(event.target.value);
	};

	const handleLogin = (event: any) => {
		event.preventDefault();
		const token = (Math.random() + 1).toString(36).substring(7);
		dispatch(
			setUser({
				username,
				token,
			}),
		);
	};

	return (
		<LoginContainer>
			<Form onSubmit={handleLogin}>
				<InputText
					autoFocus
					type="text"
					value={username}
					onChange={handleUsername}
					placeholder="Username"
					style={{ marginRight: "16px" }}
				/>
				<Button type="submit" disabled={username.trim() === ""}>
					Log in
				</Button>
			</Form>
		</LoginContainer>
	);
}

export default Login;
